const sql = require('mssql/msnodesqlv8')
const Dal = require('../DAL/dal')

module.exports={

    async update_worker(w_id,w_name,w_tel,w_address,w_id_type, w_id_no, w_birth_date, w_study1, grad1, w_study2, grad2, w_salary, w_social_status, w_sex, w_availablility, w_note,email){
                 

        let request =await Dal.sql_open()
    
            request.input('w_id',sql.Int, Number(w_id));
            request.input('w_name',sql.NVarChar, w_name);
            request.input('w_addres',sql.NVarChar,w_address);
            request.input('w_id_type',sql.NVarChar, w_id_type);
            request.input('w_id_no',sql.NVarChar, w_id_no);
            request.input('w_pirthdate',sql.NVarChar, w_birth_date);
            request.input('w_status',sql.NVarChar, w_social_status);
            request.input('w_study1',sql.NVarChar, w_study1);
            request.input('w_study2',sql.NVarChar, w_study2);
            request.input('w_study3',sql.NVarChar, w_salary);
            request.input('w_sex',sql.NVarChar, w_sex);
            request.input('w_graduate_date1',sql.NVarChar, grad1);
            request.input('w_graduate_date2',sql.NVarChar, grad2);
            request.input('w_graduate_date3',sql.NVarChar, "");
            request.input('w_experiances',w_tel); // phone number registered as experiences to avoid conflict (in the data base field it still w_tel so its just for the stored procedure)
            request.input('avilability',sql.NVarChar, w_availablility);
            request.input('w_note',sql.NVarChar, w_note);
            request.input('User_whoInsert',sql.NVarChar, email);
    
            //request.input('w_img',sql.NVarChar, "");
            
            let result = await request.execute('sp_update_w');
           await Dal.sql_close()
            
       
        },

        async update_exper_single(w_id , exper_id, exper_name, exper_level, exper_time){
                 

            let request =await Dal.sql_open()
                request.input('w_id',sql.Int, Number(w_id));
                request.input('exper_id',sql.Int,Number(exper_id));
                request.input('exper_name',sql.NVarChar,exper_name);
                request.input('exper_level',sql.NVarChar, exper_level);
                request.input('exper_time',sql.NVarChar, exper_time);
                request.input('exper_not',sql.NVarChar,"");
                                
                let result = await request.execute('sp_update_exper_single');
               await Dal.sql_close()
                
            },
    

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