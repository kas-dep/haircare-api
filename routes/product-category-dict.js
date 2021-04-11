var express = require('express');
var router = express.Router();
const model = require('../models/product-category-dict-mode');

router.get('/', function(req, res) {
    return model.getProductCategoryDictionary(function( err, result) {
        res.json({result, error: err})
    })
});

module.exports = router;