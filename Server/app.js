const express = require('express');
const cors = require('cors');
const dbConfig = require('./config/dbConfig')
const app = express();
var corsOptions = {
    origin: "http://localhost:3000" // our client
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to server route /" });
});

//db
const db = require('./models');
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: false
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


require('./routes/login')(app);
require('./routes/user')(app);
require('./routes/post')(app);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});