import validator from "validator";
import toastNotify from "../../../utils/toast";

export const validateOffensive = (
    type: string,
    side: string,
    option: string,
    quater: string,
    description: string,
    playerOne: string,
    playerTwo: string,
    mins: number,
) => {
    const isType = validator.isEmpty(type);
    if (isType) {
        toastNotify("Bạn chưa chọn loại", "error");
        return false;
    }

    const isSide = validator.isEmpty(side);
    if (isSide) {
        toastNotify("Bạn chưa chọn bên", "error");
        return false;
    }
    const isOffense = validator.isEmpty(option);
    if (isOffense) {
        toastNotify("Bạn chưa chọn loại tấn công", "error");
        return false;
    }
    const isQuater = validator.isEmpty(quater);
    if (isQuater) {
        toastNotify("Bạn chưa chọn quater", "error");
        return false;
    }
    const isPlayerOne = validator.isEmpty(playerOne);
    if (isPlayerOne) {
        toastNotify("Bạn chưa chọn người ghi điểm", "error");
        return false;
    }
    const isPlayerTwo = validator.isEmpty(playerTwo);
    if (isPlayerTwo) {
        toastNotify("Bạn chưa chọn người hỗ trợ", "error");
        return false;
    }

    const isMins = validator.isEmpty(mins.toString());
    if (isMins) {
        toastNotify("Bạn chưa điền số phút", "error");
        return false;
    }


    return {
        type,
        side,
        option,
        quater,
        description,
        playerOne,
        playerTwo,
        mins,
    };
};

export const validateDefensive = (
    type: string,
    side: string,
    option: string,
    quater: string,
    description: string,
    playerOne: string,
    mins: number,
) => {
    const isType = validator.isEmpty(type);
    if (isType) {
        toastNotify("Bạn chưa chọn loại", "error");
        return false;
    }

    const isSide = validator.isEmpty(side);
    if (isSide) {
        toastNotify("Bạn chưa chọn bên", "error");
        return false;
    }
    const isDefensive = validator.isEmpty(option);
    if (isDefensive) {
        toastNotify("Bạn chưa chọn loại phòng thủ", "error");
        return false;
    }
    const isQuater = validator.isEmpty(quater);
    if (isQuater) {
        toastNotify("Bạn chưa chọn quater", "error");
        return false;
    }
    const isPlayerOne = validator.isEmpty(playerOne);
    if (isPlayerOne) {
        toastNotify("Bạn chưa chọn người phòng thủ", "error");
        return false;
    }

    const isMins = validator.isEmpty(mins.toString());
    if (isMins) {
        toastNotify("Bạn chưa điền số phút", "error");
        return false;
    }


    return {
        type,
        side,
        option,
        quater,
        description,
        playerOne,
        mins,
    };
};

export const validateSub = (
    type: string,
    side: string,
    quater: string,
    playerOne: string,
    playerTwo: string,
    mins: number,
) => {
    const isType = validator.isEmpty(type);
    if (isType) {
        toastNotify("Bạn chưa chọn loại", "error");
        return false;
    }

    const isSide = validator.isEmpty(side);
    if (isSide) {
        toastNotify("Bạn chưa chọn bên", "error");
        return false;
    }

    const isQuater = validator.isEmpty(quater);
    if (isQuater) {
        toastNotify("Bạn chưa chọn quater", "error");
        return false;
    }
    const isPlayerOne = validator.isEmpty(playerOne);
    if (isPlayerOne) {
        toastNotify("Bạn chưa chọn người vào sân", "error");
        return false;
    }
    const isPlayerTwo = validator.isEmpty(playerTwo);
    if (isPlayerTwo) {
        toastNotify("Bạn chưa chọn người ra sân", "error");
        return false;
    }

    const isMins = validator.isEmpty(mins.toString());
    if (isMins) {
        toastNotify("Bạn chưa điền số phút", "error");
        return false;
    }


    return {
        type,
        side,
        quater,
        playerOne,
        playerTwo,
        mins,
    };
};

export const validateLineUp = (
    teamLineUp: string[]
) => {
    for(const t of teamLineUp){
        if(t===""){
            toastNotify("Bạn chưa chọn đủ 5 thành viên ra sân","error")
            return false
        }
    }


    return {
        teamLineUp
    }
}
