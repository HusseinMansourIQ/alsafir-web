const express = require("express")
const router = express.Router()
const Search = require('../BL/Cls_search')
const Update = require('../BL/Cls_update')
const Insert = require('../BL/cls_Insert')

//mario
router.get('/id', (req,res)=> {
    res.render('employer/id.ejs')
})


router.get('/sent_list', async(req,res)=> {
    try{
       
       const page =  parseInt(req.query.page) || 1;
       const limit = 50;
       const offset = (page - 1)*limit
       
       let result = await Search.search_sent_names_from_employer(req.query.owner_id,"%"+req.query.search+"%" || "%%",offset,limit)
       console.log(result.recordsets[1])
       const totalItems = result.recordsets[0][0].TotalCount;
       const totalPages = Math.ceil(totalItems / limit);
       
       res.render('employer/sent_list.ejs',{
        names : result.recordsets[1],
        page : page,
        totalPages : totalPages,
        owner_id : req.query.owner_id,
        search: req.query.search || "%%"
       })
        
     }catch(err){
        console.log(err)
     }
 })

 router.get('/update_sent_availability/:id/:owner_id/:w_id/:availability', async(req,res)=> {
    try{
      let availability
       switch (Number(req.params.availability)) {
         case 1:
            availability = "مقبول"
            break;
       
         case 0:
            availability = "غير مقبول"
            break;
       }
      
       await Update.update_sent_availabilty(req.params.id,availability)
       await Insert.insert_updated_sent(req.params.w_id,req.params.id, Date.now())

       
     res.redirect(`/employer/sent_list?owner_id=${req.params.owner_id}&search=`)
        
     }catch(err){
        console.log(err)
     }
 })

module.exports = router