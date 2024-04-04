// imports the necessary modules
const { Pool }  = require('pg');
const inquirer = require('inquirer');
const { addDepartment, addEmployee, viewAllDepartments, viewAllEmployees, viewAllRoles,
addRole, updateEmployeeRole } = require('./helpers/promptFunctions');

// instantiates a new pool with database information to use to connect later on
const pool = new Pool(
    {
        user:  'postgres',
        password: 'password123',
        host: 'localhost',
        database: 'organization_db'
    },
);

// connects to the database using the pool information above
pool.connect()
    .then(() => {
        console.log('Connected to the organization_db database.');
        initPrompt();
        });

// function that initiates the line of inquirer prompts, called when the user connects to the database
function initPrompt() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'menu',
                choices: ['View all departments', 'View all roles', 'View all employees',
                'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'],
            }
        ])
        // conditional logic invoking a specific function based on the menu choice of the user
        .then((response) => {
            if (response.menu  ===  'View all departments') {
                viewAllDepartments(pool, initPrompt);
            } else if (response.menu  ===  'View all roles') {
                viewAllRoles(pool, initPrompt);
            } else if (response.menu === 'View all employees') {
                viewAllEmployees(pool, initPrompt);
            } else if (response.menu === 'Add a department') {
                addDepartment(pool, initPrompt);
            } else if (response.menu === 'Add a role') {
                addRole(pool, initPrompt);
            } else if (response.menu === 'Add an employee') {
                addEmployee(pool, initPrompt);
            } else if (response.menu === 'Update an employee role') {
                updateEmployeeRole(pool, initPrompt);
            } else if (response.menu === 'Exit') {
                // https://stackoverflow.com/questions/75291250/how-can-i-exit-inquirer-prompt-based-on-answer
                console.log('Exiting the application');
                process.exit();
            }
        });
}


module.exports = { initPrompt }






