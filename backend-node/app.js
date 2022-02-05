var createError = require('http-errors');
const express = require('express');
var path = require('path');
// var db = require('mongoose');
// db.connect("mongodb+srv://root:COMP3322@musicstore.q83qo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true,
// useUnifiedTopology: true}, err => {
//   if (err)
//     console.log("MongoDB connection error " + err);
//   else
//     console.log("Connected to MongoDB");
// });

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var musicRouter = require('./routes/music');
// var cartRouter = require('./routes/cart');

var app = express();
var session = require('express-session');

app.use(session({secret:'ICHACK22'}));
app.use(express.urlencoded({extended:false}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/music', musicRouter);
// app.use('/cart', cartRouter);

const port = process.env.PORT||3001;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`)
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;