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