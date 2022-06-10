const express = require('express');
const router = express.Router();
// const indicators = require('./tradingStats.js');
const axios = require('axios');

global.country = 'sweden';
indicator = `gdp`;


var fs = require('fs');


// ALTERNATIVE WAY TO WRITE APU DATA TO A JSON OR JS FILE
const TradeStats = { searchTs(indicator, country, clientKey, fs ){
              // return fetch(`https://brains.tradingeconomics.com/v2/search/${urlSearchAdd}${country}&pp=${50}&p=${0}&_=${1557934352427}&stance=${2}&c=${client_Key}`,
              return axios.get(`https://api.tradingeconomics.com/historical/country/${country}/indicator/${indicator}?c=${clientKey}`,
                { headers:
                    { Authorization: `Bearer ${clientKey}`,
                  }
              }).then( (res)=>{
                // return res.json();
                tresponse = res.json;

                fs.writeFile("tradingStats.js", JSON.stringify(response.data), function(err) {
                    if (err) {
                        console.log(err);
                    }
                });

              // }
            }).then( (jsonResponse) =>{
               return console.log(jsonResponse,'json response from TS-JS file');
            })

  }
}
// EXAMPLE WAY TO ADD SOCKET IN JS FILE
// const io = require('../app.js');
//
// function doChange(app, io){
//       io.on("connection" , (socket, req, res, country)=>{
//                 console.log('a user connected');
//                 var country = '';
//                 socket.on("countryChange", (msg)=>{
//                    global.mssg = JSON.stringify(msg);
//                     console.log('selected country:'+ mssg)
//                     country == mssg;
//                     socket.emit("acknowledged", mssg)
//                     return mssg;
//                 })
//
//                 console.log(global.country);
//             })
// }


// router.get('/', (req, res) => indicators);


// export default TradeStats;
// module.exports = router, { TradeStats, doChange };
module.exports = router, { TradeStats };






// HOW TO USE T-E NPM MODULE BELOW
//
// Get the categories available to use on search
// te.getSearch()
//   .then((data) => {
//     console.log("Search categories", "\n", data, "\n");
//   })
//   .catch((err) => console.log(err));
//===============================================================================================================
// Search for a term or keyword in a category
// te.getSearch(term = 'japan', category = 'markets')
//   .then((data) => {
//     console.log("Search by term and category", "\n", data, "\n");
//   })
//   .catch((err) => console.log(err));
//===============================================================================================================
// Get an indicators list by country/countries, you can pass group to get more specific data
// te.getIndicatorData((country = ["united states", "china"]))
//   .then((country) => {
//     console.log("List of indicators by country", "\n", country, "\n");
//   })
//   .catch((err) => console.log(err));
  //===============================================================================================================
// Get specific indicator for all countries
// te.getIndicatorData((indicator = "gdp"))
//   .then((indicator) => {
//     console.log("List of a specific indicator", "\n", indicator, "\n");
//   })
//   .catch((err) => console.log(err));
//===============================================================================================================
// Get a list of indicators by ticker
// te.getIndicatorData((ticker = "usurtot"))
//   .then((ticker) => {
//     console.log("List of indicators by ticker", "\n", ticker, "\n");
//   })
//   .catch((err) => console.log(err));
//===============================================================================================================
// To get a list of Historical data for specific country/countries and indicator, or you can specify a start date, or even start and end date (date format is yyyy-mm-dd).
// te.getHistoricalData(country = "united states", indicator = "gdp")
//     .then((result) => {
//       console.log("List of Historical by country and indicator","\n",result,"\n");
//     }).catch((err) => console.log(err));
/*
  te.getHistoricalData(country = "united states",indicator = "gdp", start_date = "2013-01-01", end_date = "2019-02-02")
  .then(data => {
    console.log("List of Historical by country, indicator and dates","\n",data,"\n");
  }).catch((err) => console.log(err));
*/
//===============================================================================================================
//You can specify a ticker, and a start date (date format is yyy-mm-dd).
// te.getHistoricalData(ticker = "usurtot", start_date = "2018-02-02")
//     .then(data => {
//       console.log("List of Historical by ticker","\n",data,"\n");
//     }).catch((err) => console.log(err));
//===============================================================================================================
// Get information about one country or between two countries with a specific type of trade
// getCmtCountryByCategory(country = 'Brazil', type = 'import', category = 'Swine, live')
//       .then((data) => {
//         console.log("Get information between two countries and a specific trade type", "\n", data, "\n");
//       })
//       .catch((err) => console.log(err));
