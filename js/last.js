// Show form for first time user
firstTimeUser();

// Get image from 500px
function imageOfTheDay() {
	_500px.init({
    sdk_key: 'cc93dacd73abf08e14260dc56d76e0f7feab2b3f'
  });

  _500px.api('/users/19193901/galleries/24034947/items', { image_size: 2048, rpp: 100 }, function (response) {
      console.log(response);

			var images = response.data.photos;
			var randomBgImage = images[Math.floor(Math.random()*images.length)];
			var bgImage = randomBgImage.image_url;

      $('.wrapper').css('background-image', 'url(' + bgImage + ')');
			localStorage.setItem("bg-image", bgImage);
			console.log(response);
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

	if ($.cookie('weather')) {
		setWether();
		$('.weather').css('transition','none');
	} else {
		getWeather();
	}

});

function getWeather() {

	// Get weather forecast for current location
	navigator.geolocation.getCurrentPosition(function(position) {
		$.get('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast ' +
				'where woeid in (SELECT woeid FROM geo.places WHERE text="('+position.coords.latitude + ',' + position.coords.longitude+')") and u="c"&format=json', function (data) {

			// Save weather details to local storage
			localStorage.setItem("temp", data.query.results.channel.item.condition.temp);
			localStorage.setItem("unit", data.query.results.channel.units.temperature);
			localStorage.setItem("city", data.query.results.channel.location.city);
			localStorage.setItem("country", data.query.results.channel.location.country);
			localStorage.setItem("forecast", data.query.results.channel.item.forecast[0].text);
			localStorage.setItem("sunrise", data.query.results.channel.astronomy.sunrise);
			localStorage.setItem("sunset", data.query.results.channel.astronomy.sunset);

			setWether();
		});
	});

	// Set cookie to expire after 1 hour
	var expirationDate = new Date();
	var minutes = 30;
	expirationDate.setTime(expirationDate.getTime() + (minutes * 60 * 1000));
	$.cookie("weather", "6", {expires: expirationDate});

}

function setWether() {
	var html = '<span class="temp">' + localStorage.getItem("temp") + localStorage.getItem("unit") + '</span>';
	html += '<span class="text">';
	html += '<h2>' + localStorage.getItem("city") + ', ' + localStorage.getItem("country") + '</h2>';
	html += '<h3>' + localStorage.getItem("forecast") + '</h3>';
	html += '<h4>' + 'Sunrise: ' + localStorage.getItem("sunrise") + ' / Sunset: ' + localStorage.getItem("sunset") + '</h4>';
	html += '</span>';

	$('.weather').addClass('active');

	$('.weather .result').append(html);
}
