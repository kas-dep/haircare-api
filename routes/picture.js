var express = require('express');
var router = express.Router();
var model = require('../models/picture-model');

router.post('/add', (req, res) => {
  model.addPicture(req.body, function (err, result) {
    if (err) return res.status(400).send('Błąd przy dodawaniu zdjęcia');
    return res.json({ result, error: err });
  });
});

router.get('/pictures/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  model.getPictures(user_id, (error, resultArr) => {
    if (error) return res.status(400).send('Błąd przy pobieraniu listy zdjęć.');
    if (resultArr) {
      const pictures = resultArr.map((item) => ({
        id: item.id,
        date: item.picture_date,
        note: item.note,
      }));
      return res.json({ pictures, error });
    }
    return res.json({ pictures: [], error });
  });
});

router.get('/metamorphosis/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const newestPicture = await model.getNewestPicture(user_id);
    const oldestPicture = await model.getOldestPicture(user_id);

    if (oldestPicture || newestPicture) {
      return res.json({ images: [oldestPicture, newestPicture], error: null });
    }
    return res.json({ images: [], error: null });
  } catch (error) {
    return res.status(400).send('Błąd przy pobieraniu zdjęć');
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  model.getPicture(id, (err, result) => {
    if (err) return res.status(400).send(`Błąd przy pobieraniu zdjęcia o id: ${id}`);
    const image = result && result.length && Buffer.from(result[0].content).toString();
    return res.json({ image, error: err });
  });
});

router.put('/update', (req, res) => {
  model.updatePicture(req.body, (err, result) => {
    if (err) return res.status(400).send('Błąd przy edycji zdjęcia');
    return res.json({ result, error: err });
  });
});

router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  model.deletePicture(id, (err, result) => {
    if (err) return res.status(400).send('Błąd przy usuwaniu zdjęcia');
    return res.json({ result, error: err });
  });
});

module.exports = router;
