//################################################################### PACKAGE IMPORTATIONS ####################################################################################
//const path = require('path');
const expressEdge = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');

//#################################################################### MODEL IMPORTATIONS #####################################################################################
const Game = require('../models/game');
const User = require('../models/user');
const Word = require('../models/word');


//########################################################################### APP #############################################################################################
const app = express();
mongoose.connect('mongodb://localhost/pictionary-app') //permet de créer une nouvelle database nommée pictionary-app mongodb pr l'appli sur le serveur qui run en local
const mongoStore = connectMongo(expressSession);

//######################################################################## MIDDLEWARES ########################################################################################
const verifyAuth = require('../middlewares/verifyAuth')

app.use(express.static('../public'));
app.use(expressEdge);
app.set('views', 'C:/Users/Mathieu42468/Desktop/pictionary app/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));
global.userLogged;
//on crée directement cette variable pour éviter d'avoir des erreurs "userLogged is not defined" quand on utilise le middleware; il ne prend une valeur que lorsqu'un user se connecte

//######################################################################### ROUTING ###########################################################################################
//home page route
app.get('/', async (req, res) => {
    //console.log(req.session);
    if (req.session.userId) {
        global.userLogged = await User.findById(req.session.userId);
        //console.log(userLogged);
        if (userLogged.admin === true) {
            res.render('homeAdmin', { userLogged });
        } else {
            res.render('homeSimple', { userLogged });
        }
    } else {
        res.render('home');
    };    
});

//login page route
app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/users/login', (req, res)=>{
    //console.log(req.body);
    const {email, password} = req.body;
    User.findOne({email: email}, (error, user)=>{
        if (user){
            bcrypt.compare(password, user.password, (error, identical)=>{
                //console.log(password);
                //console.log(user.password); //supprimer ces 2 lignes
                if (identical) {
                    //store user session
                    req.session.userId = user._id;
                    //on vérifie APRES si le user est un admin ou non... CAR ON NE PEUT PAS PASSER D'OBJET AVEC UN REDIRECT
                    res.redirect('/');
                } else {
                    res.redirect('/login');
                };
            });
        } else {
            res.redirect('/login');
        };
    });
})

//register page route
app.get('/register', (req, res) => {
    res.render('register');
});
app.post('/users/store', (req, res) => {
    var userData = req.body;
    User.create({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        gamesCreated: [],
        admin: false
    }, (error, user) => {
        if (error){
            res.redirect('/register');
        } else {
            res.redirect('/');
        };       
    })
})

//game creation page route
app.get('/games/new', verifyAuth, (req, res) => {
    res.render('createGameSimple', { userLogged })
})
app.post('/games/store', (req, res) => {
    var gameParams = req.body
    Game.create({
        lobbyName: gameParams.lobbyName,
        roundNb: gameParams.roundNb,
        maxNbParticipants: gameParams.maxNbParticipants,
        wordsUsed: [],
        participants: [userLogged.username], //UTILISER LES IDs QUI NE CHANGENT JAMAIS EN PRATIQUE PLUTOT
        creator: userLogged.username,
        createdAt: new Date(),
        finished: false
    }, (error, game) => {
        res.redirect('/')
    })
})

//join game page route
app.get('/games/join', verifyAuth, async (req, res) => {
    const games = await Game.find({
        $and: [{finished: false},
        {$where: "(this.participants).length < this.maxNbParticipants"}
    ]});
    /*
    const games = await Game.find({finished: false})
    const games = gamesUnfiltered.filter((value, index, arr) => {
        if (value.participants < value.maxNbParticipants) {
            return value;
        };
    });
    */
    //console.log(games);
    res.render('joinGameSimple', {
        games, userLogged
    });
})

//delete game page route
app.get('/games/delete', verifyAuth, async (req, res) => {
    const games = await Game.find({});
    //console.log(games);
    res.render('modifyGamesAdmin', {
        games, userLogged
    })
})

//word modification page route
app.get('/words/modify', verifyAuth, async (req, res) => {
    const words = await Word.find({});
    //console.log(words);
    res.render('modifyWordsAdmin', {
        words, userLogged
    })
})
app.post('/words/store', (req, res) => {
    var wordParams = req.body;
    Word.create({
        word: wordParams.word,
        description: wordParams.description, 
        author: userLogged.username,
        createdAt: new Date(),
    }, (error, word) => {
        res.redirect('/words/modify')
    })
})

//account page route
app.get('/myAccount', verifyAuth, (req, res) => {
    if (userLogged.admin) {
        res.render('userInfoModifAdmin', {
            userLogged
        })
    } else {
        res.render('userInfoSimple', {
            userLogged
        })
    };
})
app.get('/myAccount/history', verifyAuth, async (req, res) => {
    //si l'array game.participants ne comporte que des ids, il faudra rajouter une boucle for sur tous les ids de l'array permettant de créer un array de usernames en requêtant la base de données 
    const games = await Game.find({creator: userLogged.username}, (error, games) => {
        //console.log(games);
    });
    res.render('userInfoHistSimple', {
        userLogged, games
    });
})
app.get('/myAccount/modify', verifyAuth, (req, res) => {
    res.render('userInfoModifSimple', {
        userLogged
    })
})
app.post('/admin/modify', async (req, res) => {
    var newParams = req.body;
    bcrypt.hash(newParams.password, 15, function(error, encrypted){
        newParams.password = encrypted;
        User.findOneAndUpdate({_id: userLogged._id}, {$set: {
                email: newParams.email,
                username: newParams.username,
                password: newParams.password
            }
        }).then(async (err) => {
            //définir le nveau user logged juste après
            global.userLogged = await User.findById(userLogged._id);
        }).then(res.redirect('/'));
    })
})
app.post('/users/modify', async (req, res) => {
    var newParams = req.body;
    bcrypt.hash(newParams.password, 15, function(error, encrypted){
        newParams.password = encrypted;
        User.findOneAndUpdate({_id: userLogged._id}, {$set: {
                email: newParams.email,
                username: newParams.username,
                password: newParams.password
            }
        }).then(async (err) => {
            //définir le nveau user logged juste après     
            global.userLogged = await User.findById(userLogged._id);
            //console.log(userLogged)
        }).then(res.redirect('/'));
    })
     
})

//about page route
app.get('/about', async (req,res) => {
    //console.log(req.session);
    if (req.session.userId) {
        global.userLogged = await User.findById(req.session.userId);
        //console.log(userLogged);
        if (userLogged.admin === true) {
            res.render('aboutAdmin', { userLogged });
        } else {
            res.render('aboutSimple', { userLogged });
        }
    } else {
        res.render('about');
    }; 
})

//logout page route
app.get('/users/logout', verifyAuth, (req,res) => {
    //console.log(req.session);
    (req.session).destroy((err) => res.redirect('/'));
})


//######################################################################## APP DEPLOYEMENT #####################################################################################
app.listen(3000, ()=>{
    console.log("App listening on port 3000!")
});