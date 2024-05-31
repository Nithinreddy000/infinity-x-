const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:'); // In-memory database for demonstration

db.serialize(() => {
    // Create users table
    db.run(`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            guid TEXT NOT NULL
        )
    `);

    // Insert a mock user
    const stmtUser = db.prepare(`INSERT INTO users (email, password, guid) VALUES (?, ?, ?)`);
    stmtUser.run('user@example.com', 'password123', 'ca6c51db-35e7-4851-9504-d88a2d11f954');
    stmtUser.finalize();

    // Create company users table
    db.run(`
        CREATE TABLE company_users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            company_id TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `);

    // Insert mock company users
    const stmtCompanyUser1 = db.prepare(`INSERT INTO company_users (company_id, email, password) VALUES (?, ?, ?)`);
    stmtCompanyUser1.run('f458c354-3b9f-4228-a97e-b8158b4b5426', 'companyuser@example.com', 'companypassword123');
    stmtCompanyUser1.finalize();

    const stmtCompanyUser2 = db.prepare(`INSERT INTO company_users (company_id, email, password) VALUES (?, ?, ?)`);
    stmtCompanyUser2.run('82340b9a-a429-47c5-8b2b-9a5c7f9e71b9', 'companyuser2@example.com', 'companypassword123');
    stmtCompanyUser2.finalize();

    const stmtCompanyUser3 = db.prepare(`INSERT INTO company_users (company_id, email, password) VALUES (?, ?, ?)`);
    stmtCompanyUser3.run('3fa72e00-e7d2-44ce-8d88-26cab7d1e075', 'companyuser3@example.com', 'companypassword123');
    stmtCompanyUser3.finalize();
});

module.exports = db;
