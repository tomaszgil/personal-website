$(document).ready(function() {
  handleResizingProjectPhotos();
  handleMobileNavigation();
  handleFormValidation();
});

function handleResizingProjectPhotos() {
  resizeProjectPhotos();
  $(window).resize(resizeProjectPhotos);
}

function resizeProjectPhotos() {
  var itemWidth = $('.projects--list--item').width();
  $('.projects--list--item').height(itemWidth);
}

function handleMobileNavigation() {
  $("#menu-button").on('click', function() {
    if($("#menu").hasClass("header--menu__mobile")) {
      hideMobileNavigation();
    } else {
      showMobileNavigation();
    }
  });

  $('.header--menu--option').on('click', function (event) {
    var target = $($(this).attr('href'));
    event.preventDefault();
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 1000);
    if($("#menu").hasClass("header--menu__mobile")) {
      hideMobileNavigation();
    }
  });

  $(window).resize(function() {
    if($(this).width() > 760) {
      $("#menu").show();
    }
  });

  $(document).keyup(function(e) {
    if(e.keyCode == 27) hideMobileNavigation();
  });
}

function hideMobileNavigation() {
  var menu = $("#menu");
  var menuButton = $("#menu-button");
  menuButton.removeClass("header--mobile-menu-button__close");
  menu.fadeOut(300, function() {
    menu.removeClass("header--menu__mobile");
  });
}

function showMobileNavigation() {
  var menu = $("#menu");
  var menuButton = $("#menu-button");
  menuButton.addClass("header--mobile-menu-button__close");
  menu.hide();
  menu.addClass("header--menu__mobile");
  menu.fadeIn(300);
}

function handleFormValidation() {
  $(':required').one('blur keydown', function() {
    $(this).addClass('touched');
  });
}
