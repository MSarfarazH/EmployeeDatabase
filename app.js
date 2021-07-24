const inquirer = require("inquirer");
const mysql = require("mysql");
const ConsoleTable = require("console.table");

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
      console.log(response);
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
      console.log(res);
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
function pickManager() {
  connection.query(
    "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
    function (err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        managersArray.push(res[i].first_name);
      }
    }
  );
  return managersArray;
}

function updateEmployee() {
  connection.query(
    "SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      if (err) throw err;
      console.log(res);
      inquirer
        .prompt([
          {
            name: "lastName",
            type: "list",
            choices: function () {
              const lastName = [];
              for (let i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employee's last name? ",
          },
          {
            name: "role",
            type: "list",
            message: "What is the Employees new title? ",
            choices: pickRole(),
          },
        ])
        .then(function (res) {
          const roleId = pickRole().indexOf(res.role) +1;
          connection.query(
            "UPDATE employee SET WHERE ?",
            {
              last_name: res.lastName,
            },
            {
              role_id: roleId,
            },
            function (err) {
              if (err) throw err;
              console.table(res);
              inquire();
            }
          );
        });
    }
  );
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "Please enter their first name ",
      },
      {
        name: "lastname",
        type: "input",
        message: "Please enter their last name ",
      },
      {
        name: "role",
        type: "list",
        message: "Please enter employees role",
        choices: pickRole(),
      },
      {
        name: "choice",
        type: "list",
        message: "Please enter managers name",
        choices: pickManager(),
      },
    ])
    .then(function (res) {
      const roleId = pickRole().indexOf(res.role) +1;
      const managerId = pickManager().indexOf(res.choice) +1;
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: res.firstName,
          last_name: res.lastName,
          manager_id: managerId,
          role_id: roleId,
        },
        function (err) {
          if (err) throw err;
          console.table(res);
          inquire();
        }
      );
    });
}

inquire();
