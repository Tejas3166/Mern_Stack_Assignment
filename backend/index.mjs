import fetch from 'node-fetch';
import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/InterviewSpecs', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
});

// Initialize Express app
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

// Fetch data from the external URL
async function fetchData() {
    try {
        const response = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Define Mongoose Schema and Model
const transaction = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
    image: { type: String },
    sold: { type: Boolean, default: false },
    dateOfSale: { type: Date }
});
const Transaction = mongoose.model('Transaction', transaction);

// Function to insert the data into MongoDB
async function getPosts() {
    const data = await fetchData();
    for (let i = 0; i < data.length; i++) {
        const product = new Transaction({
            id: data[i].id,
            title: data[i].title,
            price: data[i].price,
            description: data[i].description,
            category: data[i].category,
            image: data[i].image,
            sold: data[i].sold,
            dateOfSale: data[i].dateOfSale
        });
        try {
            const savedProduct = await product.save();
            console.log(savedProduct);
        } catch (err) {
            console.log(err);
        }
    }
}

// Insert the fetched data into the database
getPosts();

// Define routes
app.get('/products', async (req, res) => {
    const products = await Transaction.find();
    res.send(products);
});

// Task 2: Sales Report for a Specific Month
app.get('/salesMonth', async (req, res) => {
    const data = await fetchData();
    const map1 = new Map([
        ["January", "01"], ["February", "02"], ["March", "03"], ["April", "04"], ["May", "05"],
        ["June", "06"], ["July", "07"], ["August", "08"], ["September", "09"], ["October", "10"],
        ["November", "11"], ["December", "12"]
    ]);
    const search = req.query.keyword;
    let sales = 0, soldItems = 0, totalItems = 0;

    data.forEach(item => {
        const month = item.dateOfSale.substring(5, 7);
        if (month === map1.get(search)) {
            sales += item.price;
            totalItems += 1;
            if (item.sold) soldItems += 1;
        }
    });
    res.send(`The Total Sale in this month: ${sales}, The Total Number of Sales in this month: ${soldItems}, Total number of not sold items of selected month: ${totalItems - soldItems}`);
});

// Task 3: Bar Chart Report Based on Price Ranges
app.get('/barChart', async (req, res) => {
    const data = await fetchData();
    const map1 = new Map([
        ["January", "01"], ["February", "02"], ["March", "03"], ["April", "04"], ["May", "05"],
        ["June", "06"], ["July", "07"], ["August", "08"], ["September", "09"], ["October", "10"],
        ["November", "11"], ["December", "12"]
    ]);
    const search = req.query.keyword;
    const map2 = new Map([
        [100, 0], [200, 0], [300, 0], [400, 0], [500, 0], [600, 0], [700, 0], [800, 0], [900, 0], [901, 0]
    ]);

    data.forEach(item => {
        const month = item.dateOfSale.substring(5, 7);
        if (month === map1.get(search)) {
            if (item.price < 100) map2.set(100, map2.get(100) + 1);
            else if (item.price < 200) map2.set(200, map2.get(200) + 1);
            else if (item.price < 300) map2.set(300, map2.get(300) + 1);
            else if (item.price < 400) map2.set(400, map2.get(400) + 1);
            else if (item.price < 500) map2.set(500, map2.get(500) + 1);
            else if (item.price < 600) map2.set(600, map2.get(600) + 1);
            else if (item.price < 700) map2.set(700, map2.get(700) + 1);
            else if (item.price < 800) map2.set(800, map2.get(800) + 1);
            else if (item.price < 900) map2.set(900, map2.get(900) + 1);
            else map2.set(901, map2.get(901) + 1);
        }
    });

    res.setHeader('Content-Type', 'text/html');
    res.write(`<h2>Price range and the number of items in that range for the selected month</h2>`);
    map2.forEach((value, key) => {
        res.write(`< ${key} = ${value}<br/>`);
    });
});

// Task 4: Pie Chart Report Based on Product Categories
app.get('/pieChart', async (req, res) => {
    const data = await fetchData();
    const map1 = new Map([
        ["January", "01"], ["February", "02"], ["March", "03"], ["April", "04"], ["May", "05"],
        ["June", "06"], ["July", "07"], ["August", "08"], ["September", "09"], ["October", "10"],
        ["November", "11"], ["December", "12"]
    ]);
    const search = req.query.keyword;
    const map2 = new Map();

    data.forEach(item => {
        const month = item.dateOfSale.substring(5, 7);
        if (month === map1.get(search)) {
            map2.set(item.category, (map2.get(item.category) || 0) + 1);
        }
    });

    res.setHeader('Content-Type', 'text/html');
    res.write(`<h2>Unique categories and number of items from that category for the selected month</h2>`);
    map2.forEach((value, key) => {
        res.write(`${key} category: ${value}<br/>`);
    });
});

// Start the server
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}!`));
