var express = require('express');
var router = express.Router();
var model = require('../models/user-model');

router.get('/:id', (req, res) => {
  const id = req.params.id;
  model.getUser(id, (err, result) => {
    if (err)
      return res.status(400).send('Błąd przy pobieraniu danych użytkownika');
    const user = {
      id: result[0].id,
      firstName: result[0].first_name,
      lastName: result[0].last_name,
      email: result[0].email,
      hairType: result[0].hair_type,
      nick: result[0].nick,
    };
    return res.json({ user, error: err });
  });
});

router.put('/update', (req, res) => {
  model.updateUser(req.body, (err, result) => {
    if (err) return res.status(400).send('Błąd przy edycji danych użytkownika');
    return res.json({ result, error: err });
  });
});

module.exports = router;
