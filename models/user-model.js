var db = require('../db');

let model = {
  getUser: (id, cb) => {
    return db.query(
      'SELECT u.id, u.first_name, u.last_name, u.email, u.hair_type, u.nick FROM user u WHERE id=?',
      [id],
      cb
    );
  },

  updateUser: (input, cb) => {
    let dataToUpdate = {
      first_name: input.firstName,
      last_name: input.lastName,
      hair_type: input.hairType,
      email: input.email,
      nick: input.nick,
    };
    return db.query(
      'UPDATE user SET ? WHERE id=?',
      [dataToUpdate, input.id],
      cb
    );
  },
};

module.exports = model;
