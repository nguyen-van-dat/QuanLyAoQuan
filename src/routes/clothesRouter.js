const express = require('express');

const clothesRouter = express.Router();

const clothesController = require('../controllers/clothesController');


clothesRouter.get('/add',clothesController.addClothesPage);

clothesRouter.post('/add',clothesController.addClothes);

clothesRouter.get('/list',clothesController.listClothes);

clothesRouter.get('/delete/:id',clothesController.deleteClothes);

module.exports = clothesRouter;