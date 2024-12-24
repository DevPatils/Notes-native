const express = require('express');
const app = express();
const port = 3000;
const cors=require('cors');
const userRouter = require('./Routers/user');
const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require('./db');
app.use(cors())
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World');
})
app.use('/user',userRouter);

app.listen(port, async() => {

    await connectToDB();
    console.log(`Server is running on port ${port}`);
});