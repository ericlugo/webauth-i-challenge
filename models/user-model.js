const db = require('../data/dbConfig.js');

const userModel = (module.exports = {});

userModel.find = function(id) {
  if (id)
    return db(`user`)
      .select('user_id', 'user_name')
      .where(`user_id`, id)
      .first();
  else return db(`user`).select('user_id', 'user_name');
};

userModel.findBy = function(filter) {
  return db(`user`)
    .where(filter)
    .first();
};

userModel.add = async function(user) {
  const [id] = await db(`user`).insert(user, `user_id`);
  return userModel.find(id);
};
