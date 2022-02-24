const mysql=require('mysql');

//connection with mysql
 const dbc = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'crudoperation',
 });

 dbc.connect(function(error){
     if(error)throw error;
         console.log("Database connected Successfully");
    
 });

 module.exports=dbc;