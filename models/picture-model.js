var db = require('../db');

const getPictureModel = (pictures) => {
    let picture = null;
    if (pictures && pictures.length) {
        picture = {
            date: pictures[0].picture_date,
            image: Buffer.from(pictures[0].content).toString(),
        }
    }
    return picture;
}

let model = {
    addPicture: (input, cb) => {
        const picture = {
            user_id: input.userId,
            picture_date: input.date,
            note: input.note,
            content: input.image,
        };
        return db.query('INSERT INTO picture SET ?', [picture], cb);
    },
    getPictures: (user_id, cb) => {
        return db.query('SELECT picture_date, note, id FROM picture WHERE user_id=? ORDER BY picture_date DESC', [user_id], cb)
    },
    
    getPicture: (id, cb) => {
        return db.query('SELECT content FROM picture WHERE id=?', [id], cb)
    },
    getNewestPicture: (user_id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT picture_date, content FROM picture WHERE user_id=? AND picture_date = (SELECT MAX(picture_date) FROM picture WHERE user_id=?) ORDER BY id DESC LIMIT 1', [user_id, user_id],  (error, result) => {
                if (error) reject(error);
                const picture = getPictureModel(result);
                resolve(picture);
            });
        });
    },
    getOldestPicture: (user_id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT picture_date, content FROM picture WHERE user_id=? AND picture_date = (SELECT MIN(picture_date) FROM picture WHERE user_id=?) ORDER BY id LIMIT 1', [user_id, user_id], (error, result) => {
                if (error) reject(error);
                const picture = getPictureModel(result);
                resolve(picture);
            });
        });
    },
    updatePicture: (input, cb) => {
        const picture = {
            user_id: input.userId,
            picture_date: input.date,
            note: input.note,
            content: input.image,
        }
        return db.query('UPDATE picture SET ? WHERE id=?', [picture, input.id], cb)
    },
    deletePicture: (id, cb) => {
        return db.query('DELETE FROM picture WHERE id=?', [id], cb)
    },
}

module.exports = model;