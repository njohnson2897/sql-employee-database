const inquirer = require("inquirer");
const { initPrompt } = require('../index.js')
console.log(initPrompt)

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

function addRole(dbConnection, promptCallback) {
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
                message: 'Enter a name for the role'
            },
            // {
            //     type: 'input',
            //     name: 'roleDepartment',
            //     message: ''
            // },
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
};

function addEmployee(dbConnection, promptCallback) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeFirstName',
                message: 'Enter a name for the role'
            },
            {
                type: 'input',
                name: 'employeeLastName',
                message: 'Enter a name for the role'
            },
            // {
            //     type: 'input',
            //     name: 'employeeRole',
            //     message: ''
            // },
            // {
            //     type: 'input',
            //     name: 'employeeManager',
            //     message: ''
            // },
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
};

function updateEmployeeRole(dbConnection, promptCallback) {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter the ID number of the employee that you would like to update'
        },
        {
            type: 'input',
            name: 'newRole',
            message: 'Enter the name of the new role'
        }
        ])
        .then((response) => {
            const id = response.id;
            const newRole = response.newRole;
            const sql = 'UPDATE employee SET NAME = $1 WHERE id = $2';
            dbConnection.query(sql, [newRole, id], (err, queryResult => {
                if (err) {
                    console.error('Error updating employee information');
                } else {
                    console.log('Employee information successfully updated')
                }
                promptCallback();
            }));
        });
};


module.exports = {viewAllDepartments, viewAllEmployees, viewAllRoles, addDepartment, addRole, addEmployee, updateEmployeeRole}