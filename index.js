const { Pool }  = require('pg');
const inquirer = require('inquirer');

const pool = new Pool(
    {
        user:  'postgres',
        password: 'password123',
        host: 'localhost',
        database: 'organization_db'
    },
)

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
                'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
            }
        ])
        .then((response) => {
            if (response.menu  ===  'View all departments') {
                viewAllDepartments();
                initPrompt();
            } else if (response.menu  ===  'View all roles') {
                viewAllRoles();
                initPrompt();
            } else if (response.menu === 'View all employees') {
                viewAllEmployees();
                initPrompt();
            } else if (response.menu === 'Add a department') {


            } else if (response.menu === 'Add a role') {
                const sql = 'SELECT * FROM employee'

            } else if (response.menu === 'Add an employee') {
                const sql = 'SELECT * FROM employee'

            } else if (response.menu === 'Add a department') {
                const sql = 'SELECT * FROM employee'

            } else if (response.menu === 'Update an employee role') {
                const sql = 'SELECT * FROM employee'

            }
        });
        
}






