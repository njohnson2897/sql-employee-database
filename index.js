const { Pool }  = require('pg');
const Inquirer = require('inquirer');

const pool = new Pool(
    {
        user:  'postgres',
        password: 'password123',
        host: 'localhost',
        database: 'organization_db'
    },
    console.log(`Connected to the organization_db database.`)
)


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

