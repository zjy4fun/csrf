const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const apiRouter = express.Router();

const corsOptions = {
    origin: 'http://localhost:5173', // 允许的来源
    credentials: true, // 允许携带 cookie
};


app.use(cors(corsOptions)); // Enable CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// 模拟的用户数据库
const users = {};

// 注册路由
apiRouter.post('/register', async (req, res) => {
    const { username, password } = req.body;
    // console.log('username:', username, ' password:', password);
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }
    if (users[username]) {
        return res.status(400).send('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = hashedPassword;
    res.status(201).send('User registered');
});

// 登录路由
apiRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = users[username];
    if (!hashedPassword) {
        return res.status(400).send('User not found');
    }
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
        return res.status(400).send('Incorrect password');
    }
    // 设置一个简单的用户 Cookie
    res.cookie('username', username, { httpOnly: true });
    res.send('Logged in');
});

// 受保护的路由
apiRouter.get('/dashboard', (req, res) => {
    const { username } = req.cookies;
    if (!username) {
        return res.status(401).send('Please log in');
    }
    res.send(`Welcome, ${username}`);
});

// 登出路由
apiRouter.post('/logout', (req, res) => {
    res.clearCookie('username');
    res.send('Logged out');
});

apiRouter.get('/transfer', (req, res) => {
    const { username } = req.cookies;
    if (!username) {
        return res.status(401).send('Please log in');
    }
    const { name, amount } = req.query;
    console.log(`给 ${name} 转账 ${amount} 元`);
    res.send(`给 ${name} 转账 ${amount} 元`);
})

app.use('/api', apiRouter);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/api ');
});
