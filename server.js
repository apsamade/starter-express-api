const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require('path')

require('dotenv').config()

const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')
const errController = require('./controller/middleware/error404')

const PORT = process.env.PORT;
const URI = process.env.URI;

const app = express()
const csp = {
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://js.stripe.com/v3/", "https://www.googletagmanager.com/", "https://www.googleadservices.com/", "https://googleads.g.doubleclick.net/"],
        frameSrc: ["'self'", "https://js.stripe.com", "https://www.google.com", "https://td.doubleclick.net/"],
        connectSrc: ["'self'", "https://region1.google-analytics.com/", "https://pagead2.googlesyndication.com/"],
        imgSrc: ["'self'", "https://i.ibb.co/", "https://www.google.com/", "https://www.google.fr/", "https://googleads.g.doubleclick.net/"], // Add "https://i.ibb.co/" to allow loading images from this domain
        // Add other necessary directives as per your application's requirements
    },
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

app.set('view engine', 'ejs')

app.use(cors())
app.use(helmet.contentSecurityPolicy(csp))

app.use(express.raw({ type: 'application/json' }));
app.use(cookieParser())

app.use(session({
    secret: "jeveuxpasmourir",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

app.use(express.static(path.dirname('public')))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(fileUpload())

app.use(userRoutes)
app.use(adminRoutes)
app.use(errController.get404)

//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})