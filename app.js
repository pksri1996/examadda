  const express = require('express');
  const app = express();
  const path = require('path');
  const methodOverride = require('method-override');
  const mongoose = require('mongoose');
  const examRoutes = require('./routes/examRoute');
  const orgRoutes = require('./routes/orgRoute');
  const multer = require('multer');
  const upload = multer({dest: 'upload/'});


  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.urlencoded({ extended: true }));
  app.use(methodOverride('_method'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));



  mongoose.connect('mongodb://127.0.0.1:27017/exam')
      .then(() => console.log('Mongoose connected'))
      .catch(err => console.log('Connection error:', err));


  app.use('/',examRoutes);
  app.use('/',orgRoutes);

  const port = 80;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });