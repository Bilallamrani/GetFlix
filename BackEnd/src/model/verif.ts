import { timeStamp } from "console";
import { delimiter } from "path";
import DbConnect from "../util/dbConnect";


export class Verif extends DbConnect {
    private email: string;
    private vToken: string;
    private type: number;
    private timeout: string;
    

    constructor(
        email:string,
        timeout:string,
        vToken="",
        type=1
    ) {

        if (!email || email.length < 1) {
            throw new Error('Email is required and must not be empty');
        }
        
        super();
        this.email = email;
        this.timeout = timeout;
        this.vToken = vToken;
        this.type = type;
        
    }

    
    findAll():any{
        //TODO
    }

    //'2023-03-05 20:59:00'
    static getTimeStamp( date = new Date(),dateStyle='yyyy-mm-dd',delimiter="-"):string{

        function pad(number:number) {
            if ( number < 10 ) {
              return '0' + number;
            }
            return `${number}`;
        }

        const formatDate = (y:number,m:number,d:number,dateStyle='yyyy-mm-dd'):string=>{

            switch (dateStyle) {
                case "dd-mm-yyyy":
                    return pad(d)+delimiter+pad(m)+delimiter+pad(y)

                case "dd-yyyy-mm":
                    return pad(d)+delimiter+pad(y)+delimiter+pad(m)

                case "mm-yyyy-dd":
                    return pad(m)+delimiter+pad(y)+delimiter+pad(d)

                case "mm-dd-yyyy":
                    return pad(m)+delimiter+pad(d)+delimiter+pad(y)

                case "yyyy-dd-mm":
                    return pad(y)+delimiter+pad(d)+delimiter+pad(m)
        
                default:
                    return pad(y)+delimiter+pad(m)+delimiter+pad(d)
            }

        }

        let timeStamp = formatDate(date.getUTCFullYear(),
        date.getUTCMonth() + 1,
        date.getUTCDate(),dateStyle )
        timeStamp += ' '
        timeStamp += pad( date.getUTCHours())
        timeStamp += ':'
        timeStamp += pad( date.getUTCMinutes())
        timeStamp += ':'
        timeStamp += pad( date.getUTCSeconds() ) 
        
        return timeStamp
    }

    static generateToken(len:Number) {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var token = '';
        for(var i = 0; i < len; i++) {
            token += chars[Math.floor(Math.random() * chars.length)];
        }
        return token;
    }

    async findOne(){
        return new Promise<any>((resolve, reject) => {
            
            this.connection.query(`SELECT * FROM gf_verificaton WHERE vToken = "${this.vToken}"`, 
            (err:any, rows:[], fields:any)=>{
                if (err ){
                    reject(err['sqlMessage'])
                }

                if (!rows) {
                    reject("no user found")
                }

                resolve(rows)
            })
        })
        
    }

    async addStatusFromVf (key:string,mask:number){
        return new Promise<boolean>((resolve, reject) => {

            let sqlQuery = `
                UPDATE gf_user U SET U.status = U.status | ${mask} WHERE U.email IN (SELECT email FROM gf_verification V WHERE V.vToken = '${key}');
            
            `
            let sqlDelQuery = `
            DELETE FROM gf_verification WHERE vToken = '${key}';
        
            `
            
            this.connection.query(sqlQuery, (err:any, rows:[], fields:any)=>{
                if (err ){
                    console.log(err)
                    reject(err['sqlMessage'])
                    return

                }

                if (!rows || rows.length === 0) {
                    resolve(false)
                    return

                }

                this.connection.query(sqlDelQuery, (err:any, rows:[], fields:any)=>{
                    if (err ){
                        console.log(err)
                        reject(err['sqlMessage'])
                        return

                    }
    
                    if (!rows || rows.length === 0) {
                        resolve(false)
                        return

                    }
    
                    resolve(true)
                })
                

                
            })
        })
        
    }

    async removeStatus (email:string,mask:number){
        return new Promise<boolean>((resolve, reject) => {

            let sqlQuery = `
                UPDATE gf_user SET status = status & (~${mask})
                WHERE email = "${email}";
            
            `
            
            this.connection.query(sqlQuery, (err:any, rows:[], fields:any)=>{
                if (err ){
                    console.log(err)
                    reject(err['sqlMessage'])
                }

                if (!rows || rows.length === 0) {
                    resolve(false)
                }
                resolve(true)
            })
        })
        
    }


    async create(vToken:string):Promise<string>{
        
        return new Promise<string>((resolve, reject) => {

            /*
            
             vToken types : 1 => email verificaiton
                            2 => pwd reset
                            ...
            
            */

            let timeStamp = Verif.getTimeStamp()

            let sql = `
            INSERT INTO gf_verification (email,vToken,timeout,type)
            VALUES('${this.email}','${vToken}',TIMESTAMP('${timeStamp}','0:15:0'),${this.type})
            `
            
            this.connection.query(sql, (err:any, rows:any, fields:any)=>{
                if (err){
                    reject(err['sqlMessage'])
                }
                resolve("OK")
            })
        })
    }

    update():Promise<boolean>{

        return new Promise<boolean>((resolve, reject) => {
            resolve(false)
        })
    }

    delete():Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {

            let sql = `DELETE from gf_verification 
            WHERE vToken = '${this.vToken}'`
            
            this.connection.query(sql, (err:any, rows:any, fields:any)=>{
                if (err){
                    reject(err['sqlMessage'])
                }
                resolve(true)
            })
        })
    }
}
