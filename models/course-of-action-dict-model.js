var db = require('../db');
 
let model = {
    getCourseOfActionDictionary: (cb) => {
        return db.query('SELECT * FROM product_course_of_action', cb);
    }
};

module.exports = model;