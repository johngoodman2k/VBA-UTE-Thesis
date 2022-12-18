export const converMToFeet = (m?:number) =>{
    if(!m) return "";
    let MToCm = m * 100;
    let rs = Math.floor(MToCm / 30.48) + "'"
    let mod = (MToCm % 2.54).toFixed(0)

    return rs + mod

}