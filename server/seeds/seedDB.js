const models = require("../models");

module.exports = async (modelName, collectionName) => {
  try {
    let modelExists = await models[modelName].db.db
      .listCollections({
        name: collectionName,
      })
      .toArray();

    if (modelExists.length) {
      await models[modelName].collection.drop();
    }
  } catch (err) {
    throw err;
  }
};
