const express = require('express')
const router = express.Router()

const Search = require('../BL/Cls_search')
const Insert = require('../BL/cls_Insert')

const multer = require('multer');
const Jimp = require('jimp');

const upload = multer({ dest: 'uploads/' });

router.get('/', (req,res)=>{
    res.render('client/main')
})

router.get('/clients', async(req,res)=>{
    let result = await Search.get_clients()
    res.json(result.recordset)
})

router.get('/comps_list',async(req,res)=>{
    
    let result = await Search.get_available_comps()

        let chunk = []
        let chunkSize = 3
        for (let i =0 ; i < result.recordset.length ; i+=chunkSize) {
        chunk.push(result.recordset.slice( i, chunkSize + i))
        }

    res.render('client/comps_list',{
        chunk: chunk
        })
})


router.post('/addClientForm',upload.single('image'),async(req,res,next)=> {

    let image 
    if (!req.file) {
       image = await Jimp.read('uploads/images/profile.png');
   }else{
      
      image = await Jimp.read(req.file.path);
   }
       const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
   
 
 try{
 
    await Insert.insert_client(
         req.body.c_name,
         req.body.c_tel,
         req.body.c_address,
         req.body.c_birth_Date,
         req.body.c_study1,
         req.body.c_social_status,
         req.body.c_sex,
         req.body.c_note,
         req.body.exper_name,
         req.body.isJob,
         req.body.job_id,
         buffer)
         
        res.redirect('/')
     }catch(err){
         console.log(err)
     }
         
         
     })



module.exports = router

