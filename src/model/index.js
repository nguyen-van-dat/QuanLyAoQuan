const fs = require('fs').promises;
const path = require('path');


async function writeToJsonFile(newData) {
    const filePath = path.join(__dirname, 'database.json'); 
    
    try {
        let list = [];

        try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            list = JSON.parse(fileContent); 
        } catch (readError) {
            list = [];
        }

        list.push(newData);

        await fs.writeFile(filePath, JSON.stringify(list, null, 2), 'utf-8');
        
        console.log('Lưu dữ liệu thành công vào database.json');
        return true; 
        
    } catch (error) {  
         console.error('Lỗi hệ thống khi ghi file:', error);
         return false; 
    }
}

module.exports = {writeToJsonFile,};