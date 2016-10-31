$(document).ready(function(){

  // Clock
  setInterval('updateClock()', 1000);
  updateClock();

  // Date
  $('#date').text(today);

  // Tabs
  $(function() {
    $('.btn-tab').click(function(){
      $('.content').hide();
      $('.content').removeClass('active');
      $('.btn-tab').removeClass('active');
      $(this).addClass('active');
      $('#div'+$(this).attr('target')).show();
      $('#div'+$(this).attr('target')).addClass('active');
      return false;
    });
  });

  // Apps link
  $('.apps').click(function() {
    chrome.tabs.create({url:'chrome://apps'});
  });

  // Save username
  $('#username, #edit-username').keyup(function() {
    localStorage.setItem("username", $(this).val());
  });

  // Display username on homepage
  $('.username').text(localStorage.getItem("username"));

  // Edit username
  $('#edit-username').val(localStorage.getItem("username"));

  // Reload page (Refresh localstorage data)
  $('.btn-save').click(function(){
    location.reload();
  });

  // Clear all localstorage
  $('.clear-data').click(function(){
    localStorage.clear();
    $.removeCookie('newday');
    $.removeCookie('horology');
    location.reload();
  });

  // Refresh joke of the day (Clear cookie)
  $('.refresh-joke').click(function(){
    $.removeCookie('newday');
    location.reload();
  });

});

function firstTimeUser() {
  if (localStorage.getItem("username") === null) {
    $('.new-user').show();
    $('.hello').hide();
  } else {
    $('.new-user').hide();
    $('.hello').show();
  }
  localStorage.getItem("notifications") === 'true'
}

var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

var date = new Date();
var day = date.getDate();
var monthIndex = date.getMonth();
var year = date.getFullYear();

var today = day + ' ' + monthNames[monthIndex] + ' ' + year;

console.log(today);

function updateClock() {
  var currentTime = new Date();
  var currentHoursAP = currentTime.getHours();
  var currentHours = currentTime.getHours();
  var currentMinutes = currentTime.getMinutes();
  var currentSeconds = currentTime.getSeconds();
  // Pad the minutes and seconds with leading zeros, if required
  currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
  currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;
  // Choose either "AM" or "PM" as appropriate
  var timeOfDay = (currentHours < 12) ? "AM" : "PM";
  // Convert the hours component to 12-hour format if needed
  currentHoursAP = (currentHours > 12) ? currentHours - 12 : currentHours;
  // Convert an hours component of "0" to "12"
  currentHoursAP = (currentHoursAP == 0) ? 12 : currentHoursAP;
  // Compose the string for display
  var currentTimeString = currentHours + ":" + currentMinutes;

  $("#clock").html(currentTimeString);

  // Time of day message
  var msg;
  if(currentHours < 12) {
    msg = "Good Morning, ";
  } else if(currentHours < 18) {
    msg = "Good Afternoon, ";
  } else {
    msg = "Good Evening, ";
  }
  $('.welcome').text(msg);
}

var App = angular.module("newtab", ["LocalStorageModule"]);
