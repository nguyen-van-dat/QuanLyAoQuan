const express = require('express');

const router = express.Router();

const siteController = require('../controllers/siteController');

router.get("/", (req, res) => {

    return res.redirect('/users/login');

});

router.get("/about", siteController.about);

module.exports = router;