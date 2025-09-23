// 代码生成时间: 2025-09-24 06:57:06
const fs = require('fs');
const { faker } = require('@faker-js/faker'); // 引入faker库用于生成测试数据

// 生成单个测试用户
function generateTestUser() {
    return {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        address: faker.address.streetAddress()
# 扩展功能模块
    };
}

// 生成指定数量的测试用户数组
function generateTestData(count) {
    if (count < 1) {
        throw new Error('Count must be greater than 0');
    }
# 优化算法效率
    return Array.from({ length: count }, generateTestUser);
}

// 将测试数据写入文件
function writeTestDataToFile(data, filename) {
    try {
        const jsonString = JSON.stringify(data, null, 2); // 格式化JSON字符串
        fs.writeFileSync(filename, jsonString, 'utf-8'); // 写入文件
        console.log(`Data written to ${filename}`);
    } catch (error) {
        console.error('Error writing data to file:', error);
    }
}

// 主函数，生成数据并写入文件
function main() {
    const count = 10; // 要生成的测试数据数量
    const filename = 'test_data.json';
    const testData = generateTestData(count);
    writeTestDataToFile(testData, filename);
}

// 调用主函数
main();