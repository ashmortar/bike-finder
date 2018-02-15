import {apiCall} from './../assets/js/app.js';
const moment = require("moment");

$(document).ready(function() {

  $('#form').submit(function(event) {
    event.preventDefault();
    let location = $('#location').val();
    let proximity = parseInt($('#proximity').val());
    let color= $('#color').val();
    let newApiCall = apiCall(location, proximity, color);

    $('#results').empty();

    newApiCall.then(function(response) {
      let body = JSON.parse(response);
      for (var i = 0; i < body.bikes.length; i++) {
        let date = new moment();
        date.unix(body.bikes[i].date_stolen);
        let formatted = date.format("dddd MMMM Do, YYYY");
        if(body.bikes[i].thumb != null) {
          $('#results').append('<div class="list-item"><li><img src="' + body.bikes[i].thumb + '"><ul><li>' + body.bikes[i].title +'</li><li>'+ body.bikes[i].frame_colors +'</li><li>' + body.bikes[i].stolen_location + '</li><li>'+ formatted +'</li></ul></li></div>');
        } else {
            $('#results').append('<div class="list-item"><li><img src="./../assets/images/bike-icon.png"><ul><li>' + body.bikes[i].title +'</li><li>'+ body.bikes[i].frame_colors +'</li><li>' + body.bikes[i].stolen_location + '</li><li>'+ formatted +'</li></ul></li></div>');
        }
        console.log(body.bikes[i].title);
      }
    }, function(error) {
      console.log(error.message);
    });
  });
});
