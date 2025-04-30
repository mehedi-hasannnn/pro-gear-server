const express = require('express')
const cors = require('cors')
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

// middleware
app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c502c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
      // Connect the client to the servers (optional starting in v4.7)
    //   await client.connect();
  
      const equipmentCollection = client.db('sportDB').collection('equipment');
      const userCollection = client.db('sportDB').collection('users');
  
      app.get('/equipment', async(req,res)=>{
          const sortOrder = parseInt(req.query.sortOrder) || 1;
          const cursor = equipmentCollection.find().sort({ price: sortOrder });
          const result = await cursor.toArray();
          res.send(result);
      })
  
      app.get('/equipment-home', async(req,res)=>{
        const sortOrder = parseInt(req.query.sortOrder) || 1;
        const cursor = equipmentCollection.find().limit(6).sort({ price: sortOrder });
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/equipment/:id',async(req,res)=>{
        const id = req.params.id
        console.log(id)
        const result = await equipmentCollection.findOne({ _id: new ObjectId(id) });
        res.send(result)
      })
  
      app.post('/equipment', async(req,res)=>{
        const newEquipment = req.body;
        console.log(newEquipment)
        const result = await equipmentCollection.insertOne(newEquipment);
        res.send(result);
       
    })

    app.put('/equipment/:id', async(req,res)=>{
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)}
        const options = {upsert: true};
        const updatedEquipment= req.body;
        const equipment = {
          $set: {
            name: updatedEquipment.name,
            category: updatedEquipment.category,
            description: updatedEquipment.description,
            customization: updatedEquipment.customization,
            time: updatedEquipment.time,
            status: updatedEquipment.status,
            price: updatedEquipment.price,
            rating: updatedEquipment.rating,
            photo: updatedEquipment.photo,
          }
        }
        const result = await equipmentCollection.updateOne(filter, equipment, options);
        res.send(result);
      })
  
      app.delete('/equipment/:id',async(req,res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await equipmentCollection.deleteOne(query)
        res.send(result)
      })
  
      // users related apis
      app.get('/users', async(req,res)=>{
        const cursor = userCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      })
  
      app.post('/users', async(req,res)=>{
        const newUser = req.body;
        console.log(newUser);
        const result = await userCollection.insertOne(newUser);
        res.send(result);
      }) 
  
      // Send a ping to confirm a successful connection
      // await client.db("admin").command({ ping: 1 });
    //   console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
    }
  }
  run().catch(console.dir);
  
  
  app.get('/',(req,res)=>{
      res.send('Pro gear is running')
  })
  
  app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })