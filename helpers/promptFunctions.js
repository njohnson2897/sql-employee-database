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
            initPrompt()
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
            initPrompt();
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
            initPrompt();
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
        const sql = `INSERT INTO department (name) VALUES ${response.departmentName}`;
        pool.query(sql), [departmentName], (err, queryResult) => {
            if  (err) {
                console.error('Error adding department');
            } else {
                console.log('Department added successfully.');
            }
        };
    });
};



module.exports = {viewAllDepartments, viewAllEmployees, viewAllRoles, addDepartment}