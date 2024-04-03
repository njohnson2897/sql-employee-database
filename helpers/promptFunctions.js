const { default: inquirer } = require("inquirer");

function viewAllDepartments() {
    const sql = 'SELECT * FROM department'
    pool.query(sql, (err, queryResult) => {
        if (err) {
            console.log("Error displaying department data")
            return;
        } else {
            const rows = queryResult.rows;
            console.table(rows);
        }
    })
};

function viewAllRoles() {
    const sql = 'SELECT * FROM role'
    pool.query(sql, (err, queryResult) => {
        if (err) {
            console.log("Error displaying role data")
            return;
        } else {
            const rows = queryResult.rows;
            console.table(rows);
        };
    });
};

function viewAllEmployees() {
    const sql = 'SELECT * FROM employee'
    pool.query(sql, (err, queryResult) => {
        if (err) {
            console.log("Error displaying employee data")
            return;
        } else {
            const rows = queryResult.rows;
            console.table(rows);
        };
    });
};

function addDepartment() {
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
        const sql = `INSERT INTO department (name) VALUES ${departmentName}`;
        pool.query(sql), [departmentName], (err, queryResult) => {
            if  (err) {
                console.error('Error adding department');
            } else {
                console.log('Department added successfully.');
            }
        };
    });
};

function addRole() {
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
        const sql = `INSERT INTO role (title, salary, department) VALUES
         ${roleTitle, roleSalary, roleDepartment}`;
        pool.query(sql), [roleTitle, roleSalary, roleDepartment], (err, queryResult) => {
            if  (err) {
                console.error('Error adding role');
            } else {
                console.log('Role added successfully.');
            }
        };
    });
};

function addEmployee() {
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
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
         ${employeeFirstName, employeeLastName, employeeRole, employeeManager}`;
        pool.query(sql), [employeeFirstName, employeeLastName, employeeRole, employeeManager], (err, queryResult) => {
            if  (err) {
                console.error('Error adding employee');
            } else {
                console.log('Employee added successfully.');
            }
        };
    });
};




module.exports = {viewAllDepartments, viewAllEmployees, viewAllRoles, addDepartment, addRole, addEmployee, updateEmployeeRole}