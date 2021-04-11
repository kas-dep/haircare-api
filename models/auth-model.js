var db = require('../db');

let model = {
    register: (input, cb) => {
        let data = {
            first_name: input.firstName,
            last_name: input.lastName,
            email: input.email,
            password: input.password,
            hair_type: input.hairType,
            nick: input.nick
        };
        return db.query('INSERT INTO user SET ?', [data], cb)
    },

    findOne: (email) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE email=?', [email], (error, result) => {
                if (error) reject(error);
                resolve(result && result.length ? result[0] : null);
            });
        })
    },
    findById: (id, cb) => {
        return db.query('SELECT * FROM user WHERE id=?', [id], cb)
    }
};

module.exports = model;

