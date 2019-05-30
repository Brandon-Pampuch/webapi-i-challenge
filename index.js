// implement your API here
const express = require('express'); // import the express package
const server = express(); // creates the server
const db = require("./data/db")

//to help json parse the body for post and put
server.use(express.json())

// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
  res.send('Hello from Express');
});
// The R in crud
server.get('/api/users', (req, res) => {
    db.find().then(users =>{

        res.status(200).json(users)
    }).catch(err =>{
        res.status(500).json({message:"error retrieving users"})
    })
});

// The C in crud

server.post('/api/users', (req, res) => {

    const newUser = req.body;
    db.insert(newUser).then(user =>{
        res.status(201).json(user)
    }).catch(err =>{
        res.status(500).json({message:"error creating user"})
    })
});
// The D in crud

server.delete('/api/users/:id', (req, res) => {

    const id = req.params.id;
    db.remove(id).then(deleted =>{
        res.status(204).end() // tells client it's done
    }).catch(err =>{
        res.status(500).json({message:"error deleting user"})
    })
});

server.put('/api/users/:id', (req, res) => {

    const id = req.params.id;
    const changes = req.body
    db.update(id, changes).then(updated =>{
        if(updated){
            res.status(200).json({message: "updated users"})
        }else{
            res.status(404).json({message:"nothing here"})
        }
    }).catch(err =>{
        res.status(500).json({message:"error updating user"})
    })
});



const port = process.env.PORT || 4000

console.log()
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});

