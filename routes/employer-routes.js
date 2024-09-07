const express = require("express")
const router = express.Router()
const Search = require('../BL/Cls_search')

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
        search: ""
       })
        
     }catch(err){
        console.log(err)
     }
 })

module.exports = router