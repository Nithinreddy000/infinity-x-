const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const db = require('./database'); // Import the database

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// License Validation Endpoint
app.post('/api/license-validation', (req, res) => {
    const { email, password } = req.body;
    db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
        if (err) {
            res.status(500).json({ message: 'Database error' });
        } else if (row) {
            req.session.guid = row.guid; // Store GUID in session
            res.json({ guid: row.guid });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});

// Mock companies data
const companies = [
    { 
        id: 'f458c354-3b9f-4228-a97e-b8158b4b5426', 
        name: 'Google', 
        image: 'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAA/FBMVEVHcEzZPyEWfuYWfuYVf97/SSYOs0gQge0WfugWfuYWfuYWfub/SyYbtUT/Syb/vwYSs0f/2QDtRSPZPyH/1QD/1QD/1QD/Syb/SybZPyHmQSASs0cWfuYQllMWfuYWfubaPyEWfuYWfubZPyEWfub/SyavyRj/VSPGzREyuD3bQCESs0f91QDXzwz/1QARkXX/vgb/XSH/1AD/swnsRSQSs0fZPyHZPyHZPyEWfubuOQ4Ss0fZPyEVgNkPmT4PmT4Ss0cPmT4Ss0cRpkMQlVoRpkMPmjcRpkMWfuYWfuf/Syb/1QARs0fZPyEPmT7sRSNzwSr/gxcQpkITiaHPojWwAAAASXRSTlMAbAfBtjg3CTny3sDC49sW2ygV/OfH8m/t3hhv+nAzLjMYdb3LKBXeb7wIvW/62RX6vG9v2RXIKfMmBseB3vPoKMjy2fv+KRiWSD86iQAAAMNJREFUCNc1j+d2wjAMhRUymsUoZSWMQDd7lLL3amWbQOn7vwu2Odwfkj5JV+cIACCZdXOn0UBJgpTuEkJOx+PTS1lijGOu7/GGwjHeJSSWffOHijerce51/j506fMnIqYp/RI58iAUgQxNPXIca6rjOKoGlLbinM0CSt3nJduyLERL+D+FPSgFv4iv0Gieo4a8b9pYeIb3KmOJ/OrnUJwjqhUAI8EYi26X4T/aptgz6rxxCcOdZt4e+s5PN/vFutjm9RX/oBuey4wALQAAAABJRU5ErkJggg==' 
    },
    { 
        id: '82340b9a-a429-47c5-8b2b-9a5c7f9e71b9', 
        name: 'Microsoft', 
        image: 'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAASFBMVEX/wQX2QjT2QjZKr1FKsFCgeUOLbZUfl/WmuCuQrH30Qzb/wQdMr1AhlvOYkmD4QTQdlvdIsFH/wgT/llD0Qzb/wQchlvNMr1AqkgqFAAAAE3RSTlPj4+Pi40VF40VF+Pj4+BPIyMjIR2Gy7QAAAD5JREFUCNelx7kRwCAMBMDjFfjDZsD03ykjKSJms8XRmA1+sAtt+di+ESV83jFE9SQFEm+uUL+gjC62fy8/J1OTDZbNrAi+AAAAAElFTkSuQmCC' 
    },
    {       id: '3fa72e00-e7d2-44ce-8d88-26cab7d1e075', 
        name: 'Tesla', 
        image: 'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAZlBMVEVHcExDSlOjpqtHTlc6Qks6QUtXXWUuMzkyOkNDSlOcoKWBhoxAR1BeZGxQVl9tcnl8gYc6Qkt2e4KUmJ1ES1RES1RDSlNRWGCusbVpb3ZpbnbDxcjLzc+rrrL////r7O1/hIqusbXLpAYnAAAAG3RSTlMARfVWKjaJARMMsm57n2rZ0GHa6ZwZ1PH+sbFoBIvDAAAAaklEQVQI142OSRKAIAwEAYEEXAF3cPv/J1UsD5y0L6mumiRDyDeAXFDBEaKprGwcY8w1ZaYuRx386Fd/+KDxDuS1NHazRtZ5XBAFwBRmgEI85xQQucg4X6q9Sl7SgSbOe542ajGt2AH5xQlMKQQZCn1OtgAAAABJRU5ErkJggg==' 
    }
];

  

// Companies Endpoint
app.get('/api/companies', (req, res) => {
    const guid = req.get('Authorization').split(' ')[1];

    if (guid === 'ca6c51db-35e7-4851-9504-d88a2d11f954') {
        res.json(companies);
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// Company Login Endpoint
app.post('/api/company-login', (req, res) => {
    const { email, password, companyId } = req.body;
    db.get('SELECT * FROM company_users WHERE email = ? AND password = ? AND company_id = ?', [email, password, companyId], (err, row) => {
        if (err) {
            res.status(500).json({ message: 'Database error' });
        } else if (row) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid email or password for the selected company' });
        }
    });
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
