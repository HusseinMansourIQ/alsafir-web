const sql = require('mssql/msnodesqlv8')
const Dal = require('../DAL/dal')

module.exports={

    
    

    async update_job(id,jop_name,jop_addres,jop_sallry, jop_salary_type, jop_start_time, jop_end_time, jop_note, jop_oner, jop_tele, Username, avilability){
                 

        let request =await Dal.sql_open()
    
            request.input('j_id',sql.Int, id);
            request.input('jop_name',sql.NVarChar, jop_name);
            request.input('jop_addres',sql.NVarChar,jop_addres);
            request.input('jop_sallry',sql.NVarChar, jop_sallry);
            request.input('jop_salary_type',sql.NVarChar, jop_salary_type);
            request.input('jop_start_time',sql.NVarChar, jop_start_time);
            request.input('jop_end_time',sql.NVarChar, jop_end_time);
            request.input('jop_note',sql.NVarChar, jop_note);
            request.input('jop_oner',sql.NVarChar, jop_oner);
            request.input('jop_tele',sql.NVarChar, jop_tele);
            request.input('Username',sql.NVarChar, Username);
            request.input('avilability',sql.NVarChar, avilability);

            
    
            //request.input('w_img',sql.NVarChar, "");
            
            let result = await request.execute('sp_update_jop');
           await Dal.sql_close()
            
        },

        async update_comp(id , com_name,comp_tel,comp_type,comp_addres, note, avilability){
                 

            let request =await Dal.sql_open()
                request.input('comp_id',sql.Int, id);
                request.input('com_name',sql.NVarChar, com_name);
                request.input('comp_tel',sql.NVarChar, comp_tel);
                request.input('comp_type',sql.NVarChar,comp_type);
                request.input('comp_addres',sql.NVarChar, comp_addres);
                request.input('User_whoInsert',sql.NVarChar, "");
                request.input('note',sql.NVarChar, note);
                request.input('avilability',sql.NVarChar, avilability);
                
    
                //request.input('w_img',sql.NVarChar, "");
                
                let result = await request.execute('sp_update_comp');
               await Dal.sql_close()
                
            },

            async update_sent(sent_id ,com_id,accept,sent_nots, sent_date, accept_date){

                try{

                    let request =await Dal.sql_open()
                    
                    request.input('sent_id',sql.Int, parseInt(sent_id) );
                    request.input('com_id',sql.Int, parseInt(com_id));
                    request.input('accept',sql.NVarChar,accept);
                    request.input('sent_nots',sql.NVarChar, sent_nots);
                    request.input('sent_date',sql.Date, sent_date);
                    request.input('accept_date',sql.Date, accept_date);
                    
                    
                    //request.input('w_img',sql.NVarChar, "");
                    let result = await request.execute('sp_update_sent');
                    await Dal.sql_close()
                    return result
                }catch(err){
                    console.log(err)
                }
                    
                }
}