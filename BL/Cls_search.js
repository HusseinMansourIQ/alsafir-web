const sql = require('mssql')
const Dal = require('../DAL/dal')
const dal = require('../DAL/dal')

module.exports = {
    
    async  search_job(param , avilability , offset,limit){
        
        let request = await dal.sql_open()

        request.input('Param', sql.NVarChar, param)
        request.input('avilability', sql.Int, avilability)
        request.input('Offset', sql.Int, offset)
        request.input('PageSize', sql.Int, limit)

        let result = await request.execute('sp_j_search')
        await dal.sql_close()

        return result
    },

    async  search_comp(param , avilability,offset,limit,){
        try{

            let request = await dal.sql_open()
            
            request.input('Param', sql.NVarChar, param)
            request.input('avilability', sql.Int, avilability)
            request.input('Offset', sql.Int, offset)
            request.input('PageSize', sql.Int, limit)
          
            
            let result = await request.execute('sp_comp_search')
            await dal.sql_close()
            
            return result
        }catch(err){
            console.log(err)
        }
    },

    async  search_client(param , avilability , offset,limit){
        
        let request = await dal.sql_open()

        request.input('Param', sql.NVarChar, param)
        request.input('c_is_job', sql.NVarChar, avilability)
        request.input('Offset', sql.Int, offset)
        request.input('PageSize', sql.Int, limit)

        let result = await request.execute('sp_search_client')
        await dal.sql_close()

        return result
    },

    async get_all_jobs(offset,limit){

        let request = await dal.sql_open()

        request.input('Offset', sql.Int, offset)
        request.input('PageSize', sql.Int, limit)
        
        let result = await request.execute('sp_getall_j')
        
        await dal.sql_close()
        return result
    },

    async get_all_comps(offset,limit){

        let request = await dal.sql_open()

        request.input('Offset', sql.Int, offset)
        request.input('PageSize', sql.Int, limit)

        let result = await request.execute('sp_getall_c')
        await dal.sql_close()
        return result
    },

    async  show_job(param){
        
        let request = await dal.sql_open()

        request.input('jid', sql.NVarChar, Number(param))
        

        let result = await request.execute('sp_get_j_by_id')
        await dal.sql_close()

        return result
    },

    async  show_comp(param){
        
        let request = await dal.sql_open()

        request.input('c_id', sql.NVarChar, param)
        

        let result = await request.execute('sp_get_comp_by_id')
        await dal.sql_close()

        return result
    },

    async search_sent_names(param , accept, offset,limit){

        let request = await dal.sql_open()
        request.input('Param', sql.NVarChar, param)
        request.input('accept', sql.NVarChar, accept)
        request.input('Offset', sql.Int, offset)
        request.input('PageSize', sql.Int, limit)
        let result = await request.execute('sp_serch_sent')
        await dal.sql_close()
        return result
    },

    async search_sent_names_from_employer(owner_id,param , offset,limit){

        let request = await dal.sql_open()
        request.input('Param', sql.NVarChar, param)
        request.input('Offset', sql.Int, offset)
        request.input('PageSize', sql.Int, limit)
        request.input('Owner_id', sql.Int, Number(owner_id))

        let result = await request.execute('sp_search_sent_from_employer')
        await dal.sql_close()
        return result
    },

    async get_all_sent_names(offset,limit){

        let request = await dal.sql_open()
        
        request.input('Offset', sql.Int, offset)
        request.input('PageSize', sql.Int, limit)

        let result = await request.execute('get_all_sent_names_with_join')
        await dal.sql_close()
        return result
    },

    async get_sent_by_id(w_id , sent_id){

        let request = await dal.sql_open()
        request.input('w_id', sql.Int,Number(w_id))
        request.input('sent_id', sql.Int, Number(sent_id))
        let result = await request.execute('sp_get_sent')
        await dal.sql_close()
        return result
    },

    async get_worker_by_id(w_id ){

        let request = await dal.sql_open()
        request.input('w_id', sql.Int,Number(w_id))
       
        let result = await request.execute('sp_get_w_by_id')
        await dal.sql_close()
        return result
    },
    
    async get_w_image_by_id(w_id){

        let request = await dal.sql_open()
        request.input('w_id', sql.Int,Number(w_id))
        let result = await request.execute('sp_get_w_image_by_id')
        await dal.sql_close()
        return result
    },

    async get_c_image_by_id(c_id){

        let request = await dal.sql_open()
        request.input('c_id', sql.Int,Number(c_id))
        let result = await request.execute('sp_get_c_img_by_id')
        await dal.sql_close()
        return result
    },

    async get_w_exper_by_id(w_id ){

        let request = await dal.sql_open()
        request.input('w_id', sql.Int,Number(w_id))
       
        let result = await request.execute('sp_get_w_exper_by_wid')
        await dal.sql_close()
        return result
    },

    async get_w_image_by_id(w_id){

        let request = await dal.sql_open()
        request.input('w_id', sql.Int,Number(w_id))
       
        let result = await request.execute('sp_get_w_image_by_id')
        await dal.sql_close()
        return result
    },
    
    async get_available_comps(){

        let request = await dal.sql_open()
       
        let result = await request.execute('sp_get_available_comps')
        await dal.sql_close()
        return result
    },

    async get_clients(offset,limit){

        let request = await dal.sql_open()

        request.input('Offset', sql.Int, offset)
        request.input('PageSize', sql.Int, limit)
        
        let result = await request.execute('sp_get_clients')
        await dal.sql_close()
        return result
    },

    async get_client_by_id(c_id){

        let request = await dal.sql_open()

        request.input('c_id', sql.Int,Number(c_id))
        
        let result = await request.execute('sp_get_client_by_id')
        await dal.sql_close()
        return result
    },


    async get_finised_names(offset, limit){

        let request = await dal.sql_open()

        request.input('Offset', sql.Int, offset)
        request.input('PageSize', sql.Int, limit)

        let result = await request.execute('sp_get_finished_names')
        await dal.sql_close()
        return result
    },

    async get_Fname_by_id(id){

        let request = await dal.sql_open()

        request.input('id', sql.Int,Number(id))
        
        let result = await request.execute('sp_get_fusers_by_id')
        await dal.sql_close()
        return result
    },

    async get_f_image_by_id(id){

        let request = await dal.sql_open()
        request.input('id', sql.Int,Number(id))
       
        let result = await request.execute('sp_get_fuser_img_by_id')
        await dal.sql_close()
        return result
    },


    async  search_updated_sents(param , avilability , offset,limit){
        console.log(param, avilability)
        
        let request = await dal.sql_open()

        request.input('Param', sql.NVarChar, "%"+param+"%")
        request.input('accept', sql.NVarChar, avilability)
        request.input('Offset', sql.Int, offset)
        request.input('PageSize', sql.Int, limit)

        let result = await request.execute('sp_search_updated_search')
        // ik I fucked up with the name, really have no energy to change it 
        await dal.sql_close()

        return result
    },
}