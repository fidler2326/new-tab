// Show form for first time user
firstTimeUser();

// Get image from 500px
function imageOfTheDay() {
	_500px.init({
    sdk_key: 'cc93dacd73abf08e14260dc56d76e0f7feab2b3f'
  });

  _500px.api('/users/19193901/galleries/24034947/items', { image_size: 2048 }, function (response) {
      console.log(response);

			var images = response.data.photos;
			var randomBgImage = images[Math.floor(Math.random()*images.length)];
			var bgImage = randomBgImage.image_url;

      $('.wrapper').css('background-image', 'url(' + bgImage + ')');
			localStorage.setItem("bg-image", bgImage);
  });
}

// On new day get new background image and reset cookie
function newDay() {
	// Set cookie on new day to expire at midnight
	var currentDate = new Date();
	expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1, 0, 0, 0);
	$.cookie("newday", "5", {expires: expirationDate});
	imageOfTheDay();
}

if ($.cookie('newday')) {
	// Set background image
	$('.wrapper').css('background-image', 'url(' + localStorage.getItem('bg-image') + ')');
} else {
	// Reset day
	newDay();
}

$(document).ready(function(){

	// Get weather forecast for current location
	navigator.geolocation.getCurrentPosition(function(position) {

		$.get('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast ' +
				'where woeid in (SELECT woeid FROM geo.places WHERE text="('+position.coords.latitude + ',' + position.coords.longitude+')") and u="c"&format=json', function (data) {
			console.log(data);

			var html = '<span class="temp">' + data.query.results.channel.item.condition.temp + data.query.results.channel.units.temperature + '</span>';
			html += '<span class="text">';
			html += '<h2>' + data.query.results.channel.location.city + ', ' + data.query.results.channel.location.country + '</h2>';
			html += '<h3>' + data.query.results.channel.item.forecast[0].text + '</h3>';
			html += '<h4>' + 'Sunrise: ' + data.query.results.channel.astronomy.sunrise + ' / Sunset: ' + data.query.results.channel.astronomy.sunset + '</h4>';
			html += '</span>';

			$('.weather').addClass('active');

			$('.weather .result').append(html);

		});
	});

});
