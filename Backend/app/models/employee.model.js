var dbc = require('../../config/db.config');

var Employee = function (employee) {
    this.name = employee.name;
    this.gender = employee.gender;
    this.date = employee.date;
    this.mobile = employee.mobile;
    this.email = employee.email;
    this.city = employee.city;
    this.status = employee.status ? employee.status : 1;
    this.created_at = new Date;
    this.updated_at = new Date;
    this.image = employee.image;
}

//Get all Employees

Employee.getAllEmployees = (result) => {
    dbc.query('SELECT * FROM employees', (err, res) => {
        if (err) {
            console.log("error");
            result(null, err);
        } else {
            //console.log("fetched successfully");
            result(null, res);
        }
    })
}
//get emp by id form db
Employee.getEmployeeById = (id, result) => {
    dbc.query('SELECT * FROM employees where id=?', id, (err, res) => {
        if (err) {
            console.log("error");
            result(null, err)
        } else {
            console.log("fetched successfully by id");
            result(null, res)
        }
    })

}

//creating new employee through post
Employee.createNewEmployee = (employeeReqData, result) => {
    dbc.query('INSERT INTO employees SET ?', employeeReqData, (err, res) => {
        if (err) {
            console.log("error");
            result(null, err)
        } else {
            console.log("inserted successfully");
            result(null, res)
        }
    })

}

// update existing data
Employee.updateEmployee = (id, employeeReqData, result) => {
    dbc.query('UPDATE employees SET name=?,gender=?,date=?,mobile=?,email=?,city=?,status=?,image=? WHERE id=?', [employeeReqData.name, employeeReqData.gender, employeeReqData.date, employeeReqData.mobile, employeeReqData.email, employeeReqData.city, employeeReqData.status, employeeReqData.image, id], (err, res) => {
        if (err) {
            console.log('error while updating');
            result(null, err);
        } else {
            console.log("updated");
            result(null, res);
        }
    })

}
//for deleting the details

Employee.deleteEmployee = (id, result) => {
    dbc.query('DELETE FROM employees WHERE id=?', [id], (err, res) => {
        if (err) {
            console.log("error while deleting");
            result(null, err)
        } else {
            console.log("deleted successfully");
            result(null, res)
        }
    })
}

module.exports = Employee;