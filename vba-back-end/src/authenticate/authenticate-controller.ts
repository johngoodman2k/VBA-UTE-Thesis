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
            iss: "ProjectCNPMM",
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
    }

    async signIn(req: Request, res: Response) {
        const { username, password } = req.body;
        const user = await this.userService.findOne("username", username);
        console.log(user);
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
        if (foundEmail.length > 0) return res.status(409).json({ err: { message: "Email is already" } });

        const foundUserName = await this.userService.findOne("username", username);
        if (foundUserName.length > 0) return res.status(409).json({ err: { message: "UserName is already" } });

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
}
