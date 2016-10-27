// Show form for first time user
firstTimeUser();

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

function newDay() {
	// Set cookie on new day to expire at midnight
	var currentDate = new Date();
	expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1, 0, 0, 0);
	$.cookie("newday", "5", {expires: expirationDate});
	imageOfTheDay();
}

if ($.cookie('newday')) {
	// Show saved joke of the day
	$('#dictionary .entry').html($("<h3 class='title'>" + localStorage.getItem('jokeTitle') + "</h3>" + "<div class='answer'>" + localStorage.getItem('jokeAnswer') + "</div>"));
	$('.wrapper').css('background-image', 'url(' + localStorage.getItem('bg-image') + ')');
	// Show / hide tabs
	switchClass();
	switchCheck();
	switchUpdate();
} else {
	// Set new cookie and update joke of the day
	newDay();
}

function switchClass() {
	$('#switch-logo').attr("class", localStorage.getItem("class-logo"));
	$('#switch-links').attr("class", localStorage.getItem("class-links"));
	// $('#switch-weather').attr("class", localStorage.getItem("class-weather"));
}

function switchCheck() {
	if ($('#switch-logo').hasClass('on')) {
		$('.logo').css('display','block');
	} else {
		$('.logo').css('display','none');
	}
	if ($('#switch-links').hasClass('on')) {
		$('.links-menu').css('display','block');
	} else {
		$('.links-menu').css('display','none');
	}
	// if ($('#switch-weather').hasClass('on')) {
	// 	$('.weather-container').css('display','block');
	// } else{
	// 	$('.weather-container').css('display','none');
	// }
}

function switchUpdate() {
	// TODO: Think of a better way to do this
	$('#switch-logo').click(function() {
	  $(this).toggleClass('on');
	  localStorage.setItem("class-logo", $('#switch-logo').attr('class'));
	  switchCheck();
	});

	$('#switch-links').click(function() {
	  $(this).toggleClass('on');
	  localStorage.setItem("class-links", $('#switch-links').attr('class'));
	  switchCheck();
	});

	// $('#switch-weather').click(function() {
	//   $(this).toggleClass('on');
	//   localStorage.setItem("class-weather", $('#switch-weather').attr('class'));
	//   switchCheck();
	// });
}

// Weather
// function loadWeather(location, woeid) {
// 	$('.spinner').show();
//   $.simpleWeather({
// 		location: '(' + location + ',' + woeid + ')',
//     woeid: '',
//     unit: 'c',
//     success: function(weather) {
//     	$('.spinner').fadeOut('fast');
//     	html = '<div class="weather-inner">'
//     	html +=  '<div class="left"><h2 class="weather-icon"><i class="icon-'+weather.code+'"></i></h2></div>'
//       html += '<div class="right"><h2> '+weather.city+', '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
//       html += '<h3>' + weather.text + '</h3>';
//       html += '<span class="sunrise">Sunrise: '+weather.sunrise+' -</span>';
//       html += '<span class="sunset">&nbsp;Sunset: '+weather.sunset+'</span></div>';
//       html += '</div>';
//       $("#weather").html(html);
//       $('#weather').addClass('active');
//     },
//     error: function(error) {
//     	$('.spinner').hide();
//       $("#weather").html('<p>'+error+'</p>');
//     }
//   });
// }

$(document).ready(function(){

	// Set default value
	if (localStorage.getItem("class-logo") === null) {
		localStorage.setItem("class-logo", 'switch on');
	}
	if (localStorage.getItem("class-links") === null) {
		localStorage.setItem("class-links", 'switch on');
	}
	// if (localStorage.getItem("class-weather") === null) {
	// 	localStorage.setItem("class-weather", 'switch on');
	// }

	// Bookmark menu
	$('.bookmark-menu-trigger').mouseover(function(){
		$('.btn-tab-bookmark').addClass('active');
		$('.bookmark-menu').addClass('active');
	});

	$('.btn-tab-bookmark').click(function(){
		$(this).toggleClass('active')
		$('.bookmark-menu').toggleClass('active');
		return false;
	});

	$('.page-wrapper').click(function(){
		$('.bookmark-menu, .btn-tab-bookmark').removeClass('active');
	});

	function showHideMenu() {
		$('.links-menu').css('transition', 'none');
		var menuHeight = $('.links-menu ul').height() + 30;
		if(localStorage.getItem("menuClass") === 'menu-hide') {
			$('.links-menu ul').attr('class', 'menu-hide');
			$('.links-menu').css('bottom', - + menuHeight);
			$('.showhidemenu').text('+');
		} else if(localStorage.getItem("menuClass") === 'menu-show') {
			$('.links-menu ul').attr('class', 'menu-show');
			$('.links-menu').css('bottom', '0');
			$('.showhidemenu').text('-');
		}
	}

	function updateMenuClass() {
		var menuClass = $('.links-menu ul').attr('class');
		localStorage.setItem('menuClass', menuClass);

		console.log(menuClass);
	}

  $('.showhidemenu').click(function(){
  	$('.links-menu').css('transition', '0.5s');
  	// Menu height + the 20 for padding top and bottom of the menu
  	var menuHeight = $('.links-menu ul').height() + 30;
  	if($('.links-menu ul').hasClass('menu-show')) {
  		$('.links-menu ul').attr('class', 'menu-hide');
  		$('.links-menu').css('bottom', - + menuHeight);
  		$('.showhidemenu').text('+');
  		// Save setting
  	} else if($('.links-menu ul').hasClass('menu-hide')) {
  		$('.links-menu ul').attr('class', 'menu-show');
  		$('.links-menu').css('bottom', '0');
  		$('.showhidemenu').text('-');
  		// Save setting
  	}
  	updateMenuClass();
  	return false;
  });

	if (localStorage.getItem("menuClass") === null) {
		localStorage.setItem('menuClass', 'menu-show');
	}

  // Set menu state on page load
  $('.links-menu ul').attr("class", localStorage.getItem("menuClass"));

  showHideMenu();
});

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
