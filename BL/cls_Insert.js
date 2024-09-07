const sql = require('mssql/msnodesqlv8')
const Dal = require('../DAL/dal')

module.exports={

    
     async insert_worker(w_name,w_tel,w_address,w_id_type, w_id_no, w_birth_date, w_study1, grad1, w_study2, grad2, w_salary, w_social_status, w_sex, w_availablility, w_note, exper , email, image){
                 

    let request =await Dal.sql_open()

        
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
        request.input('exper',sql.TVP,exper);
        request.input('w_experiances',w_tel); // phone number registered as experiences to avoid conflict (in the data base field it still w_tel so its just for the stored procedure)
        request.input('avilability',sql.NVarChar, w_availablility);
        request.input('w_note',sql.NVarChar(sql.MAX), w_note);
        request.input('User_whoInsert',sql.NVarChar, email);
        request.input('w_img',sql.VarBinary, image);
        
        let result = await request.execute('sp_insert_new_worker');
        await Dal.sql_close()
        
   
    

    
        
        
    },

    async insert_job(jop_name,jop_addres,jop_sallry, jop_salary_type, jop_start_time, jop_end_time, jop_note, jop_oner, jop_tele, Username, avilability){
                 

        let request =await Dal.sql_open()
    
            
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
            
            let result = await request.execute('sp_insert_jop');
           await Dal.sql_close()
            
            
        },

        async insert_comp(com_name,owner_id,comp_tel,comp_type,comp_addres, note, avilability){
                 

            let request =await Dal.sql_open()

            request.input('owner_id',sql.Int, owner_id);
                request.input('com_name',sql.NVarChar, com_name);
                request.input('comp_tel',sql.NVarChar, comp_tel);
                request.input('comp_type',sql.NVarChar,comp_type);
                request.input('comp_addres',sql.NVarChar, comp_addres);
                request.input('note',sql.NVarChar, note);
                request.input('avilability',sql.NVarChar, avilability);
                
    
                
        
                //request.input('w_img',sql.NVarChar, "");
                
                let result = await request.execute('sp_insert_comp');
               await Dal.sql_close()
                
            },

            async send_worker(w_id ,com_id,accept,sent_nots, sent_date, accept_date){

                try{

                    let request = await Dal.sql_open()
                    
                    request.input('w_id',sql.Int, parseInt(w_id) );
                    request.input('com_id',sql.Int, parseInt(com_id));
                    request.input('accept',sql.NVarChar,accept);
                    request.input('sent_nots',sql.NVarChar, sent_nots);
                    request.input('sent_date',sql.Date, sent_date !== "" && sent_date !== "" ? sent_date : null);
                    request.input('accept_date',sql.Date, accept_date !== "" && accept_date !== "" ? accept_date : null);
                    
                    
                   
                    let result = await request.execute('sp_ins_sent');
                    await Dal.sql_close()
                    return result
                }catch(err){
                    console.log(err)
                }
                    
            },
                
                async insert_client(wanted_job, c_name, c_tel, c_address, c_birth_date, c_study1,  c_social_status, c_sex, c_note,c_exper_name,c_is_job,c_job_id, image){

    let request =await Dal.sql_open()
    request.input('c_name',sql.NVarChar, c_name);
    request.input('c_addres',sql.NVarChar,c_address);
    request.input('c_id_type',sql.NVarChar, "c_id_type");
    request.input('c_id_no',sql.NVarChar, "c_id_no");
    request.input('c_pirthdate',sql.NVarChar, c_birth_date);
    request.input('c_study1',sql.NVarChar, c_study1);
    request.input('c_study2',sql.NVarChar, wanted_job);// this one is used for wanter job field 
    request.input('c_sex',sql.NVarChar, c_sex);
    request.input('c_graduate_date1',sql.NVarChar, "grad1");
    request.input('c_graduate_date2',sql.NVarChar, "grad2");
    request.input('c_exper_name',sql.NVarChar, c_exper_name);
    request.input('c_exper_time',sql.NVarChar, "exper_time");
    request.input('c_exper_level',sql.NVarChar, "exper_time");
    request.input('c_is_job',sql.NVarChar, c_is_job);
    request.input('job_id',sql.Int,Number(c_job_id));
    request.input('c_tel',c_tel); 
    request.input('c_note',sql.NVarChar(sql.MAX), c_note);
    request.input('c_status',sql.NVarChar, c_social_status);
    request.input('c_img',sql.VarBinary, image);
    
        await request.execute('sp_insert_client');
        await Dal.sql_close()
        

        
    },


    async insert_finished_name(user_name, user_job, user_address,user_phone_number,user_note ,img){

        let request =await Dal.sql_open()
        request.input('user_name',sql.NVarChar, user_name);
        request.input('user_job',sql.NVarChar,user_job);
        request.input('user_address',sql.NVarChar, user_address);
        request.input('user_phone_number',sql.NVarChar, user_phone_number);
        request.input('user_note',sql.NVarChar, user_note);
        request.input('user_img',sql.VarBinary, img);
        
            await request.execute('sp_insert_finished_names');
            await Dal.sql_close()
            
    
            
        },
    
}