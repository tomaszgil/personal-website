$(document).ready(function() {
  handleMobileNavigation();
});

function handleMobileNavigation() {
  $("#menu-button").on('click', function() {
    $("#menu").toggleClass("mobile-menu-active");
    $(this).toggleClass("header--mobile-menu-button__close");
  });
}
