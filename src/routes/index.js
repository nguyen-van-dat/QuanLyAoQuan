const clothesRouter = require('./clothesRouter');
const userRouter = require('./userRouter');

function setupRoutes(app) {

    app.use('/users', userRouter);

    app.use('/clothes', clothesRouter);

    app.get('/', (req, res) => {
        res.redirect('/users/login');
    });

}

module.exports = setupRoutes;