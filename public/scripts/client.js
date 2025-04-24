//const { response } = require("express");

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  
  $("form").on("submit", function(event) {
    event.preventDefault();
    const txt = $(".text-area").val().trim();
    console.log(txt);
    if (txt.length > 140) {
      alert("Tweet is too long!");
      return;
    }
    if (!txt) {
      alert("Tweet can not be empty!");
      return;
    }
      
  });
    
  const formData = $(event.target).serialize();
  //console.log(event);

  $.ajax({
    method: "POST",
    url: "/api/tweets",
    data: formData,
    success: function(response) {
      loadTweets();
      //console.log(response);
    },
    error: function(xhr,status,error) {
      console.error(xhr.responseJSON || error);
    }
    
  });
    
  

  const rendertweets = function(tweets) {
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $("#tweets-container").prepend(tweetElement);
    }
  };
  const createTweetElement = (tweetData) => {
    const {user, content, created_at} = tweetData;
    const {name, avatars, handle} = user;

    const postTweet = `
        <article class="tweet">
          <header>
          <span> <img src="${avatars}"> ${name} </span>
          <span> ${handle} </span>
          </header>

          <p>${content.text}</p>
          <hr class="horizontal-line">

          <footer>
          <span>${timeago.format(created_at)}</span>
          <span>
            <button class="btn"><i class="fa-solid fa-flag"></i></button>
            <button class="btn"><i class="fa-solid fa-retweet"></i></button>
            <button class="btn"><i class="fa-solid fa-heart"></i></button>
          </span>
          </footer>
        </article>
          `;
    
    const $tweet = $(postTweet);
    $tweet.find("p").text(content.text);
    
    return $tweet;
  };

  
  const loadTweets = function() {
    $.ajax('api/tweets', {method: 'GET'})
      .then(function(tweets) {
        rendertweets(tweets);
      })
      .catch((err) => console.error(err));
  };

});

