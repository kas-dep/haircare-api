var express = require('express');
var router = express.Router();
var model = require('../models/activities-model');

router.post('/add', (req, res) => {
  model.addActivity(req.body, (err, result) => {
    if (err) return res.status(400).send('Błąd przy dodawaniu aktywności');
    return res.json({ result, error: err });
  });
});

router.get('/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  model.getActivities(user_id, (error, resultArr) => {
    if (error)
      return res.status(400).send('Błąd przy pobieraniu listy aktywności');
    if (resultArr) {
      const activities = resultArr.map((item) => ({
        id: item.id,
        courseOfActionId: item.course_of_action_id,
        productId: item.product_id,
        date: item.date,
        userId: item.user_id,
      }));
      return res.json({ activities, error });
    }
    return res.json({ activities: [], error: err });
  });
});

router.put('/update', (req, res) => {
  model.updateActivity(req.body, (err) => {
    if (err) return res.status(400).send('Błąd przy edycji aktywności');
    return res.json({ error: err });
  });
});

router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  model.deleteActivity(id, (err, result) => {
    if (err) return res.status(400).send('Błąd przy usuwaniu aktywności');
    return res.json({ result, error: err });
  });
});

module.exports = router;
