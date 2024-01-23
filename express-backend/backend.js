// backend.js
import express from "express";
import cors from 'cors';

const app = express();
const port = 8000;

const users = { 
   users_list :
   [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result = findUsers(name, job);
    result = { users_list: result };
    res.send(result);
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

const findUsers = (name, job) => {
    return users['users_list'].filter(user => {
        return (name === undefined || user.name === name) && (job === undefined || user.job === job);
    });
};

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

function addUser(user) {
    const userId = generateRandomId(); // Generate the new ID
    // Create a new user object with properties in the desired order
    const newUser = {
        id: userId,
        name: user.name,
        job: user.job
    };
    users['users_list'].push(newUser); // Add the new user to the users_list
}

// DELETE a user by id
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const deleteResult = deleteUserById(id);
    if (deleteResult) {
        res.status(200).send(`User with id ${id} deleted.`);
    } else {
        res.status(404).send('User not found.');
    }
});

function deleteUserById(id) {
    const initialLength = users['users_list'].length;
    users['users_list'] = users['users_list'].filter(user => user.id !== id);
    return users['users_list'].length !== initialLength;
}

function generateRandomId() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let randomId = '';
    for (let i = 0; i < 3; i++) { 
        randomId += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 3; i++) {
        randomId += Math.floor(Math.random() * 10).toString();
    }
    return randomId;
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  
