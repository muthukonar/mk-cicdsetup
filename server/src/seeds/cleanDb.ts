// import models from '../models/index.js';
// import db from '../config/connection.js';

// export default async (modelName: "Question", collectionName: string) => {
//   try {
//     let modelExists = await models[modelName].db.db.listCollections({
//       name: collectionName
//     }).toArray()

//     if (modelExists.length) {
//       await db.dropCollection(collectionName);
//     }
//   } catch (err) {
//     throw err;
//   }
// }

import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    // Check if the model exists in the models object
    const model = models[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found.`);
    }

    // List all collections and check if the specified collection exists
    const collections = await db.listCollections(); // This returns the collections array directly

    // Check if the collection exists
    const collectionExists = collections.some((collection: { name: string }) => collection.name === collectionName);

    if (collectionExists) {
      // Drop the collection if it exists
      await db.dropCollection(collectionName);
      console.log(`Collection ${collectionName} dropped successfully.`);
    } else {
      console.log(`Collection ${collectionName} does not exist.`);
    }
  } catch (err) {
    console.error(`Error in dropping collection ${collectionName}:`, err);
    throw err;
  }
}
