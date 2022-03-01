const EmployeeModel = require("../models/employee.model");
//multer
const path = require("path");
const fs = require("fs");
//for getting all data
exports.getEmployeeList = (req, res) => {
  //console.log("here is all employee list");
  EmployeeModel.getAllEmployees((err, employees) => {
    //console.log("we are here Now");
    if (err) res.send(err);
    //console.log('Employees',employees);
    res.send(employees);
  });
};

//get by id
exports.getEmployeeById = (req, res) => {
  //console.log("you can get by id");
  EmployeeModel.getEmployeeById(req.params.id, (err, employees) => {
    // console.log("we are here Now");
    if (err) res.send(err);
    //console.log('Employees',employees);
    res.send(employees);
  });
};

//post new employees
exports.createNewEmployee = (req, res) => {
  const employeeReqData = new EmployeeModel(req.body);
  //   console.log("requested data", employeeReqData);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .send(400)
      .send({ success: false, message: "Please Fill All The Fields" });
  } else {
    console.log("valid data");

    EmployeeModel.createNewEmployee(employeeReqData, (err, employee) => {
      if (err) res.send(err);
      const image = req.body.image;
      //   mycode to save image
      var matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error("Invalid input string");
      }

      response.type = matches[1];
      response.data = new Buffer(matches[2], "base64");
      //////
      //convert image to file type
      //   console.log("image", response.data);
      const imageFile = Buffer.from(response.data, "base64");
      // save imageFile
      const imageName = "image-" + req.body.name + "-" + Date.now() + ".png";
      const imagePath = path.join(__dirname, "../../image", imageName);
      fs.writeFile(imagePath, imageFile, (err) => {
        if (err) {
          console.log(err);
        }
      });
      return res.json({
        status: true,
        message: "Added Successfully",
        data: employee,
      });
    });
  }
};

//updation of the details
exports.updateEmployee = (req, res) => {
  const employeeReqData = new EmployeeModel(req.body);
  //console.log("requested data",employeeReqData);
  //read image from the request

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .send(400)
      .send({ success: false, message: "update which one you have to update" });
  } else {
    //console.log("valid data");

    EmployeeModel.updateEmployee(
      req.params.id,
      employeeReqData,
      (err, employee) => {
        if (err) res.send(err);
        res.json({
          status: true,
          message: "updated Successfully",
          data: employee,
        });
      }
    );
  }
};

//Delete the details

exports.deleteEmployee = (req, res) => {
  EmployeeModel.deleteEmployee(req.params.id, (err, employees) => {
    // console.log("we are here Now");
    if (err) res.send(err);
    // console.log('Employees',employees);
    res.send(employees);
  });
};
