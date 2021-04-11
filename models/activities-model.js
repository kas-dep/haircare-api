var db = require('../db');

let model = {
    addActivity: (input, cb) => {
        let activity = {
            date: input.date,
            user_id: input.userId,
            course_of_action_id: input.courseOfActionId,
            product_id: input.productId,
        };
        return db.query('INSERT INTO activity SET ?', [activity], cb);
    },
    getActivities: (user_id, cb) => {
        return db.query('SELECT * FROM activity WHERE user_id=?', [user_id], cb)
    },
    updateActivity: (input, cb) => {
        let activity = {
            date: input.date,
            user_id: input.userId,
            course_of_action_id: input.courseOfActionId,
            product_id: input.productId,
        };
        return db.query('UPDATE activity SET ? WHERE id=?', [activity, input.id], cb)
    },
    deleteActivity: (id, cb) => {
        return db.query('DELETE FROM activity WHERE id=?', [id], cb)
    }
};

module.exports = model;