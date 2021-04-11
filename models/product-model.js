var db = require('../db');

let model = {
    getProducts: (user_id, cb) => {
        return db.query('SELECT * FROM product WHERE user_id=? ORDER BY id DESC' , [user_id], cb)
    },
    addProduct: (input, cb) => {
        let product = {
            name: input.name,
            category_id: input.categoryId,
            course_of_action_id: input.courseOfActionId,
            rate: input.rate,
            availability: input.availability,
            user_id: input.userId
        }
        return db.query('INSERT INTO product SET ?', [product], cb)
    },
    deleteProduct: (id, cb) => {
        return db.query('DELETE FROM product WHERE id=?', [id], cb)
    },
    updateProduct: (input, cb) => {
        let product = {
            name: input.name,
            category_id: input.categoryId,
            course_of_action_id: input.courseOfActionId,
            rate: input.rate,
            availability: input.availability,
            user_id: input.userId
        }
        return db.query('UPDATE product SET ? WHERE id=?', [product, input.id], cb)
    }
}
module.exports = model;