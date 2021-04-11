var express = require('express');
var cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var activitiesRouter = require('./routes/activities');
var pictureRouter = require('./routes/picture');
var authRouter = require('./routes/auth');
var courseOfActiomDictRouter = require('./routes/course-of-action-dict');
var productCategoryDict = require('./routes/product-category-dict');

var app = express();

app.use(express.json({limit: '50MB'}));
app.use(cors());

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/activities', activitiesRouter);
app.use('/picture', pictureRouter);
app.use('/auth', authRouter);
app.use('/coaDict', courseOfActiomDictRouter);
app.use('/pcDict', productCategoryDict);

app.listen(3000, () => {
  console.log('App is running');
});

module.exports = app;
