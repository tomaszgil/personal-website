$(document).ready(function() {
  handleResizingProjectPhotos();
  handleMobileNavigation();
  handleFormValidation();
  handleIntroducingElements();
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

function handleIntroducingElements() {
  introduceHeader();
  $(window).scroll(function() {
    introduceSectionHeaders();
    introduceProjectPhotos();
  });
}

function introduceHeader() {
  $("#page-title, #page-subtitle").addClass("is-visible");
}

function introduceSectionHeaders() {
  var sections = ["about", "projects", "contact"];
  sections.forEach(function(name) {
    var scroll = $(window).scrollTop();
    if($("#" + name).offset().top - $(window).height() * 2/3 < scroll) {
      $("#" + name + "--header, #" + name + "--subheader").addClass('is-visible');
    }
  });
}

function introduceProjectPhotos() {
  var scroll = $(window).scrollTop();
  var projectsList = $(".projects--list--item");
  if($("#projects").offset().top - $(window).height() * 1/3 < scroll) {
    projectsList.each(function(i) {
      setTimeout(function() {
        projectsList.eq(i).addClass("is-visible");
      }, 300 * i);
    });
  }

}
