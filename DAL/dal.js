const sql = require('mssql/msnodesqlv8')
let pool
module.exports = {
    
    connectionConfig : {
        
        server: 'DESKTOP-PUAF950\\SQLEXPRESS01', // Double backslash to escape backslash in string
        database: 'jops',
        options: {
            trustedConnection: true, // Use integrated security
            enableArithAbort: true, // Option to enable arithmetic abort (recommended for some SQL Server versions)
            trustServerCertificate: true // Use if you are connecting to a local server with a self-signed certificate
        },
         driver: "msnodesqlv8"
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
