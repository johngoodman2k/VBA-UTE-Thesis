import multer from 'multer'

export const upload:multer.Multer = multer ({
    storage: multer.memoryStorage(),
    fileFilter: function(req,file,callback){
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jfif' || file.mimetype === 'image/jpeg' || file.mimetype === 'application/octet-stream' ){
            console.log('multer upload say oke!')
            callback(null,true)
        }
        else{
            console.log('only jpg & png file supported')
            callback(null,false)
            
        }
    },
    limits:{
        fileSize:1024 * 1024 * 5
    }
})

