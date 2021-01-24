const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());

//cors
const corsOptions = {
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

mongoose.Promise = global.Promise;

//Mongo (connect)
mongoose.connect('mongodb://localhost/VeryCoolDB', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log("Connection established. Why would you want to be happy when you can be sad?");
}).catch(err => {
  console.log('Connection error you fucking twat. You broke it again. Congrats, looser.');
});

require('./routes/articles.route.js')(app);
require('./routes/comments.route.js')(app);
require('./routes/generic.route.js')(app);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));