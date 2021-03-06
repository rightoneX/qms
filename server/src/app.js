const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

require('../server/router')(app);

app.get('*', (req, res) => res.status(200).send({
  message: 'QMS API IS UP... !!!',
}));

app.listen(process.env.PORT || 8091)