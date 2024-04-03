const inquirer = require("inquirer");

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
    const sql =  'SELECT id AS value, name FROM department';

    dbConnection.query(sql, (err, data) => {
        if (err) {
            console.error('Error gathering departments')
            return;
        }

    const departmentChoices = data.rows
    console.log(departmentChoices)
    
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

function addEmployee(dbConnection, promptCallback) {
    const sql1 =  'SELECT id AS value, title AS name FROM role';

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

function updateEmployeeRole(dbConnection, promptCallback) {
    const sql =  `SELECT id AS value, CONCAT(first_name, ' ', last_name) AS name FROM employee`;

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


module.exports = {viewAllDepartments, viewAllEmployees, viewAllRoles, addDepartment, addRole, addEmployee, updateEmployeeRole}