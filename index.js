const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;

//midleware:
app.use(express.json());
app.use(cors())


const uri = "mongodb+srv://seoPageTask:aRTw20w6YgqNF2AN@cluster0.zrkl84y.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        const dataCollention = client.db('seoPage').collection('seoPageData');

        app.get('/data', async (req, res) => {

            const result = await dataCollention.find().toArray()
            res.send(result)

        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('toy car server is opne now...')
})



app.listen(port, () => {
    console.log(`my toy car server is running on port: ${port}`);
})