App.controller("MainController", ['$scope', '$timeout', 'localStorageService', '$cookies', function($scope, $timeout, localStorageService, $cookies) {
// App.controller("MainController", function ($scope, $timeout, localStorageService, $cookies) {
  // Set background image
  $scope.background_image = localStorage.getItem("bg-image");

  // Set background image details
  $scope.image_details = JSON.parse(localStorage.getItem("image_details"));

  // Set weather info
  $scope.weather = JSON.parse(localStorage.getItem("weather"));

  // Set username
  $scope.username = localStorage.getItem("username") || null;

  // If no username show the new user form
  if (!$scope.username) $scope.new_user = true;

  // Save username
  $scope.createUser = function() {
    localStorage.setItem("username",$scope.new_username);
    $scope.username = localStorage.getItem("username");
    $scope.new_user = null;
  }

  // Set the time
  $scope.updateClock = function() {
    // Get the current time (and date)
    $scope.time = new Date();

    // Get hours
    $scope.current_hours = $scope.time.getHours();

    // Set the time of day message
    if ($scope.current_hours < 12) {
      $scope.time_of_day = "Good Morning, ";
    } else if ($scope.current_hours < 18) {
      $scope.time_of_day = "Good Afternoon, ";
    } else {
      $scope.time_of_day = "Good Evening, ";
    }
  }

  // Update the time every second
  $scope.updateClock();
  setInterval(function(){
    $timeout( function(){
      $scope.updateClock();
    });
  }, 1000)

  // Get image from 500px
  $scope.imageOfTheDay = function() {
  	_500px.init({
      sdk_key: 'cc93dacd73abf08e14260dc56d76e0f7feab2b3f'
    });

    _500px.api('/users/19193901/galleries/24034947/items', { image_size: 2048, rpp: 100, }, function (response) {
			var images = response.data.photos;
			var random_number = Math.floor(Math.random()*images.length);
			var randomBgImage = images[random_number];
			var bg_image = randomBgImage.image_url;
			var image_details = {
				"image_name": randomBgImage.name,
				"image_by": randomBgImage.user.fullname,
				"image_url": randomBgImage.url
			}

      // Update the background image and image details
      $scope.background_image = bg_image[0];
      $scope.image_details = image_details;

      // Save background image and image details to localstorage
			localStorage.setItem("bg-image", bg_image);
			localStorage.setItem("image_details", JSON.stringify(image_details));
    });
  }

  // On new day get new background image and reset cookie
  $scope.newDay = function() {
  	var currentDate = new Date();
  	var expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1, 0, 0, 0);
    $cookies.put("newday", "newday", {expires: expirationDate});
  	$scope.imageOfTheDay();
  }

  // Check if newday cookie exists
  if (!$cookies.get("newday")) $scope.newDay();

  // Update and save weather info
  $scope.updateWeather = function() {
  	// Get weather forecast for current location
  	navigator.geolocation.getCurrentPosition(function(position) {
  		$.get('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast ' +
				'where woeid in (SELECT woeid FROM geo.places WHERE text="('+position.coords.latitude + ',' + position.coords.longitude+')") and u="c"&format=json', function (data) {

  			// Save weather details to local storage
  			$scope.weather = {
  				"temp": data.query.results.channel.item.condition.temp,
  				"unit": data.query.results.channel.units.temperature,
  				"city": data.query.results.channel.location.city,
  				"country": data.query.results.channel.location.country,
  				"forecast": data.query.results.channel.item.forecast[0].text,
  				"sunrise": data.query.results.channel.astronomy.sunrise,
  				"sunset": data.query.results.channel.astronomy.sunset
  			}
  			localStorage.setItem("weather", JSON.stringify($scope.weather));
  		});
  	});

  	// Set cookie to expire after 1 hour
  	var expirationDate = new Date();
  	var minutes = 30;
  	expirationDate.setTime(expirationDate.getTime() + (minutes * 60 * 1000));
  	$cookies.put("weather", "weather", {expires: expirationDate});
  }

  // Check if weather cookie exists
  if (!$cookies.get("weather")) $scope.updateWeather();
}]);