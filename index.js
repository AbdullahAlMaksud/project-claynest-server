const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
console.log(port)

//------------------------------
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.1fo0aid.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {

    const craftItemCollection = client.db('carftItemDB').collection('craftItems')

    app.get('/craftItems', async (req, res) => {
      const cursor = craftItemCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/craftItems/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await craftItemCollection.findOne(query);
      res.send(result)
    })

    // app.get('/craftItems/:email', async (req, res) => {
    //   const email = req.params.email;
    //   const query = { user_email: new ObjectId(email) }
    //   const cursor = await craftItemCollection.find(query).toArray()
    //   res.send(cursor)
    // })

    app.post('/craftItems', async (req, res) => {
      const newCraftItem = req.body;
      const result = await craftItemCollection.insertOne(newCraftItem);
      res.send(result)
      console.log(newCraftItem)
    })


    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//--------------------

app.get('/', (req, res) => {
  res.send('ClayNest Server is Running....')
})

app.listen(port, () => {
  console.log(process.env.PORT)
  console.log(`ClayNest server running on port ${port}`)
})