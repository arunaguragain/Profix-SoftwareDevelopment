const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./Backend/database/db.js');  //importing database
const userRoute = require('./Backend/routes/userRoutes.js');  //importing user route
const reviewRoute = require('./Backend/routes/revieweRoutes.js')

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("Welcome to Profix API");
});

app.use('/users', userRoute);  
app.use('/reviews', reviewRoute);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);   
});

// sequelize.sync({ force: true })






