import { NextFunction, Request, Response } from 'express';
import { format } from 'express-ext';
import admin  from "firebase-admin";
import { key } from 'query-core';
import {STORAGE_BUCKET} from "../../config/firebaseConfig"
import serviceAccount from "../../config/vba-project-64143-firebase-adminsdk-1pqvi-8fb0a9a351.json"

const BUCKET = "vba-project-64143.appspot.com"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  storageBucket: BUCKET
});

const bucket = admin.storage().bucket();

export const uploadFile = (req,res,next) => {

    console.log("req.file",req)
    if(!req.file) return  next();
    const image = req.file;
    console.log('image ->> line 17', image)
    const filename = Date.now() + "." + image.originalname.split(".").pop();

    const isImageAudio = image.mimetype.split('/')[0]

    let folder = 'images'
    let file = bucket.file('images/'+filename)
    // console.log(isImageAudio)

    // if(isImageAudio !== 'audio' ) {
    //     file = bucket.file('images/'+filename)
    //     folder= 'images'

    // }
    const stream = file.createWriteStream({
        metadata: {
            contentType: image.mimetype
        }
    });

    stream.on("error", (e) => {
        console.error('line 29 firebase',e);
    })

    stream.on("finish", async ()=> {
        await file.makePublic();
        console.log('vao dc roi')


        req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${folder}/${filename}`

        next()

    })

    stream.end(image.buffer)
}

export const uploadFiles = (req,res,next:NextFunction) => {

    if(!req.files) return  next();
    const images = req.files;
    let keys = Object.keys(images)
    if(!keys && keys.length === 0) return next()
    const fileNameArray = []

    for(let i=0;i<keys.length;i++){
        fileNameArray.push(Date.now() +i +"." + images[keys[i]][0].originalname.split(".").pop());

    }
    console.log("72",fileNameArray)

    // const isImageAudio = images.mimetype.split('/')[0]

    let folder = 'images'
    const fileArray = []
    fileNameArray.forEach(fileName =>{
        fileArray.push(bucket.file('images/'+fileName));
    })
    // console.log(isImageAudio)

    // if(isImageAudio !== 'audio' ) {
    //     file = bucket.file('images/'+filename)
    //     folder= 'images'

    // }
    for(let i =0;i< fileArray.length;i++){
        const stream = fileArray[i].createWriteStream({
            metadata: {
                contentType: images[keys[i]][0].mimetype
            }
        });

        stream.on("error", (e) => {
            console.error('line 29 firebase',e);
        })

        stream.on("finish", async ()=> {
            await fileArray[i].makePublic();
            console.log('vao dc roi')
            for(let i =0;i<fileArray.length;i++){
                req.files[keys[i]][0].firebaseUrl=`https://storage.googleapis.com/${BUCKET}/${folder}/${fileNameArray[i]}`
            }
             next()
        })
        stream.end(images[keys[i]][0].buffer)
    }
}

export const uploadFileFieldTeamLogo = (req,res,next:NextFunction) => {

    if(!req.files) return  next();
    const images = req.files;
    const  fileName =Date.now()  +"." + images["teamLogo"][0].originalname.split(".").pop();

    // const isImageAudio = images.mimetype.split('/')[0]

    let folder = 'images'
   
    const file = bucket.file('images/'+fileName);
    // console.log(isImageAudio)

    // if(isImageAudio !== 'audio' ) {
    //     file = bucket.file('images/'+filename)
    //     folder= 'images'

    // }
        const stream = file.createWriteStream({
            metadata: {
                contentType: images["teamLogo"][0].mimetype
            }
        });

        stream.on("error", (e) => {
            console.error('line 29 firebase',e);
        })

        stream.on("finish", async ()=> {
            await file.makePublic();
            console.log('vao dc roi')

            req.files["teamLogo"][0].firebaseUrl=`https://storage.googleapis.com/${BUCKET}/${folder}/${fileName}`
            
            next()
        })
        stream.end(images["teamLogo"][0].buffer)
    
}

export const uploadFileFieldStadiumpic = (req,res,next:NextFunction) => {

    if(!req.files) return  next();
    const images = req.files;

    const  fileName =Date.now()  +"." + images["stadiumpic"][0].originalname.split(".").pop();

    // const isImageAudio = images.mimetype.split('/')[0]

    let folder = 'images'
   
    const file = bucket.file('images/'+fileName);
    // console.log(isImageAudio)

    // if(isImageAudio !== 'audio' ) {
    //     file = bucket.file('images/'+filename)
    //     folder= 'images'

    // }
        const stream = file.createWriteStream({
            metadata: {
                contentType: images["stadiumpic"][0].mimetype
            }
        });

        stream.on("error", (e) => {
            console.error('line 29 firebase',e);
        })

        stream.on("finish", async ()=> {
            await file.makePublic();
            console.log('vao dc roi')

            req.files["stadiumpic"][0].firebaseUrl=`https://storage.googleapis.com/${BUCKET}/${folder}/${fileName}`
            
            next()
        })
        stream.end(images["stadiumpic"][0].buffer)
    
}

