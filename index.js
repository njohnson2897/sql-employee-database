const { Pool }  = require('pg');
const inquirer = require('inquirer');
const { addDepartment, addEmployee, viewAllDepartments, viewAllEmployees, viewAllRoles,
addRole, updateEmployeeRole } = require('./helpers/promptFunctions');

const pool = new Pool(
    {
        user:  'postgres',
        password: 'password123',
        host: 'localhost',
        database: 'organization_db'
    },
);

pool.connect()
    .then(() => {
        console.log('Connected to the organization_db database.');
        initPrompt();
        });

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
                console.log('Exiting the application');
                process.exit();
            }
        });
}


module.exports = { initPrompt }






