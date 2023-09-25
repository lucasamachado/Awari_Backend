import {MongoClient} from 'mongodb';

let singleton;

export default async function connect(){
  if (singleton) {
    return singleton;
  }
  const client = new MongoClient(process.env.MONGO_URL);
  await client.connect();
  singleton = client.db(process.env.MONGO_DB)
  return singleton
};


