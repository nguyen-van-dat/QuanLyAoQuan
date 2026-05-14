const express = require('express');

const clothesRouter = express.Router();

const clothesController = require('../controllers/clothesController');

const { requireAuth } = require('../middlewares/userMiddleware');

clothesRouter.get('/add',
    requireAuth,
    clothesController.addClothesPage
);

clothesRouter.post(
    '/add',
    requireAuth,
    clothesController.addClothes
);

clothesRouter.get(
    '/list',
    requireAuth,
    clothesController.listClothes
);

clothesRouter.get(
    '/delete/:id',
    requireAuth,
    clothesController.deleteClothes
);

module.exports = clothesRouter;