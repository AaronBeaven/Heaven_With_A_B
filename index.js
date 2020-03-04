const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const UserSchema = require('./models/signup');
const getUsers = require('./lib/getusers')

const app = express();


require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@gangodb-ljujb.mongodb.net/userdb?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.engine('.hbs', hbs({ //Set the view engine to handlebars
    defaultLayout: 'layout', //Set the layout file as layout.hbs
    extname: '.hbs' //Set the extension name to .hbs

}));
app.set('view engine', '.hbs'); //Tell express to use this engine]

app.get('/', (req, res) => {
    res.render('index')
})



app.get('/Home', (req, res) => {
    res.render('Home')
})
app.post('/Home', (req, res) => {
    res.render('Home')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})
app.post('/contact', (req, res) => {
    res.render('contact')
})
app.get('/cv', (req, res) => {
    res.render('cv')
})
app.post('/cv', (req, res) => {
    res.render('cv')
})

app.use(express.static('public/images'))

app.post('/', async (req, res) => {
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password;

    let docs = await getUsers.email(email)
    let docs1 = await getUsers.name(name)

    console.log(docs.length);
    console.log('--------');
    if (docs.length> 0){
        console.log("hello");
        res.render('index',{err: "A user with that email already exists"})
        
    }

    
    if (docs1.length> 0){
        
        res.render('index',{err: "A user with that name already exists"})
        return;
    } 


    const users = new UserSchema({
        name: name,
        email: email,
        password: password,
    })

    users.save()
    res.render('Home')
});

app.listen(3001, () => {
    console.log('server listening on port 3001')

})