const express = require('express');
const app = express();
const {MongoClient} = require('mongodb');

app.get('/api/users',(req,res)=>{
    res.json([
        {
            id:1,
            username:'Rhn'
        },
        {
            id:2,
            username:'Keshav'
        }
    ])
})

const port = process.env.PORT || 3001;
app.listen(port)