var express = require('express');
var router = express.Router();
const model = require('../models/course-of-action-dict-model');

router.get('/', function(req, res) {
    return model.getCourseOfActionDictionary(function(err, result) {
        res.json({result, error: err})
    })
});

module.exports = router;