const clothesRouter = require('./clothesRouter');
const userRouter = require('./userRouter');

function setupRoutes(app) {

    // Route user
    app.use('/users', userRouter);

    // Route clothes
    app.use('/clothes', clothesRouter);

    // Khi vào localhost:3000
    app.get('/', (req, res) => {
        res.redirect('/users/login');
    });

}

module.exports = setupRoutes;