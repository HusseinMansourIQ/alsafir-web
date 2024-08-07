const sql = require('mssql/msnodesqlv8')
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

    async  search_comp(param , avilability){
        
        let request = await dal.sql_open()

        request.input('Param', sql.NVarChar, param)
        request.input('avilability', sql.Int, avilability)

        let result = await request.execute('sp_comp_search')
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

        request.input('jid', sql.NVarChar, param)
        

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

    async get_w_exper_by_id(w_id ){

        let request = await dal.sql_open()
        request.input('w_id', sql.Int,Number(w_id))
       
        let result = await request.execute('sp_get_w_exper_by_wid')
        await dal.sql_close()
        return result
    },
}