var express = require('express');
var router = express.Router();
var authModel = require('../models/auth-model');
var bcrypt = require('bcrypt');
var User = require('../models/auth-model');
var jwt = require('jsonwebtoken');

const { loginValidation, registerValidation } = require('../validation/validation');

router.post('/register', async (req, res) => {
    const { body } = req;
    const { error } = registerValidation(body);
    if(error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne(body.email);
    if(emailExist) return res.status(400).send('Podany email istnieje już w systemie');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const userToSave = {
        ...body,
        password: hashedPassword,
    };
    authModel.register(userToSave, (err, result) => {
        if(err) return res.status(400).send("Błąd przy rejestracji użytkownika");
        return res.json({result, error: err})
    })
});

router.post('/login', async (req, res) => {
    const { body } = req;
    const { error } = loginValidation(body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne(body.email);
    const userId = user && user.id;
    const userNick = user && user.nick;
    
    if(!user) return res.status(400).send({
        result:{
            errorCode: 'AUTH-01',
            errorDesc: 'Podany adres email nie istnieje w systemie'
        }
    });

    const validPassword = await bcrypt.compare(body.password, user.password);
    if(!validPassword) return res.status(400).send({
        result:{
            errorCode: 'AUTH-02',
            errorDesc: 'Nieprawidłowe hasło'
        }
    });
    const token = jwt.sign({id: userId}, process.env.TOKEN_SECRET);
    res.header('auth-token', token, userId, userNick).send({
        userId,
        userNick,
        token,
        result: {
            errorCode: '0',
            errorDesc: 'OK'
        }
    });
});

module.exports = router;