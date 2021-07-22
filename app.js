const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employeeDB",
});

function inquire() {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: [
        "View All Employees",
        "View All Employee Roles",
        "View All Employee Departments",
        "Edit Employee Info",
        "Add an Employee",
        "Add a Role",
        "Add a Department",
        "Exit"
      ],
    })

    .then(function (response) {
      // console.log(response)
      if (response.choice === "View All Employees") {
        viewAllEmployees();
      }
      if (response.choice === "View All Employee Roles") {
        viewEmployeeRoles();
      }
      if (response.choice === "View All Employee Departments") {
        viewAllDepartments();
      }
      if (response.choice === "Edit Employee Info") {
        updateEmployee();
      }
      if (response.choice === "Add an Employee") {
        addEmployee();
      }
      if (response.choice === "Add a Role") {
        addRole();
      }
      if (response.choice === "Add a Department") {
        addDepartment();
      }
    });
}

