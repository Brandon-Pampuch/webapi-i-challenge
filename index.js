// implement your API here
const express = require('express'); // import the express package
const server = express(); // creates the server
const db = require("./data/db")

// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
  res.send('Hello from Express');
});

server.get('/api/users', (req, res) => {
    db.find().then(users =>{

        res.status(200).json(users)
    }).catch(err =>{
        res.status(500).json({message:"error retrieving users"})
    })
});

// watch for connections on port 5000
server.listen(4000, () =>
  console.log('Server running on http://localhost:5000')
);

