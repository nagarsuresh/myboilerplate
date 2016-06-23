var express = require('express');
var app = express();
var server = app.listen(3013);

var staticfiles = "./dist/static";
console.log(staticfiles);
app.use(express.static(staticfiles));

console.log("Server home directory -> " + __dirname);

app.get('/service/ajax1', function (req, res) {
    res.send('this is response from Ajax call!');
});




// Routes.
// app.use(require('./routes')(app));


