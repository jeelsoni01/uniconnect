import mongoose from "mongoose"
import { MongoClient, type Db } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local")
}

const uri = process.env.MONGODB_URI
const options = {}

interface GlobalMongo {
  conn: { 
    client: MongoClient | null;
    db: Db | null;
    mongoose: typeof mongoose | null;
  };
  promise: Promise<{ 
    client: MongoClient;
    db: Db;
    mongoose: typeof mongoose;
  }> | null;
}

declare global {
  var _mongoConnection: GlobalMongo
}

if (!global._mongoConnection) {
  global._mongoConnection = {
    conn: { client: null, db: null, mongoose: null },
    promise: null
  }
}

export async function connectToDatabase() {
  // Check if we have an existing connection
  if (global._mongoConnection.conn.client && 
      global._mongoConnection.conn.db && 
      global._mongoConnection.conn.mongoose) {
    return global._mongoConnection.conn
  }

  if (!global._mongoConnection.promise) {
    const client = new MongoClient(uri, options)
    
    global._mongoConnection.promise = (async () => {
      const clientConn = await client.connect()
      const mongooseInstance = await mongoose.connect(uri)
      
      return {
        client: clientConn,
        db: clientConn.db("inkwell"),
        mongoose: mongooseInstance
      }
    })()
  }

  try {
    const conn = await global._mongoConnection.promise
    global._mongoConnection.conn = conn
    return conn
  } catch (e) {
    console.error('Failed to connect to database:', e)
    throw e
  }
}

export default connectToDatabase
