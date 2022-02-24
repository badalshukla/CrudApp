const express=require('express');
const router=express.Router();

const employeeCnotroller=require('../controller/employee.controller');
const { updateEmployee, deleteEmployee } = require('../models/employee.model');

//get al employees
router.get('/',employeeCnotroller.getEmployeeList);

//get by id
router.get('/:id',employeeCnotroller.getEmployeeById);


//create new Employee
router.post('/',employeeCnotroller.createNewEmployee);

//updating with put

router.put('/:id',employeeCnotroller.updateEmployee);


//delete with delete

router.delete('/:id',employeeCnotroller.deleteEmployee);

module.exports=router;
