import { Sequelize } from 'sequelize';


export const sequelize = new Sequelize('freedb_umsProject', 'freedb_qutiba99', '$yS8Fq6%w%4V7HA', {
    host: 'sql.freedb.tech',
    port: 3306,
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });


 export const connectDB = ()=>{
    sequelize.sync()
    .then(()=>{
        console.log('connected successfully to database');
    }).catch((error)=>{
        console.log('failed to connect to database' + error);
    });
 } 