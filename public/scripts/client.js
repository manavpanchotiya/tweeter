//const { response } = require("express");

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  
  $("form").on("submit", function(event) {
    event.preventDefault();
    
    const formData = $(event.target).serialize();
    //console.log(event);

    $.ajax({
      method: "POST",
      url: "/api/tweets",
      data: formData,
      success: function(response) {
      //console.log(response);
      },
      error: function(xhr,status,error) {
        console.error(xhr.responseJSON || error);
      }
    
    });
    
  });

  const rendertweets = function(tweets) {
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $("#tweets-container").append(tweetElement);
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
          <span>${timeago.formate(created_at)}</span>
          <span>
            <button class="btn"><i class="fa-solid fa-flag"></i></button>
            <button class="btn"><i class="fa-solid fa-retweet"></i></button>
            <button class="btn"><i class="fa-solid fa-heart"></i></button>
          </span>
          </footer>
        </article>
          `;
    console.log(postTweet);
    return $(postTweet);
  };

  
  const loadTweets = function() {
    $.ajax('api/tweets', {method: 'GET'})
      .then(function(tweets) {
        rendertweets(tweets);
      });
  };

});

