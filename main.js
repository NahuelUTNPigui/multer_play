const express = require('express')
const multer  = require('multer')
const app = express()
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public')
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now()+".png")
    }
})
const upload = multer({ storage:storage })
app.use('/public', express.static('public'));
app.post('/foto', upload.single('foto'), function (req, res, next) {
    
    res.json("todo bien")
})
app.listen(4000,()=>{
    console.log("Andando desde el puerto 4000")    
})
