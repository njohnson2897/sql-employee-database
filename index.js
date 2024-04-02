const { Pool }  = require('pg');
const Inquirer = require('inquirer');


Inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'menu',
            choices: ['View all departments', 'View all roles', 'View all employees',
            'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        }
    ]
    );
