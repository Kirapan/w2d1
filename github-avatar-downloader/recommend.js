var request = require('request');
var fs = require('fs');
require('dotenv').config();

var repoOwner = process.argv[2];
var repoName = process.argv[3];

function recommand5repo (repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + process.env.secretToken
      }
  };

  request(options, function(err, res, body) {
    var array = [];
    array = JSON.parse(body);
    cb(err, array);
    //console.log(array);

  });

}

recommand5repo (repoOwner, repoName, function (err, result){

  console.log('Errors:', err);
  var urlList = [];
  result.forEach(function (element) {
    urlList.push(element.starred_url.substring(0,element.starred_url.length - 15));
  });

  urlList.forEach(function (data) {
    var list = [];
    request(data, function(err,res,body) {
      console.log('body',body);
    });
  });

  //console.log(urlList);

});


// function starErs(arr) {
//   for(var i = 0; i < arr.length; i++) {
//     arr[i].starred_url
//   }
// }
