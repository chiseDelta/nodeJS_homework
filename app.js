const express = require('express');
const fsService = require('./services/fsService');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ============== VALIDATOR ==============
// ------- GET -------
app.get('/users', async (req, res) => {
    const users = await fsService.reader();
    res.json(users);
});
app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    const users = await fsService.reader();
    const user = users.find((user) => user.id === +userId);
    if (!user) {
        res.status(422).json(`User with ID ${userId} not found!`);
    }

    res.json(user);
});
// ------- POST -------
app.post('/users', async (req, res) => {
    const {name, age, gender} = req.body;

    if (!name || name.length <= 2) {
        res.status(400).json('Name is too short or Not written!');
    }
    if (!age || !Number.isInteger(age) || Number.isNaN(age)) {
        res.status(400).json('Age is not a number or Not written!');
    }
    if (!gender || (gender !== 'Male' && gender !== 'Female')) {
        res.status(400).json('Gender can only be Male / Female or Not written');
    }

    const users = await fsService.reader();
    const newUser = {id: users[users.length - 1]?.id + 1 || 1, name, age, gender};

    users.push(newUser);
    await fsService.writer(users);

    res.status(201).json(newUser);
});
// ------- PATCH -------
app.patch('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const {name, age, gender} = req.body;

    if (name && name.length <= 2) {
        res.status(400).json('Name is too short or Not written!');
    }
    if (age && !Number.isInteger(age) || Number.isNaN(age)) {
        res.status(400).json('Age is not a number or Not written!');
    }
    if (gender && (gender !== 'Male' && gender !== 'Female')) {
        res.status(400).json('Gender can only be Male / Female or Not written');
    }

    const users = await fsService.reader();
    const index = users.findIndex((user) => user.id === +userId);

    if (index === -1) {
        res.status(422).json(`User with ID ${userId} not found!`);
    }

    users[index] = {...users[index], ...req.body};

    await fsService.writer(users);
    res.status(201).json(users[index]);
});
// ------- DELETE -------
app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    const users = await fsService.reader();
    const index = users.findIndex((user) => user.id === +userId);

    if (index === -1) {
        res.status(422).json(`User with ID ${userId} not found!`);
    }
    users.splice(index, 1)

    await fsService.writer(users);

    res.sendStatus(204);
});
// =======================================

app.get('/test', (req, res) => {
    res.send('Server is working!');
})

const PORT = 5100;

app.listen(PORT, () => {
    console.log('Server has started!');
});