// setup for express 
const express = require('express');
const app = express();
/* Body parsers and storage */
const bodyparser = require('body-parser');
const multer = require('multer');

/* Cookie Session */
const cookieSession = require('cookie-session')
const passport = require('passport')

/* getting the local authentication type */
const LocalStrategy = require('passport-local').Strategy

/* Start cookie session and append passport */
app.use(cookieSession({
  name: 'mysession',
  keys: ['randomkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours 
}))

app.use(passport.initialize());
app.use(passport.session());

/* Upload handlers */

const pfpStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/profile')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const projectStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/projects')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const pfpUpload = multer({ storage: pfpStorage });
const projectUpload = multer({ storage: projectStorage });


const { Client } = require('pg');

const port = 4000
/* prevent CORS errors */
var cors = require('cors');
const { response } = require('express');
app.use(cors());

/* handler for the req / res body */
app.use(bodyparser.json())


/* setup db connection */
const connectionString = "postgresql://web:web@localhost:5432/sharefolio";
const client = new Client({ connectionString })
client.connect();


/* API */
/*****************/
/* GET REQUESTS  */
/*****************/

/* List of all users */
app.get('/users', (req, res) => {
  client.query("SELECT * FROM account").then((response) => { res.send(JSON.stringify(response.rows)) });
})

/* Get a specific user via username*/
app.get('/user/:user', (req, res) => {
  client.query(`SELECT * FROM account WHERE LOWER(account.username) = LOWER('${req.params.user}')`).then((response) => { console.log(response.rows); res.send(JSON.stringify(response.rows)) });
})

/* Get a sepcific user via id */
app.get('/user/id/:id', (req, res) => {
  client.query(`SELECT * FROM account WHERE id = '${req.params.id}'`).then((response) => { console.log(response.rows); res.send(JSON.stringify(response.rows)) });
})

/* Get all projects */
app.get('/projects', (req, res) => {
  client.query(`SELECT * from project`).then((response) => { res.send(JSON.stringify(response.rows)) });
})

/* Get a specific project */
app.get('/project/:name', (req, res) => {
  client.query(`SELECT project.*, enum_category.name AS Kategorie, account.name AS Ersteller, account.username AS Author FROM project, enum_category, account WHERE LOWER(TRIM(REPLACE(project.name, ' ', '-'))) = LOWER(TRIM(REPLACE('${req.params.name}', ' ', '-'))) AND project.kategorie_id = enum_category.id AND project.ersteller_id = account.id; `).then((response) => { console.log(response.rows); res.send(JSON.stringify(response.rows)) });
})

/* Get all projects tied to a specific user */
app.get('/user/:name/projects', (req, res) => {
  client.query(`SELECT project.*, enum_category.name AS Kategorie, account.name AS Ersteller FROM project, enum_category, account WHERE LOWER(account.username) = LOWER('${req.params.name}') AND project.kategorie_id = enum_category.id AND project.ersteller_id = account.id;`).then((response) => { console.log(response.rows); res.send(JSON.stringify(response.rows)) });
})

/* Get all available categories */
app.get('/categories', (req, res) => {
  client.query(`SELECT * from enum_category`).then((response) => { res.send(JSON.stringify(response.rows)) });
})

/*****************/
/* POST REQUESTS */
/*****************/

/* Create new user */
app.post('/createUser', pfpUpload.single("profilePic"), (req, res) => {
  //console.log(JSON.parse(req.body.userData).userName);
  const userData = JSON.parse(req.body.userData);
  client.query(`INSERT INTO account (vorname, name, email, password, username, jobtitel, ort, beschreibung, profilbild) VALUES ('${userData.firstName}','${userData.lastName}', '${userData.email}', '${userData.password}', '${userData.userName}', '${userData.job}', '${userData.location}', '${userData.descr}', '${userData.profilePic}')`).then((response) => { res.sendStatus(200) });
})


/* Create new project */
app.post('/createProject', projectUpload.array("pics"), (req, res) => {
  const projectData = JSON.parse(req.body.projectData);
  client.query(`INSERT INTO project (ersteller_id, titelbild, name, beschreibung, art, tools, kategorie_id, demolink, bild1, bild2) VALUES ('${projectData.creatorId}', '${projectData.headerPath}', '${projectData.title}', '${projectData.descr}', '${projectData.art}', '${projectData.tools}', '${projectData.category}', '${projectData.link}', '${projectData.pic1Path}', '${projectData.pic2Path}')`).then((response) => { res.sendStatus(200) });
})

/* Login */

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).send([user, "Cannot log in", info])
    }

    req.login(user, (err) => {
      client.query(`SELECT * from account WHERE username = '${user}'`).then((tempres) => {res.send(tempres.rows[0]) });
    })
  })(req, res, next)
})

app.get('/logout', (req, res) => {
  req.logout();
  console.log("logged out")
  res.send();
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  (username, password, done) => {
    client.query(`SELECT check_password('${username}', '${password}')`).then((res) => {
      console.log(res.rows);
      if (res.rows[0].check_password) {

        done(null, username)

      }
      else {
        done(null, false, { message: 'Incorrect username or password' })
      }
    })
  }
))

/*****************/
/*    Console    */
/*****************/
app.listen(port, () => {
  console.log(`Backend connection listening to http://localhost: ${port}`)
})
