import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let database: Db | null = null;

export async function connectMongo(): Promise<Db> {
  if (database) return database;

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || 'stdtech_group';

  if (!uri) {
    throw new Error(
      'MONGODB_URI is missing. Add your MongoDB Atlas connection string to the server environment.'
    );
  }

  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
  });

  await client.connect();
  database = client.db(dbName);

  await database.command({ ping: 1 });
  console.log(`[MongoDB] Connected to database "${dbName}"`);

  return database;
}

export function getMongoDb(): Db {
  if (!database) {
    throw new Error('MongoDB is not connected yet.');
  }
  return database;
}

export async function closeMongo(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    database = null;
  }
}
