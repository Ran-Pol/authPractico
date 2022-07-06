const express = require('express');
const engine_EjsMate = require('ejs-mate');
const app = express();
const path = require('path');

// Settings
app.set('views', path.join(_dirname, 'views'));
app.engine('ejs', engine_EjsMate);
app.set('view engine', 'ejs');
app.set('port', process.envPORT || 3000);


// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});