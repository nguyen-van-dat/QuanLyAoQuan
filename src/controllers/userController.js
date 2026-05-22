const bcrypt = require('bcrypt');
const crypto = require('crypto');

const User = require('../model/user');

const { createUserSchema, loginSchema } = require('../helpers/joi_helper');

async function list(req, res) {

}

async function detail(req, res, next) {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            const error = new Error('User không tồn tại');

            error.statusCode = 404;

            throw error;
        }

        return res.render('profile', { user });

    } catch (err) {

        next(err);
    }
}

async function create(req, res) {

}

async function update(req, res) {

}

async function remove(req, res) {

}

function showRegister(req, res) {

    return res.render('sites/register', {
        error: null,
        formData: {}
    });
}

async function register(req, res) {

    try {

        const { error, value } = createUserSchema.validate(req.body);

        if (error) {

            return res.render('sites/register', {
                error: error.details[0].message,
                formData: req.body
            });
        }

        const existingUser = await User.findOne({
            name: value.name
        });

        if (existingUser) {

            return res.render('sites/register', {
                error: 'Tên người dùng đã tồn tại',
                formData: req.body
            });
        }

        const existingEmail = await User.findOne({
            email: value.email
        });

        if (existingEmail) {

            return res.render('sites/register', {
                error: 'Email đã tồn tại',
                formData: req.body
            });
        }

        const hashedPassword = await bcrypt.hash(
            value.password,
            10
        );

        await User.create({
            name: value.name,
            email: value.email,
            password: hashedPassword,
        });

        return res.redirect('/users/login?success=true');

    } catch (err) {

        console.error('Lỗi đăng ký:', err);

        return res.render('sites/register', {
            error: 'Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại.',
            formData: req.body
        });
    }
}

async function showLogin(req, res) {

    const success =
        req.query.success === 'true'
            ? 'Đăng ký thành công! Vui lòng đăng nhập.'
            : null;

    return res.render('sites/login', {
        error: null,
        success: success,
        formData: {}
    });
}

async function login(req, res) {

    try {

        const { error, value } = loginSchema.validate(req.body);

        if (error) {

            return res.render('sites/login', {
                error: error.details[0].message,
                success: null,
                formData: req.body
            });
        }

        const userData = await User.findOne({
            name: value.name
        });

        if (!userData) {

            return res.render('sites/login', {
                error: 'Sai tên người dùng hoặc mật khẩu',
                success: null,
                formData: req.body
            });
        }

        const isPasswordValid = await bcrypt.compare(
            value.password,
            userData.password
        );

        if (!isPasswordValid) {

            return res.render('sites/login', {
                error: 'Sai tên người dùng hoặc mật khẩu',
                success: null,
                formData: req.body
            });
        }

        const sessionId =
            crypto.randomBytes(16).toString('hex');

        await User.updateOne(
            {
                _id: userData._id
            },
            {
                $push: {
                    sessions: sessionId
                }
            }
        );

        res.cookie('sessionId', sessionId, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.redirect('/clothes/add');

    } catch (err) {

        console.error('Lỗi đăng nhập:', err);

        return res.render('sites/login', {
            error: 'Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.',
            success: null,
            formData: req.body
        });
    }
}

async function logout(req, res) {

    try {

        const sessionId = req.cookies.sessionId;

        if (sessionId) {

            await User.updateOne(
                {
                    sessions: sessionId
                },
                {
                    $pull: {
                        sessions: sessionId
                    }
                }
            );
        }

        res.clearCookie('sessionId');

        return res.redirect('/users/login');

    } catch (err) {

        console.error('Lỗi logout:', err);

        return res.redirect('/');
    }
}

module.exports = {
    list,
    detail,
    create,
    update,
    remove,
    showRegister,
    register,
    showLogin,
    login,
    logout,
};