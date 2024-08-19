const sql = require('mssql/msnodesqlv8')
const Dal = require('../DAL/dal')

module.exports={

    async delete_worker(id){
                 

        let request =await Dal.sql_open()
    
            
            request.input('param4',sql.Int, id);
            
            //request.input('w_img',sql.NVarChar, "");
            
            let result = await request.execute('sp_del_w');
           await Dal.sql_close()
            
            
        },

     async delete_job(id){
                 

    let request =await Dal.sql_open()

        
        request.input('param4',sql.Int, id);
        
        //request.input('w_img',sql.NVarChar, "");
        
        let result = await request.execute('sp_del_jop');
       await Dal.sql_close()
        
        
    },

    async delete_comp(id){
                
        let request =await Dal.sql_open()
            request.input('param4',sql.Int, id);            
           await request.execute('sp_del_comp');
           await Dal.sql_close()
        },

        async delete_client(id){
                
            let request =await Dal.sql_open()
                request.input('param4',sql.Int, Number(id));            
                await request.execute('sp_del_client');
                await Dal.sql_close()
            },
}