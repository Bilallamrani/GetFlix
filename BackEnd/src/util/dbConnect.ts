
import { createPool, Pool  } from "mysql2";
// import * as dotenv from "dotenv";
// dotenv.config();

abstract class DbConnect {
  protected connection:Pool;
  
  constructor() {
    // dotenv.config();
   
    this.connection = createPool({
        host: process.env.MYSQLHOST,
        user: process.env.MYSQLUSER,
        password: process.env.MYSQLPASSWORD,
        database: process.env.DATABASE,
        port: parseInt(process.env.PORT_NUM as string),
        connectionLimit :10,
        multipleStatements : true 
    });
    
  }

  abstract findAll(...params:any):Promise<any>;
  abstract findOne(...params:any):Promise<any>;
  abstract create(...params:any):Promise<any>;
  abstract update(...params:any):Promise<any>;
  abstract delete(...params:any):Promise<any>;

  pollEnd() {
    this.connection.end();
  }

}
export default DbConnect;
