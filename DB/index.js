const { MongoClient, ObjectId } = require('mongodb')
const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`
const client = new MongoClient(uri)


const connect = async () => {
  try {
      console.log(uri)
        await client.connect() 
        await listDatabases(client) 
   } catch (e) {
    console.error(e)
  }
}

const listDatabases = async (client) => {
    databasesList = await client.db().admin().listDatabases()
    console.log('Databases:')
    databasesList.databases.forEach((db) => console.log(`- ${db.name}`))
  }


  const createListing = async (client, newListing) => {
    const result = await client.db(`${DB_NAME}`).collection('movies').insertOne(newListing)
  
    console.log(`New listing created with the following id: ${result.insertedId}`)
  }
  
  async function updateMovieByTitle(client, title, update) {
    const result = await client
      .db(`${DB_NAME}`)
      .collection('movies')
      .updateOne({ title }, { $set: update })
    console.log(`${result.matchedCount} document(s) matched the query criteria.`)
    console.log(`${result.modifiedCount} document(s) was/were updated.`)
  }

  async function updateMovieByID(client, _id, update) {
    const result = await client
      .db(`${DB_NAME}`)
      .collection('movies')
      .updateOne({ _id }, { $set: update })
    console.log(`${result.matchedCount} document(s) matched the query criteria.`)
    console.log(`${result.modifiedCount} document(s) was/were updated.`)
  }

  
  async function findMovieByTitle(client, title) {
    re = new RegExp(title, 'i')
    console.log(re)
    const result = await client.db(`${DB_NAME}`).collection('movies').findOne({ title: re })
  
    if (result) {
      console.log(`Found a movie by '${title}':`)
      console.log(result)
    } else {
      console.log(`No movie found with the title '${title}'`)
    }
    return result
  }

  async function findMovieByID(client, ID) {
    const result = await client.db(`${DB_NAME}`).collection('movies').findOne({ _id: ObjectId(ID) })
  
    if (result) {
      console.log(`Found a movie by '${ID}':`)
      console.log(result)
    } else {
      console.log(`No movie found with the ID '${ID}'`)
    }
    return result
  }

  async function findMovieManyByTitle(client, title) {
    re = new RegExp(title, 'i')
    console.log(re)
    const cursor = await client.db(`${DB_NAME}`).collection('movies').find({ title: re })
  
    if (cursor) {
      console.log(`Found a movie by '${title}':`)
      const res = await cursor.toArray();
      console.log(res)
      return res
    } else {
      console.log(`No movie found with the title '${title}'`)
    }
  }
  
  async function findMovies(client) {
    let res = []
    const cursor = await client.db(`${DB_NAME}`).collection('movies').find()
  
    if (cursor) {
      res = await cursor.toArray();
      console.log(res)
    } else {
      console.log(`No movie found with the title '${title}'`)
    }
    return res
  }

  
  async function deleteMovieByID(client, id) {
    const result = await client.db(`${DB_NAME}`)
    .collection('movies')
    .deleteOne({ _id: id})
    console.log(`${result.deletedCount} document(s) was/were deleted.`)
  }
  


module.exports = {
    client,
    connect,
    findMovieByTitle,
    findMovieManyByTitle,
    findMovieByID,
    findMovies,
    createListing,
    updateMovieByTitle,
    updateMovieByID,
    deleteMovieByID
}

