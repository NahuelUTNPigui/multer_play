const express = require('express')
const multer  = require('multer')
const app = express()
var path = require('path');
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'public'))
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now()+".png")
    }
})
const upload = multer({ storage:storage ,limits: { fileSize: 5 * 1024 * 1024 },})
app.use('/public', express.static('public'));
app.post('/foto', upload.single('foto'), function (req, res, next) {
    console.log(req.body)
    console.log(req.file)
    res.json("todo bien")
})
app.listen(4000,()=>{
    console.log("Andando desde el puerto 4000")    
})
