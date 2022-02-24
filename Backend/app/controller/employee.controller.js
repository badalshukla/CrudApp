const EmployeeModel=require('../models/employee.model')
//for getting all data
exports.getEmployeeList=(req,res)=>{
    //console.log("here is all employee list");
    EmployeeModel.getAllEmployees((err,employees)=>{
        console.log("we are here Now");
        if(err)
        res.send(err);
        console.log('Employees',employees);
        res.send(employees);
    })
}

//get by id 
exports.getEmployeeById=(req,res)=>{
   //console.log("you can get by id");
   EmployeeModel.getEmployeeById(req.params.id,(err,employees)=>{
    console.log("we are here Now");
    if(err)
    res.send(err);
    console.log('Employees',employees);
    res.send(employees);
})
}


//post new employees
exports.createNewEmployee=(req,res)=>{
    const employeeReqData=new EmployeeModel(req.body);
        console.log("requested data",employeeReqData); 
        if(req.body.constructor === Object && Object.keys(req.body).length===0){
            res.send(400).send({success:false,message:'Please Fill All The Fields'});
        }else{
            console.log("valid data");
            
            EmployeeModel.createNewEmployee(employeeReqData,(err,employee)=>{
                if(err)
                    res.send(err);
                    res.json({status:true,message:'Added Successfully',data:employee})
                
            })
        }
}

//updation of the details
exports.updateEmployee=(req,res)=>{
    const employeeReqData=new EmployeeModel(req.body);
    console.log("requested data",employeeReqData); 
    if(req.body.constructor === Object && Object.keys(req.body).length===0){
        res.send(400).send({success:false,message:'update which one you have to update'});
    }else{
        console.log("valid data");
        
        EmployeeModel.updateEmployee(req.params.id,employeeReqData,(err,employee)=>{
            if(err)
                res.send(err);
                res.json({status:true,message:'updated Successfully',data:employee})
            
        })
    }

}

//Delete the details

exports.deleteEmployee=(req,res)=>{

    EmployeeModel.deleteEmployee(req.params.id,(err,employees)=>{
        console.log("we are here Now");
        if(err)
        res.send(err);
        console.log('Employees',employees);
        res.send(employees);
    })

}