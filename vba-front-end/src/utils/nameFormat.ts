
export const nameFormat = (firstname:string |undefined,lastname:string |undefined, format: "VN"|"US") =>{
    if(!firstname || !lastname) return "";
    if(format ==="US"){
        return lastname + " " +  firstname

    }else{
        return firstname+ " " + lastname;

    }
}