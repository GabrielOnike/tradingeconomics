// index.js
require('dotenv').config();
const express = require('express');
const app = module.exports = express();
const path = require('path');
const exphbs = require('express-handlebars');

//Port
const PORT = process.env.PORT || 3070;

//using server and socket io
const http = require('http');
const server = app.listen(PORT, () => console.log(`server started on port ${PORT}`));
const { Server } = require('socket.io');
const io = new Server(server);
const axios = require('axios');
// timestamp control
const moment = require('moment');

// API data
var fs = require('fs');
clientKey = process.env.CLIENTKEY;
global.country = '';
const indicator = 'gdp';

//Body Parser midddleware | enable read Url encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//Handlebars middleware
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main'}));
app.set('view engine','handlebars');

// Format Timestamp using Moment
var hbs = exphbs.create({});
hbs.handlebars.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).fromNow();
});

//MAIN HOME PAGE ROUTE - direct entry to handlebars in views folder
app.get('/',(req, res) => {
      let indData;
      url=`https://api.tradingeconomics.com/historical/country/${country}/indicator/${indicator}?c=${clientKey}`;

      axios.get(url,
                { headers:
                    { Authorization: `Bearer ${clientKey}`,
                  }
      }).then(response =>{

                indData = [];
                // save Data output from Axios into indData array
                response.data.map((indicator) => {
                        indData.push({ indicator});
                        return indData;
                      })
                // render 0-30 of Data output
                res.render('index',{
                    indData: indData.reverse().slice(1,31)
                })
      })
        .catch(function (err){
            console.log(err);
            // Prints out specific Error: if something went wrong"
        });


});

//SECONDARY HOMEPAGE ROUTE - connect to static  Public Folder
app.use(express.static( path.join(__dirname,'public')));

// Socket
app.listen((req,res)=>{
        io.on("connection" , (socket, req, res, country)=>{

            socket.on("countryChange", (msg)=>{
                //change country variable to selected Country
                global.country = msg;
                //redirect/refresh page on home to reflect new data
                var destination = '/';
                socket.emit('redirect',destination);

                return msg;
          })
      })
  })


// const tradingStats = require('./tradingStats');
require('./Util/tradingStats');
// tstats API
app.use('/util/tradingStats',require('./Util/tradingStats'));

// LOG: Inform dev that server is connected
const logger = (req,res, next)=>{
  console.log('Hello');
  next();
};

app.use(logger);
