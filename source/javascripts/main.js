const $ = require('jquery');

const resizeProjectPhotos = () => {
  const element = $('.projects--list--item');
  const itemWidth = element.width();
  element.height(itemWidth);
};

const disableScroll = () => {
  $('html, body').css({
    overflow: 'hidden'
  });
};

const restoreScroll = () => {
  $('html, body').css({
    overflow: 'auto'
  });
};


const hideMobileNavigation = () => {
  const menu = $('#menu');
  const menuButton = $('#menu-button');
  menuButton.removeClass('header--mobile-menu-button__close');
  menu.fadeOut(300, () => {
    menu.removeClass('header--menu__mobile');
  });
};

const showMobileNavigation = () => {
  const menu = $('#menu');
  const menuButton = $('#menu-button');
  menuButton.addClass('header--mobile-menu-button__close');
  menu.hide();
  menu.addClass('header--menu__mobile');
  menu.fadeIn(300);
};

const introduceHeader = () => {
  $('#page-title, #page-subtitle, #topbar').addClass('is-visible');
};

const introduceSectionHeaders = () => {
  const sections = ['about', 'projects', 'contact'];
  sections.forEach((name) => {
    const scroll = $(window).scrollTop();
    if ($(`#${name}`).offset().top - $(window).height() * 3 / 4 < scroll) {
      $(`#${name}--header, #${name}--subheader`).addClass('is-visible');
    }
  });
};

const introduceSectionContents = () => {
  const sections = ['about', 'contact'];
  sections.forEach((name) => {
    const scroll = $(window).scrollTop();
    if ($(`#${name}`).offset().top - $(window).height() * 2 / 3 < scroll) {
      $(`#${name}--content`).addClass('is-visible');
    }
  });
};

const introduceSkillsLists = () => {
  const scroll = $(window).scrollTop();
  const skillsList = $('.about--list--item');
  if ($('#about--skills').offset().top - 3 / 4 * $(window).height() < scroll) {
    skillsList.each((i) => {
      setTimeout(() => {
        skillsList.eq(i).addClass('is-visible');
      }, 200 * i);
    });
  }
};

const introduceProjectPhotos = () => {
  const scroll = $(window).scrollTop();
  const projectsList = $('.projects--list--item');
  if ($('#projects').offset().top - $(window).height() * 1 / 3 < scroll) {
    projectsList.each((i) => {
      setTimeout(() => {
        projectsList.eq(i).addClass('is-visible');
      }, 300 * i);
    });
  }
};

const introduceFooter = () => {
  const scroll = $(window).scrollTop();
  const footer = $('#footer');
  if (footer.offset().top - $(window).height() + 3 / 4 * footer.height() < scroll) {
    $('#footer--content').addClass('is-visible');
  }
};

const handleMobileNavigation = () => {
  $('#menu-button').on('click', () => {
    if ($('#menu').hasClass('header--menu__mobile')) {
      hideMobileNavigation();
      restoreScroll();
    } else {
      showMobileNavigation();
      disableScroll();
    }
  });

  $('.header--menu--option').on('click', (event) => {
    const target = $($(event.currentTarget).attr('href'));
    event.preventDefault();
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 1000);

    if ($('#menu').hasClass('header--menu__mobile')) {
      hideMobileNavigation();
      restoreScroll();
    }
  });

  $(window).resize(() => {
    if ($(this).width() > 760) {
      $('#menu').show();
    }
  });

  $(document).keyup((e) => {
    if (e.keyCode === 27) hideMobileNavigation();
  });
};

const handleResizingProjectPhotos = () => {
  resizeProjectPhotos();
  $(window).resize(resizeProjectPhotos);
};

const handleIntroducingElements = () => {
  introduceHeader();
  $(window).scroll(() => {
    introduceSectionHeaders();
    introduceSectionContents();
    introduceSkillsLists();
    introduceProjectPhotos();
    introduceFooter();
  });
};

$(() => {
  handleResizingProjectPhotos();
  handleMobileNavigation();
  handleIntroducingElements();
});
