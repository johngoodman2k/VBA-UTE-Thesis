import validator from "validator";
import toastNotify from "../../../utils/toast";

export const validate = (
    name: string,
    competitor: string,
    startDate: string,
    endDate: string,
    description: string,
    type: string
) => {
    const isName = validator.isEmpty(name);
    if (isName) {
        toastNotify("Please enter your tournament name", "error");
        return false;
    }

    const isCompetitor = validator.isEmpty(competitor);
    if (isCompetitor) {
        toastNotify("Please choose your Competitor", "error");
        return false;
    }
    const isStartDate = validator.isEmpty(startDate);
    if (isStartDate) {
        toastNotify("Please choose your start date", "error");
        return false;
    }
    const isEndDate = validator.isEmpty(endDate);
    if (isEndDate) {
        toastNotify("Please choose your end date", "error");
        return false;
    }
    const isDescription = validator.isEmpty(description);
    if (isDescription) {
        toastNotify("You have not entered any description", "warn");
        return false;
    }
    const isTournamentType = validator.isEmpty(type);
    if (isTournamentType) {
        toastNotify("Please choose your type", "error");
        return false;
    }

    // const confirmPassword = validator.equals(passwordconfirm, password);
    // if (!confirmPassword) {
    //   toastNotify('Please enter right password', 'error');
    //   return false;
    // }
    return {
        name,
        competitor,
        startDate,
        endDate,
        description,
        type,
    };
};
