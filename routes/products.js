var express = require('express');
var router = express.Router();
var model = require('../models/product-model');

router.get('/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  model.getProducts(user_id, (err, resultArr) => {
    if (err) return res.status(400).send('Błąd przy pobieraniu produktów');
    if (resultArr) {
      const products = resultArr.map((item) => ({
        id: item.id,
        availability: item.availability,
        name: item.name,
        rate: item.rate,
        courseOfActionId: item.course_of_action_id,
        categoryId: item.category_id,
        userId: item.user_id,
      }));
     return res.json({ products, err });
    }

   return res.json({ products: [], error: err });
  });
});

router.post('/add', (req, res) => {
  model.addProduct(req.body, (err, result) => {
    if (err) return res.status(400).send('Błąd przy dodawaniu produktu');
   return res.json({ result, error: err });
  });
});

router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  model.deleteProduct(id, (err, result) => {
    if (err && err.code.includes('ER_ROW_IS_REFERENCED')) {
      return res
        .status(406)
        .send(
          'Nie można usunąć wybranego produktu, ponieważ są na nim aktywności'
        );
    } else if(err){
        return res.status(400).send('Błąd przy usuwaniu produktu')
    }
   return res.json({ result, error: err });
  });
});

router.put('/update', (req, res) => {
  model.updateProduct(req.body, (err, result) => {
      if(err) return res.status(400).send('Błąd przy edycji produktu');
   return res.json({ result, error: err });
  });
});
module.exports = router;
