$(document).ready(function() {
  // --- our code goes here ---
  
  $('.new-tweet form textarea').on('input', function() {
    const remaining = 140 - $(this).val().length; // Calculate remaining characters
  
    // Find the counter element inside the closest form
    const counter = $(this).closest('.new-tweet').find('.counter');
    counter.text(remaining); // Update the counter text
  
    // Change color if the remaining count is less than 0
    if (remaining < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', '#545149');
    }

  });

});
