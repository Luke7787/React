// backend_with_db.js
const express = require('express');
const cors = require('cors');
const userServices = require('./models/user-services');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', async (req, res) => {
    const name = req.query['name'];
    const job = req.query['job'];
    try {
        let result;
        if (name && job) {
            result = await userServices.getUsersByNameAndJob(name, job);
        } else if (name) {
            result = await userServices.getUsersByName(name);
        } else if (job) {
            result = await userServices.getUsersByJob(job);
        } else {
            result = await userServices.getAllUsers();
        }
        res.send({ users_list: result });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred on the server.');
    }
});

app.get('/users/:id', async (req, res) => {
    const id = req.params['id'];
    const result = await userServices.findUserById(id);
    if (result === undefined || result === null)
        res.status(404).send('Resource not found.');
    else {
        res.send({users_list: result});
    }
});

app.post('/users', async (req, res) => {
    const user = req.body;
    const savedUser = await userServices.addUser(user);
    if (savedUser)
        res.status(201).send(savedUser);
    else
        res.status(500).end();
});

app.delete('/users/:id', async (req, res) => {
    const id = req.params['id'];
    try {
        const deleteResult = await userServices.deleteUserById(id);
        if (deleteResult) {
            res.status(204).send();
        } else {
            res.status(404).send('User not found.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred on the server.');
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
