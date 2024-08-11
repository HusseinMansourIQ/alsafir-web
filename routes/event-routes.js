const express = require("express")
const router = express.Router()
const Dal = require('../DAL/dal')
const Insert = require('../BL/cls_Insert')
const Search = require('../BL/Cls_search')
const Update = require("../BL/Cls_update")
const Delete = require('../BL/Cls_delete')
const Roles = require('../middleware/roles') 
const { check, validationResult } = require('express-validator/check')
const moment = require('moment');
const sql = require('mssql/msnodesqlv8')
const Jimp = require('jimp');
const multer = require('multer');
const { search_job } = require("../BL/Cls_search")
moment().format();
const upload = multer({ dest: 'uploads/' });


isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/users/login')
}

//create new events

router.get('/workers' ,isAuthenticated, Roles.lists, async(req,res)=> {
   try{
//parseInt(req.query.page) ||
      const page =  parseInt(req.query.page) || 1;
      const limit = 50;

      const offset = (page - 1)*limit

      let request = await Dal.sql_open()

      request.input('Param',sql.NVarChar, "")
      request.input('avilability',sql.Int, 6)
      request.input('Offset', sql.Int, offset)
      request.input('PageSize', sql.Int, limit)

      let result = await request.execute('sp_w_search');

      const totalItems = result.recordsets[0][0].TotalCount;
      console.log(result.recordsets[1])
      const totalPages = Math.ceil(totalItems / limit);
      
       res.render('event/workers_list', {
        workers : result.recordsets[1],
        page : page,
        totalPages : totalPages
       })
       Dal.sql_close()
    }catch(err){
       console.log(err)
    }
})

router.post('/searchWorker',isAuthenticated,Roles.lists, async(req,res)=> {
    try{
      
      const page =  parseInt(req.query.page) || 1;
      const limit = 50;
      const offset = (page - 1)*limit

        res.locals.user = ""
        let request = await Dal.sql_open()
        request.input('Param',sql.NVarChar, req.body.search);
        request.input('avilability',sql.Int, Number(req.body.w_avilability));
        request.input('Offset', sql.Int, offset)
        request.input('PageSize', sql.Int, limit)

        let result = await request.execute('sp_w_search');
        
           const totalItems = result.recordsets[0][0].TotalCount;
           const totalPages = Math.ceil(totalItems / limit);
           Dal.sql_close()
      
       res.render('event/workers_list', {
        workers : result.recordsets[1],
        page : page,
        totalPages : totalPages
       })

        
     }catch(err){
        console.log(err)
     }
 })

router.get('/addWorker',isAuthenticated,Roles.addition, async(req,res)=> {
    try{
 
       res.render('event/add_worker.ejs')
        
     }catch(err){
        console.log(err)
     }
 })
  


// save user to db

