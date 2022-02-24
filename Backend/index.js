const express=require('express');
const app=express();
const port= process.env.port || 5000;
const bodyparser=require('body-parser');
const cors = require("cors");

//cors origin

var corsOptions = {
    origin: "http://localhost:4200"
  };

  app.use(cors(corsOptions));

// body parse 
app.use(bodyparser.urlencoded({extended:false}));

//parse in json
app.use(bodyparser.json());

app.get('/',(req,res)=>{
    res.end("hellooo");
});

//importing employee routes
const employeeRoutes=require('./app/routes/employee.route');
//creating employee routes
app.use('/api/v1/employees',employeeRoutes);



app.listen(port,()=>{
    console.log(`listenig to port ${port}`);
});