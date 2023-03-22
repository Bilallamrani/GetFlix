"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql2');
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class DbConnect {
    connection;
    constructor() {
        // dotenv.config();
        // this.connection = createPool({
        //     host: process.env.MYSQLHOST,
        //     user: process.env.MYSQLUSER,
        //     password: process.env.MYSQLPASSWORD,
        //     database: process.env.DATABASE,
        //     connectionLimit :10,
        //     waitForConnections: true,
        //     // multipleStatements: true 
        // });
        this.connection = mysql.createConnection(process.env.DATABASE_URL);
        // console.log(`Connected to ${process.env.DATABASE} on Port ${parseInt(process.env.PORT_NUM as string)}`)
    }
    pollEnd() {
        setTimeout(() => {
            this.connection.end();
        }, 500);
    }
}
exports.default = DbConnect;