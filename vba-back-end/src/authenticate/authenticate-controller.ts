import { Request, Response } from "express";
import { Controller, handleError, Log } from "express-ext";
import { nanoid } from "nanoid";
import { User, UserFilter, UserService } from "./authenticate";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import { config as Config, env as Env } from "../config";
import nodeMailer from "nodemailer";
import JWT from "jsonwebtoken";

const encodedToken = (userID: string, jwt_secret: string = "ProjectVBA123") => {
    return JWT.sign(
        {
            iss: "ProjectVBA_2022-2023",
            sub: userID,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 3),
        },
        jwt_secret
    );
};

const enpass = async (password: string) => {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Generate a password hash (salt + hash)
        const passwordHashed = await bcrypt.hash(password, salt);
        // password = passwordHashed
        return passwordHashed;
    } catch (error) {
        console.log(error);
    }
};

const sendMail = async (email: string, subject: string, htmlContent, config: typeof Config.mailer) => {
    try {
        const transporter = nodeMailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: config.portsendmail,
            secure: false,
            auth: {
                user: config.adminemail,
                pass: config.adminemailpassword,
            },
        });

        await transporter.sendMail({
            from: config.adminemail,
            to: email,
            subject: subject,
            html: htmlContent,
        });
    } catch (error) {
        console.log(error);
    }
};

const isValidPassword = async (newPassword: string, oldPassword: string) => {
    try {
        return await bcrypt.compare(newPassword, oldPassword);
    } catch (error) {
        throw new Error(error);
    }
};

export class UserController extends Controller<User, string, UserFilter> {
    configG: typeof Config;
    constructor(log: Log, protected userService: UserService, config: typeof Config) {
        super(log, userService);
        this.configG = config;
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.checkOtpSignUp = this.checkOtpSignUp.bind(this);
        this.forgetPassword = this.forgetPassword.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.checkOtpFG = this.checkOtpFG.bind(this);
        this.userInfo = this.userInfo.bind(this);
    }

    async signIn(req: Request, res: Response) {
        const { username, password } = req.body;
        const user = await this.userService.findOne("username", username);
        if (user.length === 0) return res.status(400).json({ message: "Your username is invalid .Try again !" });

        if (user[0].lock) return res.status(403).json({ message: "Your ID has been locked!" });

        const isCorrectPassword = await isValidPassword(password, user[0].password);

        if (!isCorrectPassword) return res.status(400).json({ message: "Password is not correct!" });

        //Assign a token
        const token = encodedToken(user[0].id);
        res.setHeader("Authorization", token);
        return res.status(200).json({ success: true, token: token });
    }
    async signUp(req: Request, res: Response) {
        const { username, password, email } = req.body;
        const foundEmail = await this.userService.findOne("email", email);
        if (foundEmail.length > 0) return res.status(409).json({ message: "Email is already" });

        const foundUserName = await this.userService.findOne("username", username);
        if (foundUserName.length > 0) return res.status(409).json({ message: "UserName is already" });

        const password1 = await enpass(password);
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
        });
        const body = `<h2>This is your otp code </h2>
                <p>username: ${username}</p>
                <p>${otp}</p>
                <p>Best regards/p>
                `;
        // this.configG.

        await sendMail(email, "Sign Up", body, this.configG.mailer);

        //create User
        const idUser = nanoid();
        const newUser = {} as User;
        newUser.id = idUser;
        newUser.username = username;
        newUser.email = email;
        newUser.password = password1;
        newUser.name = username;
        newUser.otp = otp;

        await this.userService.createUser(newUser);

        const token = encodedToken(newUser.id);

        res.setHeader("Authorization", token);

        return res.status(201).json({ success: true });
    }
    async checkOtpSignUp(req: Request, res: Response) {
        const { username, otp } = req.body;

        const user = await this.userService.findOne("username", username);
        if (user.length <= 0) return res.status(400).json({ message: "username is incorrect" });

        if (user[0].otp !== otp) return res.status(400).json({ message: "otp is incorrect" });

        user[0].activated = true;

        const updateUser = await this.userService.updateUser({ activated: user[0].activated });
        if (updateUser <= 0) return res.status(400).json({ message: "User update failed" });

        return res.status(200).json({ success: true, message: "account has been activated" });
    }

    async forgetPassword(req: Request, res: Response) {
        const { username } = req.body;
        const user = await this.userService.findOne("username", username);

        if (user.length <= 0) return res.status(400).json({ message: "username does not exist" });

        if (!user[0].activated) return res.status(400).json({ message: "account has not been activated" });

        // const resetLink = encodedToken(user._id);
        const otpFG = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
        });
        user[0].otpFG = otpFG;

        // user.resetLink = resetLink;
        const updateUser = await this.userService.updateUser({ otpFG: user[0].otpFG });

        if (updateUser <= 0) return res.status(400).json({ message: "User update failed" });

        const body = `<h2>this is your otp code </h2>
                      <p>${otpFG}</p>
                      <p>Best regards</p>
                      `;
        await sendMail(user[0].email, "Forgot Password", body, this.configG.mailer);

        return res.status(200).json({ success: true, message: "Reset password otp has been sent" });
    }
    async resetPassword(req: Request, res: Response) {
        const { newpassword, otpFG, username } = req.body;
        const user = await this.userService.findOne("username", username);
        if (user.length <= 0) return res.status(403).json({ message: "Access is denied" });

        if (user[0].otpFG === "") return res.status(400).json({ message: "Step by step" });
        if (user[0].otpFG !== otpFG) return res.status(404).json({ message: "Invalid OTP" });

        const checkPass = await isValidPassword(newpassword, user[0].password);
        if (checkPass)
            return res.status(409).json({
                message: "The new password cannot be the same as the old password",
            });

        const password1 = await enpass(newpassword);

        user[0].password = password1;
        user[0].otpFG = "";

        const updateUser = await this.userService.updateUser({ otpFG: user[0].otpFG, password: user[0].password });
        if (updateUser <= 0) return res.status(400).json({ message: "user update failed" });
        return res.status(200).json({ success: true, message: "Your Password was updated successfully" });
    }

    async checkOtpFG(req: Request, res: Response) {
        const { username, otpFG } = req.body;

        const user = await this.userService.findOne("username", username);
        if (user.length <= 0) return res.status(403).json({ message: "Access is denied" });
        if (user[0].otpFG === "") return res.status(400).json({ message: "Step by step" });

        if (user[0].otpFG !== otpFG) return res.status(404).json({ message: "Invalid OTP" });

        return res.status(200).json({ success: true, message: "check your OTP success" });
    }
    // async checkOtp(req: Request, res: Response) {
    //     const userId = req.body.token.sub;
    //     const { otp } = req.body;

    //     const user = await this.userService.findOne("id", userId);
    //     if (user.length <= 0) return res.status(404).json({ message: "User with this token does not exist" });

    //     if (user[0].activated) return res.status(400).json({ message: "user have been verify otp" });

    //     if (user[0].otp !== otp) return res.status(400).json({ message: "wrong otp" });

    //     return res.status(200).json({ success: true });
    // }
    async userInfo(req: Request, res: Response) {
        const userId = req.body.token.sub;

        const user = await this.userService.findOne("id", userId);

        if (user.length <= 0) return res.status(404).json({ message: "User does not exist" });

        return res.status(200).json(user[0]);
    }
}
