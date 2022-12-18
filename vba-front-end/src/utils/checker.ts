export const checkDuplicateObject  = (objP: any,objC: any):boolean=>{
    const keys = Object.keys(objC);
    if(keys.length === 0) return false;
    let c = 0;
    for(const key of keys){
        console.log(objP[key],objC[key])
        if(objP[key] === objC[key]){
            
            c+=1;
        }
    }
    if(c=== keys.length) return true;
    
    return false
}