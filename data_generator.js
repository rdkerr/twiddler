/*
 * NOTE: This file generates fake tweet data, and is not intended to be part of your implementation.
 * You can safely leave this file untouched, and confine your changes to index.html.
 */

// set up data structures
window.streams = {};
streams.home = [];
streams.users = {};
streams.users.shawndrost = [];
streams.users.sharksforcheap = [];
streams.users.mracus = [];
streams.users.douglascalhoun = [];
window.users = Object.keys(streams.users);
var visitor = 'anonymous';

// utility function for adding tweets to our data structures
var addTweet = function(newTweet){
  var username = newTweet.user;
  streams.users[username].push(newTweet);
  streams.home.push(newTweet);
};

// utility function
var randomElement = function(array){
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// random tweet generator
var opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
var verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
var nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
var tags = ['#techlife', '#burningman', '#sf', 'but only i know how', 'for real', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '', '', '', ''];

var randomMessage = function(){
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
};

// generate random tweets on a random schedule
var generateRandomTweet = function(){
  var tweet = {};
  tweet.user = randomElement(users);
  tweet.message = randomMessage();
  tweet.created_at = new Date();
  addTweet(tweet);
};

for(var i = 0; i < 10; i++){
  generateRandomTweet();
}

streams.users[visitor] = [];

var scheduleNextTweet = function(){
  generateRandomTweet();
  setTimeout(scheduleNextTweet, Math.random() * 1500);
};
scheduleNextTweet();

// utility function for letting students add "write a tweet" functionality
// (note: not used by the rest of this file.)
var writeTweet = function(message){
  if(!visitor){
    throw new Error('set the global visitor property!');
  }
  var tweet = {};
  tweet.user = visitor;
  tweet.message = message;
  addTweet(tweet);
};

var loadTweets = function(){
  var $body = $('.tweet-list');
  $body.html('');  
  var index = streams.home.length - 1;
  setTimeout(newResults, 2000);
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    $('<img />', { 
      class: 'profile',
      src: 'img/profile.png'
    }).appendTo($tweet);
    $('<a></a>', {
      class: 'user-name',
      href: '#',
      onclick: "loadUserTweets(this.text);return false;",
      text: tweet.user,
    }).appendTo($tweet);
    $('<span></span>', {
      class: 'tweet-time',
      text: timeago().format(tweet.created_at)
    }).appendTo($tweet);
    $('<p></p>', {
      class: 'tweet-message',
      text: tweet.message
    }).appendTo($tweet);
    //$tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($body);
    index -= 1;
  }
  
};

var newResults = function() {
  var $body = $('.tweet-list');
  var difference = streams.home.length - $body.children().size();
  setInterval(updateNewResults, 5000);
  var $newResults = $('<div class="results-box"></div>');
  $('<a></a>', {
    href: '#',
    onclick: "loadTweets();return false;",
    class: 'result-message',
    text: difference + " new results"
  }).appendTo($newResults);
  $newResults.prependTo($body);
  
  
}

var updateNewResults = function() {
  var $body = $('.tweet-list');
  var difference = streams.home.length - $body.children().size();
  $('.result-message').text(difference + ' new results');
}

var loadUserTweets = function(target) {
  console.log(target);
  var user_data = streams.home.filter((u) => {console.log(u);return u.user === target;});
  console.log(user_data);
  var $body = $('.tweet-list');
  $body.html('');  
  var index = user_data.length - 1;
  setTimeout(newResults, 2000);
  while(index >= 0){
    var tweet = user_data[index];
    var $tweet = $('<div class="tweet"></div>');
    $('<img />', { 
      class: 'profile',
      src: 'img/profile.png'
    }).appendTo($tweet);
    $('<a></a>', {
      class: 'user-name',
      href: '#',
      onclick: "loadUserTweets(this.text);return false;",
      text: tweet.user,
    }).appendTo($tweet);
    $('<span></span>', {
      class: 'tweet-time',
      text: timeago().format(tweet.created_at)
    }).appendTo($tweet);
    $('<p></p>', {
      class: 'tweet-message',
      text: tweet.message
    }).appendTo($tweet);
    //$tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($body);
    index -= 1;
  }

}

var saySomething = function() {
  var message = prompt("What would you like to tweet?");
  writeTweet(message);
  loadTweets();
}