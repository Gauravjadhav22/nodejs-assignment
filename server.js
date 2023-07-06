const express = require('express');
const cors = require('cors');
const app = express();
const multer = require('multer');
const Routes = require("./api")
const path = require('path');



app.use(cors());
app.use(express.json())




app.use('/api', Routes)

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
