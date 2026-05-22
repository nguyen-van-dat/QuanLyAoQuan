const fs = require('fs').promises;
const User = require('../model/user');
const path = require('path');
const { clothesJoiSchema_add } = require("../helpers/joi_helper");
const dataModel = require('../model/index');
const filePath = path.join(__dirname, '../model/database.json');

async function addClothesPage(req, res) {
    const sessionId = req.cookies.sessionId;

    let currentUser = null;

    if (sessionId) {
        currentUser = await User.findOne({
            sessions: sessionId
        });
    }

    res.render('clothes/add-clothes', {
        title: 'Thêm Đồ Vào Tủ',
        user: currentUser
    });
}

async function listClothes(req, res) {
    try {
        res.set('Cache-Control', 'no-store');
        const data = await fs.readFile(filePath, 'utf-8');
        const clothesList = JSON.parse(data);
        res.render('clothes/list-clothes', { title: 'Tủ Đồ Của Tôi', clothes: clothesList });
    } catch (error) {
        res.render('clothes/list-clothes', { title: 'Tủ Đồ Của Tôi', clothes: [] });
    }
}

async function addClothes(req, res) {
    const clothesData = req.body;

    if (
        !clothesData.name ||
        !clothesData.imageUrl ||
        !clothesData.type ||
        !clothesData.season
    ) {
        return res.status(400).json({
            success: false,
            message: 'Vui lòng nhập đầy đủ thông tin!'
        });
    }

    const { error } = clothesJoiSchema_add.validate(clothesData);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    const isSaved = await dataModel.writeToJsonFile(clothesData);

    if (isSaved) {
        res.status(200).json({
            success: true,
            message: 'Thêm đồ thành công!'
        });
    } else {
        res.status(500).json({
            success: false,
            message: 'Lỗi ghi file'
        });
    }
}

async function deleteClothes(req, res) {
    const index = req.params.id;
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        let clothesList = JSON.parse(data);

        clothesList.splice(index, 1);

        await fs.writeFile(filePath, JSON.stringify(clothesList, null, 2));
        res.redirect('/clothes/list');
    } catch (error) {
        console.error(error);
        res.send('Có lỗi xảy ra khi xóa món đồ!');
    }
}

module.exports = { addClothesPage, addClothes, listClothes, deleteClothes };