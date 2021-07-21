const inquirer = require("inquirer")
const mysql = require("mysql")
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employeeDB"
  });

  function inquire() { [
    inquirer.prompt({
      type: "list",
      message: "What do you need to do?",
      name: "choice",
      choices: [
        "View All Employees",
        "View All Employee Roles",
        "View All Employee Departments",
        "Edit Employee Info",
        "Add an Employee",
        "Add a Role",
        "Add a Department"
      ]   
    })
  ]}

  //sql queries to post, read and delete data
  