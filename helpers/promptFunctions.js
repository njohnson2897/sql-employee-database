const inquirer = require("inquirer");

// function that displays the entire department table for the user
function viewAllDepartments(dbConnection, promptCallback) {
    const sql = 'SELECT * FROM department'
    dbConnection.query(sql, (err, queryResult) => {
        if (err) {
            console.log("Error displaying department data")
            return;
        } else {
            const rows = queryResult.rows;
            console.table(rows);
        }
        promptCallback();
    })
};

// function that displays the entire role table for the user
function viewAllRoles(dbConnection, promptCallback) {
    const sql = 'SELECT * FROM role'
    dbConnection.query(sql, (err, queryResult) => {
        if (err) {
            console.log("Error displaying role data")
            return;
        } else {
            const rows = queryResult.rows;
            console.table(rows);
        }
        promptCallback();
    });
};

// function that displays the entire employee table for the user
function viewAllEmployees(dbConnection, promptCallback) {
    const sql = 'SELECT * FROM employee'
    dbConnection.query(sql, (err, queryResult) => {
        if (err) {
            console.log("Error displaying employee data")
            return;
        } else {
            const rows = queryResult.rows;
            console.table(rows);
        }
        promptCallback();
    });
};

// function  that allows the user to add a department
// user only needs to supply a department name, it will automatically be given the next id # available
function addDepartment(dbConnection, promptCallback) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Enter a name for the department'
            }
        ])
        .then((response) =>  {
        const departmentName = response.departmentName;
        const sql = 'INSERT INTO department (name) VALUES ($1)';
        dbConnection.query(sql, [departmentName], (err, queryResult) => {
            if  (err) {
                console.error('Error adding department');
            } else {
                console.log('Department added successfully.');
            }
            promptCallback();
        });
    });
};

// function that adds a role to the role table
// user must supply a name for the role, a salary, and choose from a list of departments that it would sit under
function addRole(dbConnection, promptCallback) {
    // https://stackoverflow.com/questions/66626936/inquirer-js-populate-list-choices-from-sql-database
    // This link is where I read to select my data "AS value"  and "AS name" if necessary, in order to make the inquirer
    // ..list choices take the "name" properties from the object, but the response.roleDepartment take the "value" property.
    // I used this concept on each of the add or update functions in this file
    const sql =  'SELECT id AS value, name FROM department';

    // establishes another database connection just to select data  that will serve as my inquirer choices
    dbConnection.query(sql, (err, data) => {
        if (err) {
            console.error('Error gathering departments')
            return;
        }
    // if you were to log departmentChoices here, it is actually a series of objects containing both a name: property
    // and a value: property.  Based on my SQL selection above, the department id is stored in the value property and the
    // department name is stored in the name: property.  Inquirer inherently uses the name property when listing out
    // the choices in the list-type prompt yet uses the value when accessing the response.roleDepartment
    const departmentChoices = data.rows

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Enter a name for the role'
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'Enter a salary for the role'
            },
            {
                type: 'list',
                name: 'roleDepartment',
                message: 'Select the department this role belongs to',
                choices: departmentChoices
            },
        ])
        .then((response) =>  {
        const roleTitle = response.roleTitle;
        const roleSalary = response.roleSalary;
        const roleDepartment = response.roleDepartment;
        const sql = 'INSERT INTO role (title, salary, department) VALUES  ($1, $2, $3)';
         dbConnection.query(sql, [roleTitle, roleSalary, roleDepartment], (err, queryResult) => {
            if  (err) {
                console.error('Error adding role');
            } else {
                console.log('Role added successfully.');
            }
            promptCallback();
            });
        });
    });
};

// function to add an employee to the employee table
// user must provide the first and last name of the employee, choose from a list of roles for
// ..the employee to fulfill, and choose from a list of managers for the employee
function addEmployee(dbConnection, promptCallback) {
    const sql1 =  'SELECT id AS value, title AS name FROM role';
    // the next 15 lines of code here provide the same functionality as what I did for the addRole function above
    // except in this case I did it for both the roleChoices and the managerChoices variables
    dbConnection.query(sql1, (err, data) => {
        if (err) {
            console.error('Error gathering roles')
            return;
        }

    const roleChoices = data.rows

    const sql2 =  `SELECT id AS value, CONCAT(first_name, ' ', last_name) AS name FROM employee`;

    dbConnection.query(sql2, (err, data) => {
        if (err) {
            console.error('Error gathering employees')
            return;
        }

    const managerChoices = data.rows

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeFirstName',
                message: 'Enter a first name of the employee'
            },
            {
                type: 'input',
                name: 'employeeLastName',
                message: 'Enter a last name of the employee'
            },
            {
                type: 'list',
                name: 'employeeRole',
                message: 'Choose the role that this employee will fulfill',
                choices: roleChoices
            },
            {
                type: 'list',
                name: 'employeeManager',
                message: 'Choose the manager of this employee',
                choices: managerChoices
            },
        ])
        .then((response) =>  {
        const employeeFirstName = response.employeeFirstName;
        const employeeLastName = response.employeeLastName;
        const employeeRole = response.employeeRole;
        const employeeManager = response.employeeManager;
        const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
         dbConnection.query(sql, [employeeFirstName, employeeLastName, employeeRole, employeeManager], (err, queryResult) => {
            if  (err) {
                console.error('Error adding employee');
            } else {
                console.log('Employee added successfully.');
            }
            promptCallback();
        });
        });
    });
    });
};

// function that allows the user to update the role of an existing employee on the employee table
// the user must pick from a list of current employees and then choose a new role from a list
function updateEmployeeRole(dbConnection, promptCallback) {
    const sql =  `SELECT id AS value, CONCAT(first_name, ' ', last_name) AS name FROM employee`;
// the next 15 lines of code here provide the same functionality as what I did for the addRole function above
// except now for both employeeChoices and roleChoices
    dbConnection.query(sql, (err, data) => {
        if (err) {
            console.error('Error gathering employees')
            return;
        }

    const employeeChoices = data.rows

    const sql2 =  `SELECT id AS value, title AS name FROM role`;

    dbConnection.query(sql2, (err, data) => {
        if (err) {
            console.error('Error gathering roles')
            return;
        }

    const roleChoices = data.rows

    inquirer
        .prompt([
        {
            type: 'list',
            name: 'employeeList',
            message: 'Choose the employee to update',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'newRole',
            message: 'Choose a role to assign to the selected employee',
            choices: roleChoices
        }
        ])
        .then((response) => {
            const employee = response.employeeList;
            const newRole = response.newRole;
            const sql = 'UPDATE employee SET role_id = $1 WHERE id = $2';
            dbConnection.query(sql, [newRole, employee], (err, queryResult => {
                if (err) {
                    console.error('Error updating employee information');
                } else {
                    console.log('Employee information successfully updated')
                }
                promptCallback();
            }));
        });
    });
    });
};

// exports all of the helper functions for use in  index.js
module.exports = {viewAllDepartments, viewAllEmployees, viewAllRoles, addDepartment, addRole, addEmployee, updateEmployeeRole}