router.post('/addWorker',upload.single('image'),Roles.addition,async(req,res,next)=> {

   if (!req.file) {
      return res.status(400).send('No file uploaded, bitch.');
  }
  console.log(req.file.path)
      const image = await Jimp.read(req.file.path);
      const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
  

try{

    const data = [
        { exper_name: req.body.exper_1, exper_level: req.body.level_1,exper_time :req.body.time_1},
        { exper_name: req.body.exper_2, exper_level: req.body.level_2,exper_time :req.body.time_2},
        { exper_name: req.body.exper_3, exper_level: req.body.level_3,exper_time :req.body.time_3}
    ];

    console.log(req.body.w_note + " this is notes from add worker post ")

    // Define the table type parameter
    const exper = new sql.Table('dbo.exper_TableType7_new');
    exper.columns.add('exper_name', sql.NVarChar(50));
    exper.columns.add('exper_level', sql.NVarChar(50));
    exper.columns.add('exper_not', sql.NVarChar(256));
    exper.columns.add('exper_time', sql.NVarChar(50));

    // Add rows to the table type parameter
    data.forEach(row => {
        exper.rows.add(row.exper_name, row.exper_level,"", row.exper_time);
    });

    console.log(exper)
   await Insert.insert_worker(
        req.body.w_name,
        req.body.w_tel,
        req.body.w_address,
        req.body.w_id_type,
        req.body.w_id_no,
        req.body.w_birth_Date,
        req.body.w_study1,
        req.body.grad_1,
        req.body.w_study2,
        req.body.grad_2,
        req.body.w_salary,
        req.body.w_social_status,
        req.body.w_sex,
        req.body.w_availablility,
        req.body.w_note,
        exper,
        req.user.email,
        buffer)
        
        res.json("okiiii")
    }catch(err){
        console.log(err)
    }
        
        
    })

    router.get('/get_w_image/:id',isAuthenticated,Roles.lists, async(req,res)=> {
      try{
         let result = await Search.get_w_image_by_id(req.params.id)
         const imageData = result.recordset[0].w_img
         console.log(typeof(imageData))
         res.setHeader('Content-Type', 'image/png');
        res.send(imageData);
          
       }catch(err){
          console.log(err)
       }
   })

    router.post('/updateWorker',upload.single('image'),Roles.addition,async(req,res)=> {

      try{

         if (!req.file) {
            return res.status(400).send('No file uploaded, bitch.');
        }
            const image = await Jimp.read(req.file.path);
            const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
      
      
         await Update.update_worker(
              req.body.w_id,
              req.body.w_name,
              req.body.w_tel,
              req.body.w_address,
              req.body.w_id_type,
              req.body.w_id_no,
              req.body.w_birth_Date,
              req.body.w_study1,
              req.body.grad_1,
              req.body.w_study2,
              req.body.grad_2,
              req.body.w_salary,
              req.body.w_social_status,
              req.body.w_sex,
              req.body.w_availablility,
              req.body.w_note,
              req.user.email,
              buffer
              )

              await Update.update_exper_single(req.body.w_id, req.body.exper_id_1 ,req.body.exper_1 , req.body.level_1 , req.body.time_1)
              await Update.update_exper_single(req.body.w_id, req.body.exper_id_2 ,req.body.exper_2 , req.body.level_2 , req.body.time_2)
              await Update.update_exper_single(req.body.w_id, req.body.exper_id_3 ,req.body.exper_3 , req.body.level_3 , req.body.time_3)

              res.json(req.body.w_id)
          }catch(err){
              console.log(err)
          }
              
              
          })

    router.get('/showWorker/:id',isAuthenticated,async(req,res)=> {
      try{

         let worker = await Search.get_worker_by_id(req.params.id)
         let exper = await Search.get_w_exper_by_id(req.params.id)
         console.log(worker.recordset + " this is worker")
   
         res.render('event/show_worker.ejs',{
            worker: worker.recordset,
            exper: exper.recordset
         })
          
       }catch(err){
          console.log(err)
       }
   })

    router.get('/deleteWorker/:id',isAuthenticated,Roles.editor, async(req,res)=> {
        try{
           let result = await Delete.delete_worker(req.params.id)
            console.log(result)
           res.redirect('/events/workers')
            
         }catch(err){
            console.log(err)
         }
     })


    router.post('/addJob',Roles.addition,(req,res)=> {

        try{
        
         
            Insert.insert_job(
                req.body.j_name,
                req.body.j_address,
                req.body.j_salary,
                req.body.jop_salary_type,
                req.body.j_start_time,
                req.body.j_end_time,
                req.body.j_notes,
                req.body.j_owner,
                req.body.j_tel,
                "inserted_by",
                req.body.j_avilability
                )
                
                res.json("okiiii")
            }catch(err){
                console.log(err)
            }
                
                
            })
    
    router.get('/addJob',isAuthenticated, Roles.addition,async(req,res)=> {
        try{
     
           res.render('event/add_job.ejs')
            
         }catch(err){
            console.log(err)
         }
     })

     router.post('/searchJob',Roles.lists, async(req,res)=> {
        try{
           res.locals.user= ""
        
           const page =  parseInt(req.query.page) || 1;
           const limit = 50;
           const offset = (page - 1)*limit
         
           
           let result = await Search.search_job(req.body.search , Number(req.body.j_avilability), offset, limit)
           
           const totalItems = result.recordsets[0][0].TotalCount;
           console.log(result.recordsets[1])
           const totalPages = Math.ceil(totalItems / limit); 

           res.render('event/jobs_list.ejs',{
            jobs : result.recordsets[1],
            page : page,
            totalPages : totalPages
           })
            
         }catch(err){
            console.log(err)
         }
     })

     router.get('/jobs_list',isAuthenticated, async(req,res)=> {
        try{
         const page =  parseInt(req.query.page) || 1;
         const limit = 50;
   
         const offset = (page - 1)*limit
         
           let result = await Search.get_all_jobs(offset , limit)
           
           const totalItems = result.recordsets[0][0].TotalCount;
           console.log(result.recordsets[1])
           const totalPages = Math.ceil(totalItems / limit);          
           
           res.render('event/jobs_list.ejs',{
            jobs : result.recordsets[1],
            page : page,
            totalPages : totalPages
           })
           console.log(res.locals.user.role + " this is role ")
            
         }catch(err){
            console.log(err)
         }
     })

     router.get('/showJob/:id', isAuthenticated,async(req,res)=> {
        try{
           let result = await Search.show_job(req.params.id)
            console.log(result)
           res.render('event/show_job.ejs',{
            job : result.recordset
           })
            
         }catch(err){
            console.log(err)
         }
     })

     router.post('/updateJob',Roles.editor,(req,res)=> {

        try{
        
         
              Update.update_job(
                req.body.j_id,
                req.body.j_name,
                req.body.j_address,
                req.body.j_salary,
                req.body.jop_salary_type,
                req.body.j_start_time,
                req.body.j_end_time,
                req.body.j_notes,
                req.body.j_owner,
                req.body.j_tel,
                "inserted_by",
                req.body.j_avilability
                )
                
                res.redirect('/events/jobs_list')
            }catch(err){
                console.log(err)
            }
                
                
            })

            router.get('/deleteJob/:id',isAuthenticated,Roles.editor, async(req,res)=> {
                try{
                   let result = await Delete.delete_job(req.params.id)
                    console.log(result)
                   res.redirect('/events/jobs_list')
                    
                 }catch(err){
                    console.log(err)
                 }
             })

            router.get('/addComp',isAuthenticated,Roles.addition, async(req,res)=> {
                try{
             
                   res.render('event/add_comp.ejs')
                    
                 }catch(err){
                    console.log(err)
                 }
             })

             router.post('/addComp',Roles.addition, async(req,res)=> {
                try{
             
                    Insert.insert_comp(
                        req.body.com_name,
                        req.body.comp_tel,
                        req.body.comp_type,
                        req.body.comp_addres,
                        req.body.note,
                        req.body.avilability
                        )
                    
                 }catch(err){
                    console.log(err)
                 }
             })

             

             router.get('/comps_list',isAuthenticated,Roles.lists, async(req,res)=> {
                try{

                     const page =  parseInt(req.query.page) || 1;
                     const limit = 50;
                     const offset = (page - 1)*limit

                   let result = await Search.get_all_comps(offset,limit)
                   
                   const totalItems = result.recordsets[0][0].TotalCount;
                   console.log(result.recordsets[1])
                   const totalPages = Math.ceil(totalItems / limit);
                  
                   res.render('event/comps_list.ejs',{
                    comps : result.recordsets[1],
                    page : page,
                    totalPages : totalPages
                   })
                    
                 }catch(err){
                    console.log(err)
                 }
             })

             router.get('/showComp/:id',isAuthenticated,Roles.lists, async(req,res)=> {
                try{
                   let result = await Search.show_comp(req.params.id)
                    console.log(result)
                   res.render('event/show_comp.ejs',{
                    comp : result.recordset
                   })
                    
                 }catch(err){
                    console.log(err)
                 }
             })
        
             router.post('/updateComp',Roles.editor,(req,res)=> {
        
                try{
                
                 
                      Update.update_comp(
                        req.body.comp_id,
                        req.body.com_name,
                        req.body.comp_tel,
                        req.body.comp_type,
                        req.body.comp_addres,
                        req.body.note,
                        req.body.avilability
                        )
                        
                        res.redirect('/events/comps_list')
                    }catch(err){
                        console.log(err)
                    }
                        
                        
                    })

                    router.get('/deleteComp/:id',isAuthenticated, Roles.editor,async(req,res)=> {
                        try{
                           let result = await Delete.delete_comp(req.params.id)
                            console.log(result)
                           res.redirect('/events/comps_list')
                            
                         }catch(err){
                            console.log(err)
                         }
                     })

                     router.post('/searchComp',Roles.lists, async(req,res)=> {
                        try{
                            res.locals.user= ""
                            
                            const page =  parseInt(req.query.page) || 1;
                            const limit = 50;
                            const offset = (page - 1)*limit

                            let result = await Search.search_comp(req.body.search , Number(req.body.c_avilability),offset,limit)
                           
                            const totalItems = result.recordsets[0][0].TotalCount;
                            const totalPages = Math.ceil(totalItems / limit);

                            res.render('event/comps_list.ejs',{
                            comps : result.recordsets[1],
                            page : page,
                            totalPages : totalPages
                           })
                            
                         }catch(err){
                            console.log(err)
                         }
                     })

                     router.get('/sent_list',isAuthenticated,Roles.lists, async(req,res)=> {
                        try{
                           
                           const page =  parseInt(req.query.page) || 1;
                           const limit = 50;
                           const offset = (page - 1)*limit
                           
                           let result = await Search.get_all_sent_names(offset,limit)

                           const totalItems = result.recordsets[0][0].TotalCount;
                           console.log(result.recordsets[1])
                           const totalPages = Math.ceil(totalItems / limit);

                           res.render('event/sent_list.ejs',{
                            names : result.recordsets[1],
                            moment : moment,
                            page : page,
                            totalPages : totalPages
                           })
                            
                         }catch(err){
                            console.log(err)
                         }
                     })

                     
                     router.post('/searchSent', Roles.lists, async(req,res)=> {
                        try{
                           
                           res.locals.user = ""
                           const page =  parseInt(req.query.page) || 1;
                           const limit = 50;
                           const offset = (page - 1)*limit
                           
                           let result = await Search.search_sent_names(req.body.search, req.body.avilability)

                           const totalItems = result.recordsets[0][0].TotalCount;
                           console.log(result.recordsets[1])
                           const totalPages = Math.ceil(totalItems / limit);
                           
                            res.render('event/sent_list.ejs',{
                            names : result.recordset,
                            moment : moment,
                            page : page,
                            totalPages : totalPages
                           })
                            
                         }catch(err){
                            console.log(err)
                         }
                     })

                     router.get('/sendWorker/:id/:workerName',isAuthenticated,Roles.editor, async(req,res)=> {
                        try{
                           
                           res.render('event/send_worker.ejs',{
                            workerName :req.params.workerName,
                            w_id : req.params.id
                           })
                            
                         }catch(err){
                            console.log(err)
                         }
                     })

                     router.post('/sendWorker',Roles.editor, async(req,res)=> {
                        try{
                          let result =  await Insert.send_worker(
                              req.body.w_id,
                              req.body.com_id,
                              req.body.avilability,
                              req.body.note,
                              req.body.sent_date,
                              req.body.accept_date
                           )        
                           console.log(req.body.note + " this is notes ")    
                           console.log(result)    
                           //res.redirect('/events/workers')           
                         }catch(err){
                            console.log(err)
                         }
                     })

                     router.get('/showSent/:sent_id/:w_id',isAuthenticated,Roles.lists, async(req,res)=> {
                        try{
                           let result = await Search.get_sent_by_id(req.params.w_id , req.params.sent_id)
                           console.log(result)
                           res.render('event/show_sent.ejs',{
                            name: result.recordset,
                            moment: moment
                           })
                            
                         }catch(err){
                            console.log(err)
                         }
                     })

                     router.post('/updateSent',Roles.editor, async(req,res)=> {
                        try{
                          let result =  await Update.update_sent(
                              req.body.sent_id,
                              req.body.com_id,
                              req.body.avilability,
                              req.body.note,
                              req.body.sent_date,
                              req.body.accept_date
                           )        
                           res.redirect('/events/sent_list')
                           
                           //res.redirect('/events/workers')           
                         }catch(err){
                            console.log(err)
                         }
                     })

module.exports = router
