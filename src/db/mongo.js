const MongoClient = require('mongodb').MongoClient;
// const url = process.env.MONGOURL;
const url = "mongodb+srv://user1:User@prasad-5c9fw.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(url, { useNewUrlParser: true });

client.connect(err => {
  if (err) throw err;
  console.log("connected");
  const collection = client.db("test").collection("Users");
  collection.insertMany([{name:"Prasad"},{name:"Prasanna"}])
  collection.findOne({}, (err,result) => {
      console.log("Fetched result is" + JSON.stringify(result))
  })
 // perform actions on the collection object
  client.close();
});