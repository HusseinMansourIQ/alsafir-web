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

router.get('/sendJobReq/:id', (req,res)=>{
    res.render('client/sendJobReq',{
        job_id: req.params.id
    })
})

router.get('/jobs_list',async(req,res)=>{
    
    const page =  parseInt(req.query.page) || 1;
    const limit = 9;
    const offset = (page - 1)*limit

    let result = await Search.search_job("%%",1,offset,limit)
    
    const totalItems = result.recordsets[0][0].TotalCount;
    const totalPages = Math.ceil(totalItems / limit); 

        let chunk = []
        let chunkSize = 3
        for (let i =0 ; i < result.recordsets[1].length ; i+=chunkSize) {
        chunk.push(result.recordsets[1].slice( i, chunkSize + i))
        }
        console.log(chunk)

    res.render('client/jobs_list',{
        chunk: chunk,
        totalPages: totalPages,
        page: page 
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

