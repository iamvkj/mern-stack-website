const dotenv = require("dotenv");

const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

dotenv.config({ path: './config.env' });

// We Link The Conn Files To Make Our DB Easy.
require('./db/conn');

app.use(express.json());

// We Link The Authentication Files To Make Our Route Easy.
app.use(require('./router/auth'));

// 2: Step for Heroku
const PORT = process.env.PORT || 5000;

// 3. Step for Heroku
if(process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}


app.listen(PORT, () => {
    console.log(`Server is running at port number ${PORT}`);
});