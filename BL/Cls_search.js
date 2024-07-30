const sql = require('mssql/msnodesqlv8')
const Dal = require('../DAL/dal')
const dal = require('../DAL/dal')

module.exports = {
    
    async  search_job(param , avilability){
        
        let request = await dal.sql_open()

        request.input('Param', sql.NVarChar, param)
        request.input('avilability', sql.Int, avilability)

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

    async get_all_jobs(){

        let request = await dal.sql_open()
        let result = await request.execute('sp_getall_j')
        await dal.sql_close()
        return result
    },

    async get_all_comps(){

        let request = await dal.sql_open()
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

    async search_sent_names(param , accept){

        let request = await dal.sql_open()
        request.input('Param', sql.NVarChar, param)
        request.input('accept', sql.NVarChar, accept)
        let result = await request.execute('sp_serch_sent')
        await dal.sql_close()
        return result
    },

    async get_all_sent_names(){

        let request = await dal.sql_open()
     
        let result = await request.execute('get_all_sent_names_with_join')
        await dal.sql_close()
        return result
    },
}