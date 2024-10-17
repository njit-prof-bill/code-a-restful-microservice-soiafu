const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

const users = [];

function uniqueId() {
    let id;
    do {
        // Generate a random 9-digit number
        id = Math.floor(100000000 + Math.random() * 900000000);
    } while (users.find(u => u.id === id)); // Ensure the ID is unique
    return id.toString(); // Convert to string to maintain consistency
}

app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email){
        return res.status(404).json({ error: 'Name and email are required'});
    }

    const newUser = {
        id: uniqueId(),
        name,
        email
    };

    users.push(newUser); // adding to the array

    res.status(201).json(newUser);
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id; // get id from parameter
    const user = users.find(u => u.id === userId);
    
    if (!user){
        return res.status(404).json({ error: 'User not found'});
    }

    res.json(user); // return identified user
});

app.put('/users/:id', (req, res) => {
    const { name, email } = req.body; // get name and email from parameter
    const userId = req.params.id; // get id from parameter

    if (!name || !email){
        return res.status(404).json({ error: 'Name and email are required'});
    }

    const user = users.find(u => u.id === userId); // look for user in array
    
    if (!user){
        return res.status(404).json({ error: 'User not found'});
    }    

    user.name = name;
    user.email = email;

    res.json(user);

});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id; // get id from parameter
    const userIndex = users.findIndex(u => u.id === userId); // find index of user id
    if (userIndex == -1){
        return res.status(404).json({ error: 'User not found'});
    } 

    users.splice(userIndex, 1);

    res.status(204).send();

});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing