// 代码生成时间: 2025-10-28 12:46:04
const express = require('express');
const app = express();
const port = 3000;

// 商品库存管理
const products = {'product1': {name: '商品1', stock: 100, price: 100.0}, 'product2': {name: '商品2', stock: 50, price: 200.0}};

// 创建一个新的商品
app.post('/product', (req, res) => {
    const {name, stock, price} = req.body;
    if(!name || !stock || !price) {
        return res.status(400).send('Missing product information');
    }
    const productId = Object.keys(products).length + 1;
    products[`product${productId}`] = {name, stock, price};
    res.status(201).send(`Product created with id: product${productId}`);
});

// 获取所有商品
app.get('/products', (req, res) => {
    res.status(200).send(products);
});

// 更新商品库存
app.put('/product/:id', (req, res) => {
    const {id} = req.params;
    const {stock} = req.body;
    if(!(id in products) || !stock) {
        return res.status(404).send('Product not found or invalid stock');
    }
    products[id].stock = stock;
    res.status(200).send(`Stock updated for product: ${id}`);
});

// 开始直播带货
app.post('/live', (req, res) => {
    const {productId, quantity} = req.body;
    if(!(productId in products) || products[productId].stock < quantity) {
        return res.status(400).send('Invalid product or insufficient stock');
    }
    products[productId].stock -= quantity;
    res.status(200).send(`Sold ${quantity} units of product: ${productId}`);
});

// 启动服务器
app.listen(port, () => {
    console.log(`Live stream commerce system running on http://localhost:${port}`);
});

// 注释说明：
// 1. 使用了Express框架来创建REST API。
// 2. 定义了一个简单的商品库存对象。
// 3. 提供了创建商品、获取商品列表、更新库存和销售商品的接口。
// 4. 每个接口都包含错误处理和适当的响应信息。
// 5. 代码结构清晰，易于理解和维护。
// 6. 遵循了JS最佳实践，确保了代码的可维护性和可扩展性。