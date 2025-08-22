const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes.js');
const petRoutes = require("./routes/petRoutes.js");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRoutes);
app.use('/api/pets', petRoutes); 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
