
// Collapsable Mobile Menu
$('document').ready(function($) {
  $( ".cross" ).hide();
  $( ".menu" ).hide();
  $( ".hamburger" ).click(function() {
    $( ".menu" ).slideToggle( "slow", function() {
    });
  });

  $( ".hamburgerItem" ).click(function() {
    $( ".menu" ).slideToggle( "slow", function() {
    });
  });
});
