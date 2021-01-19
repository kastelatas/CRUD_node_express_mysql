const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const cors = require("cors");
const multer = require('multer');
const userRouter = require("./routes/userRouter.js");
const homeRouter = require("./routes/homeRouter.js");
const authRouter = require("./routes/authRouter.js");
require('dotenv/config');

const app = express();

app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(cors())
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:false}))

app.use(express.static(__dirname));
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});
app.use(multer({storage:storageConfig}).array('file', 2 ));


app.use("/", homeRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);



app.use( (req, res, next) => {
    res.status(404).send({message: 'NOT Found'})
});

app.listen(5000)

