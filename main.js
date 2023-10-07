const express = require('express')
const multer  = require('multer')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
var path = require('path');
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        console.log("DEST")
        cb(null,path.join(__dirname,'public'))
    },
    filename:function(req,file,cb){
        console.log("name")
        cb(null,file.fieldname+"-"+Date.now()+".png")
    }
})
const upload = multer({ storage:storage ,limits: { fileSize: 5 * 1024 * 1024 },})
const fupfoto= multer({ storage:storage ,limits: { fileSize: 5 * 1024 * 1024 },}).single('foto')
let fup=function(req,res){
    fupfoto(req,res,function(err){
        if (err){
            console.log("erro")
            console.log(err)
        }
    })
    next()
}
app.use('/public', express.static('public'));
app.post('/foto', upload.single('foto'), function (req, res, next) {
    console.log(req.body)
    console.log(req.file)
    res.json("todo bien")
})
app.post('/foto2',function(req,res){
    fupfoto(req,res,function(err){
        if (err instanceof multer.MulterError) {
            console.log("mult error")
            console.log(err)
            // A Multer error occurred when uploading.
          } else if (err) {
            console.log("err")
            console.log(err)
            // An unknown error occurred when uploading.
          }
    })
    res.json("todo bien")
})
app.get('/halo',(req,res)=>{
    res.json(process.env.HOLA)
})
app.listen(4000,()=>{
    console.log("Andando desde el puerto 4000")    
})
