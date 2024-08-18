const { max } = require('moment');
const sql = require('mssql')
let pool
module.exports = {
    
    connectionConfig : {
        
        server: process.env.SERVER, // Double backslash to escape backslash in string
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        pool: {
           max:10,
           min:0,
           idleTimeoutMillis:3000
        },
        options: {
            trustServerCertificate: true 
        }
         
    },
    
        

       async sql_open(){
            try{
                
                 pool = await sql.connect(this.connectionConfig);
                let request = pool.request()
                return request; 
            }catch(err){
                console.log(err)
            }
        },
        sql_close: async()=>{
            pool.close();
        }
    }
