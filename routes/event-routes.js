const express = require("express")
const router = express.Router()
const Dal = require('../DAL/dal')
const Insert = require('../BL/cls_Insert')
const Search = require('../BL/Cls_search')
const Update = require("../BL/Cls_update")
const Delete = require('../BL/Cls_delete')
const { check, validationResult } = require('express-validator/check')
const moment = require('moment');
const sql = require('mssql/msnodesqlv8')
const { search_job } = require("../BL/Cls_search")
moment().format();

const  connectionConfig = {
        
    server: 'DESKTOP-PUAF950\\SQLEXPRESS01', // Double backslash to escape backslash in string
    database: 'jops',
    options: {
        trustedConnection: true, // Use integrated security
        enableArithAbort: true, // Option to enable arithmetic abort (recommended for some SQL Server versions)
       // trustServerCertificate: true // Use if you are connecting to a local server with a self-signed certificate
    },
    driver: "msnodesqlv8"
}
// middleware to check if user is loogged in

isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/users/login')
}

//create new events

router.get('/workers', async(req,res)=> {
   try{

      let request = await Dal.sql_open()
      request.input('Param',sql.NVarChar, "");
      request.input('avilability',sql.Int, 6);
      let result = await request.execute('sp_w_search');
      console.log(result)

       res.render('event/workers_list', {
        workers : result.recordset
       })
       Dal.sql_close()
    }catch(err){
       console.log(err)
    }
})

router.post('/searchWorker', async(req,res)=> {
    try{
        res.locals.user = ""
        let request = await Dal.sql_open()
        request.input('Param',sql.NVarChar, req.body.search);
        request.input('avilability',sql.Int, Number(req.body.w_avilability));
        let result = await request.execute('sp_w_search');
        console.log(result)
  
         res.render('event/workers_list', {
          workers : result.recordset
         })
         Dal.sql_close()
        
     }catch(err){
        console.log(err)
     }
 })

router.get('/addWorker', async(req,res)=> {
    try{
 
       res.render('event/add_worker.ejs')
        
     }catch(err){
        console.log(err)
     }
 })
  


// save user to db

router.post('/addWorker',(req,res)=> {

try{

    const data = [
        { exper_name: "name", exper_level: 'level', exper_not: "note",exper_time :"time" },
        {exper_name: "name", exper_level: 'level', exper_not: "note",exper_time :"time" },
        { exper_name: "name", exper_level: 'level', exper_not: "note",exper_time :"time"}
    ];

    // Define the table type parameter
    const exper = new sql.Table('dbo.exper_TableType7');
    exper.columns.add('exper_name', sql.NVarChar(50));
    exper.columns.add('exper_level', sql.NVarChar(50));
    exper.columns.add('exper_not', sql.NVarChar(256));
    exper.columns.add('exper_time', sql.NVarChar(50));

    // Add rows to the table type parameter
    data.forEach(row => {
        exper.rows.add(row.exper_name, row.exper_level, row.exper_not, row.exper_time);
    });

    Insert.insert_worker(
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
        req.body.w_religion,
        exper)
        
        res.json("okiiii")
    }catch(err){
        console.log(err)
    }
        
        
    })

    router.get('/deleteWorker/:id', async(req,res)=> {
        try{
           let result = await Delete.delete_worker(req.params.id)
            console.log(result)
           res.redirect('/events/workers')
            
         }catch(err){
            console.log(err)
         }
     })


    router.post('/addJob',(req,res)=> {

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
    
    router.get('/addJob', async(req,res)=> {
        try{
     
           res.render('event/add_job.ejs')
            
         }catch(err){
            console.log(err)
         }
     })

     router.post('/searchJob', async(req,res)=> {
        try{
            res.locals.user= ""
           let result = await Search.search_job(req.body.search , Number(req.body.j_avilability))
           res.render('event/jobs_list.ejs',{
            jobs : result.recordset
           })
            
         }catch(err){
            console.log(err)
         }
     })

     router.get('/jobs_list', async(req,res)=> {
        try{
           let result = await Search.get_all_jobs()
            console.log(result)
           res.render('event/jobs_list.ejs',{
            jobs : result.recordset
           })
            
         }catch(err){
            console.log(err)
         }
     })

     router.get('/showJob/:id', async(req,res)=> {
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

     router.post('/updateJob',(req,res)=> {

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

            router.get('/deleteJob/:id', async(req,res)=> {
                try{
                   let result = await Delete.delete_job(req.params.id)
                    console.log(result)
                   res.redirect('/events/jobs_list')
                    
                 }catch(err){
                    console.log(err)
                 }
             })

            router.get('/addComp', async(req,res)=> {
                try{
             
                   res.render('event/add_comp.ejs')
                    
                 }catch(err){
                    console.log(err)
                 }
             })

             router.post('/addComp', async(req,res)=> {
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

             

             router.get('/comps_list', async(req,res)=> {
                try{
                   let result = await Search.get_all_comps()
                    console.log(result)
                   res.render('event/comps_list.ejs',{
                    comps : result.recordset
                   })
                    
                 }catch(err){
                    console.log(err)
                 }
             })

             router.get('/showComp/:id', async(req,res)=> {
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
        
             router.post('/updateComp',(req,res)=> {
        
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

                    router.get('/deleteComp/:id', async(req,res)=> {
                        try{
                           let result = await Delete.delete_comp(req.params.id)
                            console.log(result)
                           res.redirect('/events/comps_list')
                            
                         }catch(err){
                            console.log(err)
                         }
                     })

                     router.post('/searchComp', async(req,res)=> {
                        try{
                            res.locals.user= ""
                           let result = await Search.search_comp(req.body.search , Number(req.body.c_avilability))
                           res.render('event/comps_list.ejs',{
                            comps : result.recordset
                           })
                            
                         }catch(err){
                            console.log(err)
                         }
                     })

                     router.get('/sent_list', async(req,res)=> {
                        try{
                           let result = await Search.get_all_sent_names()
                            console.log(result)
                           res.render('event/sent_list.ejs',{
                            names : result.recordset,
                            moment : moment
                           })
                            
                         }catch(err){
                            console.log(err)
                         }
                     })

                     
                     router.post('/searchSent', async(req,res)=> {
                        try{
                           res.locals.user = ""
                           let result = await Search.search_sent_names(req.body.search, req.body.avilability)
                            console.log(result)
                           res.render('event/sent_list.ejs',{
                            names : result.recordset,
                            moment : moment
                           })
                            
                         }catch(err){
                            console.log(err)
                         }
                     })

                     router.get('/sendWorker/:id/:workerName', async(req,res)=> {
                        try{
                           
                           res.render('event/send_worker.ejs',{
                            workerName :req.params.workerName,
                            w_id : req.params.id
                           })
                            
                         }catch(err){
                            console.log(err)
                         }
                     })

                     router.post('/sendWorker', async(req,res)=> {
                        try{
                          let result =  await Insert.send_worker(
                              req.body.w_id,
                              req.body.com_id,
                              req.body.avilability,
                              req.body.note,
                              req.body.sent_date,
                              req.body.accept_date
                           )        
                           console.log(req.body)    
                           console.log(result)    
                           //res.redirect('/events/workers')           
                         }catch(err){
                            console.log(err)
                         }
                     })

module.exports = router
