$(document).ready(function() {
  // --- our code goes here ---
  
  $('.new-tweet form textarea').on('input', function() {
    const remaining = 140 - $(this).val().length;
    const counter = $(this).closest('.new-tweet').find('.counter');
    counter.text(remaining);
  
    if (remaining < 0) {
      counter.css('color', 'red');
      
    } else {
      counter.css('color', '#545149');
    }
  });

});


