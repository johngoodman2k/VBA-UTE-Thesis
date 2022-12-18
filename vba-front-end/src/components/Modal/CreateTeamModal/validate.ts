import validator from "validator";
import toastNotify from "../../../utils/toast";

export const validate = (
    teamName: string,
    teamLogo: File |undefined,
    stadiumpic: File |undefined,
    color: string,
    stadiumname: string,
    description: string,
    shortName:string
) => {
    const isTeamName = validator.isEmpty(teamName);
    if (isTeamName) {
        toastNotify("Please enter your Team Name", "error");
        return false;
    }


    if (!teamLogo) {
        toastNotify("Please choose your Team Logo", "error");
        return false;
    }

    if (!stadiumpic) {
        toastNotify("Please choose your Stadium Image", "error");
        return false;
    }
    const isColor = validator.isEmpty(color);
    if (isColor) {
        toastNotify("Please choose your Team Color", "error");
        return false;
    }
    const isStadiumname = validator.isEmpty(stadiumname);
    if (isStadiumname) {
        toastNotify("Please enter your Stadium Name", "error");
        return false;
    }
    // const isDescription = validator.isEmpty(description);
    // if (isDescription) {
    //     toastNotify("Please enter your Description", "error");
    //     return false;
    // }


    const isShortName = validator.isEmpty(shortName);
    if (isShortName) {
        toastNotify("Please enter your Short Name", "error");
        return false;
}

    // const confirmPassword = validator.equals(passwordconfirm, password);
    // if (!confirmPassword) {
    //   toastNotify('Please enter right password', 'error');
    //   return false;
    // }
    return {
        teamName,
        teamLogo,
        stadiumpic,
        color,
        stadiumname,
        description,
        shortName
    };
};
