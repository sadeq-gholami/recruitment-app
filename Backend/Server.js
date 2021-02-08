const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser =  require('body-parser');

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_ATLAS_URI;
mongoose.set('useFindAndModify', false);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
    ).catch(err => (console.log(err)));

app.use(bodyParser.json());
app.use(cors());
const reqHandlerLoader = require('./view');
reqHandlerLoader.loadRequestHandlers(app);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});