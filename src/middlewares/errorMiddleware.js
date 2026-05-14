// Middleware xử lý 404
function notFound(req, res, next) {

    return res.status(404).render('error', {
        statusCode: 404,
        message: 'Không tìm thấy trang',
    });
}

// Middleware xử lý lỗi chung
function errorHandler(err, req, res, next) {

    console.error(err.message);

    return res.status(500).render('error', {
        statusCode: 500,
        message: err.message,
    });
}

module.exports = {
    notFound,
    errorHandler,
};