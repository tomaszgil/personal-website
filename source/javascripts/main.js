$(function() {
  handleResizingProjectPhotos();
  handleMobileNavigation();
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
      restoreScroll();
    } else {
      showMobileNavigation();
      disableScroll();
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
      restoreScroll();
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

function disableScroll() {
  $('html, body').css({
    overflow: 'hidden'
  });
}

function restoreScroll() {
  $('html, body').css({
    overflow: 'auto'
  });
}

function handleIntroducingElements() {
  introduceHeader();
  $(window).scroll(function() {
    introduceSectionHeaders();
    introduceSectionContents();
    introduceSkillsLists();
    introduceProjectPhotos();
    introduceFooter();
  });
}

function introduceHeader() {
  $("#page-title, #page-subtitle, #topbar").addClass("is-visible");
}

function introduceSectionHeaders() {
  var sections = ["about", "projects", "contact"];
  sections.forEach(function(name) {
    var scroll = $(window).scrollTop();
    if($("#" + name).offset().top - $(window).height() * 3/4 < scroll) {
      $("#" + name + "--header, #" + name + "--subheader").addClass('is-visible');
    }
  });
}

function introduceSectionContents() {
  var sections = ["about", "contact"];
  sections.forEach(function(name) {
    var scroll = $(window).scrollTop();
    if($("#" + name).offset().top - $(window).height() * 2/3 < scroll) {
      $("#" + name + "--content").addClass('is-visible');
    }
  });
}

function introduceSkillsLists() {
  var scroll = $(window).scrollTop();
  var skillsList = $(".about--list--item");
  if($("#about--skills").offset().top - 3/4 * $(window).height() < scroll) {
    skillsList.each(function(i) {
      setTimeout(function() {
        skillsList.eq(i).addClass("is-visible");
      }, 200 * i);
    });
  }
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

function introduceFooter() {
  var scroll = $(window).scrollTop();
  var footer = $("#footer");
  if(footer.offset().top - $(window).height() + 3/4 * footer.height() < scroll) {
    $("#footer--content").addClass('is-visible');
  }
}
