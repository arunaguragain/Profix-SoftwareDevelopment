const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
<<<<<<< HEAD
const sequelize = require('./Backend/database/db.js');  // Importing database
const userRoute = require('./Backend/routes/userRoutes.js');  // Importing user route
const reviewRoute = require('./Backend/routes/revieweRoutes.js'); // Fixed typo
const serviceProviderRoute = require('./Backend/routes/serviceproviderresgistrationRoutes.js'); // Fixed typo
const inquiryRoutes = require('./Backend/routes/inquiryRoutes.js');
const appointmentRoutes = require('./Backend/routes/appointmentRoutes.js')
=======
const sequelize = require('./Backend/database/db.js');  
const userRoute = require('./Backend/routes/userRoutes.js');  
const reviewRoute = require('./Backend/routes/revieweRoutes.js'); 
const serviceProviderRoute = require('./Backend/routes/serviceproviderresgistrationRoutes.js'); 
const appointmentRoutes = require ('./Backend/routes/appointmentRoutes.js');
>>>>>>> fa324d00bb8cd5f5f30c19d3b02073000339aa32

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
app.use('/serviceproviders', serviceProviderRoute);
app.use('/inquiries', inquiryRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/appointments', appointmentRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);  // Fixed missing backticks
});

// Sync database (uncomment this if you want to update tables on startup)
// sequelize.sync({ alter: true })  
//   .then(() => console.log("Database synchronized successfully."))
//   .catch(err => console.error("Error syncing database:", err));