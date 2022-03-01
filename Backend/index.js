const express=require('express');
const app=express();
const port= process.env.port || 5000;
const bodyparser=require('body-parser');
const cors = require("cors");
const multer=require('multer');
const path =require('path');


//multer for file storing

const PATH = './image';
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, PATH);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });
  let upload = multer({
    storage: storage
  });


  


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

// post method for multer
app.post('/upload', upload.single('image'), function (req, res) {
    if (!req.file) {
      console.log("No file is available!");
      return res.send({
        success: false
      });
    } else {
      console.log('File is available!');
      return res.send({
        success: true
      })
    }
  });
