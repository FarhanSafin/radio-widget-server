//required and initiating packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//mongodb connection parameters
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lnuak.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//api
async function run () {
    try{
        //connection to database and collection
        await client.connect();
        const stationCollection = client.db('radio-database').collection('radio-collection');

        //get api

        app.get('/radiolist', async (req, res) => {
            const query = {};
            const cursor = stationCollection.find(query);
            const collections = await await cursor.toArray();
            res.send(collections);
        });
    }

    finally{

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server Running');
});

//listening to the server port
app.listen(port, () => {
    console.log("Listen", port);
})