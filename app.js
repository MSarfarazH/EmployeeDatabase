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

connection.connect((err) => {
  if (err) throw err;
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
        "Exit",
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

function viewAllEmployees() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      inquire();
    }
  );
}

function viewEmployeeRoles() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      inquire();
    }
  );
}

function viewAllDepartments() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      inquire();
    }
  );
}

const rolesArray = [];
function pickRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    for (let i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
  }
  });
  return rolesArray;
}

const managersArray = [];
function selectManager() {
  connection.query(
    "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
    function (err, res) {
      if (err) throw err;
      for (const i = 0; i < res.length; i++) {
        managersArray.push(res[i].first_name);
      }
    }
  );
  return managersArray;
}


inquire();
