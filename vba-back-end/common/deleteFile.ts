import admin from "firebase-admin";


export const deleteFile = async (url:string) =>{
    const imageName = url.split('/')
    await admin.storage().bucket().file(imageName[4]+ '/' +imageName[5]).delete();
}
