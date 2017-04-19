$(document).ready(function() {
  handleMobileNavigation();
});

function handleMobileNavigation() {
  $("#menu-button").on('click', function() {
    $("#menu").toggleClass("header--menu__mobile");
    $(this).toggleClass("header--mobile-menu-button__close");
  });
}
