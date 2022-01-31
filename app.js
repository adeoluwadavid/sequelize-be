require('rootpath')();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const db = require('./config/database')
const app = express()

require('./users/user.model');
require('./users/user.job')
db.sync()
db.authenticate().then(() => console.log('Database Connected')).catch(err => console.log('Error: ' + err))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use('/', require('./users/user.controller'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})
const port = process.env.PORT || 8081
app.listen(port, ()=> console.log(`Server Listening on port ${ port}`))