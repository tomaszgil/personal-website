const $ = require('jquery');
const Events = require('throttle-debounce');

class Menu {
  constructor() {
    this.site = $('html, body');
    this.window = $(window);
    this.menu = $('#menu');
    this.options = $('.header--menu--option');
    this.button = $('#menu-button');
    this.menuOpened = false;
    this.menuOpenedClass = 'header--menu__mobile';
    this.buttonCloseClass = 'header--mobile-menu-button__close';

    this.bindEvents();
  }

  bindEvents() {
    this.button.on('click', this.handleMobileMenu.bind(this));
    this.options.on('click', this.handleOptionChoice.bind(this));

    this.window.resize(Events.throttle(300, () => {
      if (this.window.width() > 760) {
        this.menu.show();
      }
    }));

    $(document).keyup((e) => {
      if (e.keyCode === 27) this.closeMenu();
    });
  }

  handleOptionChoice(event) {
    const target = $($(event.currentTarget).attr('href'));
    event.preventDefault();

    this.site.animate({
      scrollTop: target.offset().top
    }, 1000);

    if (this.menuOpened) {
      this.closeMenu();
      this.restoreScroll();
    }
  }

  handleMobileMenu() {
    if (this.menuOpened) {
      this.closeMenu();
      this.restoreScroll();
    } else {
      this.openMenu();
      this.disableScroll();
    }
  }

  openMenu() {
    this.button.addClass(this.buttonCloseClass);
    this.menu.hide();
    this.menu.addClass(this.menuOpenedClass);
    this.menu.fadeIn(300);
    this.menuOpened = true;
  }

  closeMenu() {
    this.button.removeClass(this.buttonCloseClass);
    this.menu.fadeOut(300, () => {
      this.menu.removeClass(this.menuOpenedClass);
    });
    this.menuOpened = false;
  }

  disableScroll() {
    this.site.css({
      overflow: 'hidden'
    });
  }

  restoreScroll() {
    this.site.css({
      overflow: 'auto'
    });
  }
}

module.exports = Menu;
