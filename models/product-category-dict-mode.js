var db = require('../db');

let model = {
    getProductCategoryDictionary: (cb) => {
        return db.query('SELECT * FROM product_category', cb);
    }
}

module.exports = model;