const $ = require('jquery');
const Events = require('throttle-debounce');

class ScrollIntroduce {
  constructor() {
    this.site = $('html, body');
    this.window = $(window);
    this.visibleClass = 'is-visible';

    this.introduceHeader();
    this.bindEvents();
  }

  bindEvents() {
    this.window.scroll(Events.throttle(300, () => {
      this.introduceSectionHeaders();
      this.introduceSectionContents();
      this.introduceSkillsLists();
      this.introduceProjectPhotos();
      this.introduceFooter();
    }));
  }

  introduceHeader() {
    $('#loader')
      .delay(1300)
      .fadeOut(200, () => {
        $('#page-title, #page-subtitle, #topbar').addClass(this.visibleClass);
      });
  }

  introduceSectionHeaders() {
    const sections = ['about', 'projects', 'contact'];
    sections.forEach((name) => {
      const scroll = $(window).scrollTop();
      if ($(`#${name}`).offset().top - $(window).height() * 3 / 4 < scroll) {
        $(`#${name}--header, #${name}--subheader`).addClass(this.visibleClass);
      }
    });
  }

  introduceSectionContents() {
    const sections = ['about', 'contact'];
    sections.forEach((name) => {
      const scroll = $(window).scrollTop();
      if ($(`#${name}`).offset().top - $(window).height() * 2 / 3 < scroll) {
        $(`#${name}--content`).addClass(this.visibleClass);
      }
    });
  }

  introduceSkillsLists() {
    const scroll = $(window).scrollTop();
    const skillsList = $('.about--list--item');
    if ($('#about--skills').offset().top - 3 / 4 * $(window).height() < scroll) {
      skillsList.each((i) => {
        setTimeout(() => {
          skillsList.eq(i).addClass(this.visibleClass);
        }, 200 * i);
      });
    }
  }

  introduceProjectPhotos() {
    const scroll = $(window).scrollTop();
    const projectsList = $('.projects--list--item');
    if ($('#projects').offset().top - $(window).height() * 1 / 3 < scroll) {
      projectsList.each((i) => {
        setTimeout(() => {
          projectsList.eq(i).addClass(this.visibleClass);
        }, 300 * i);
      });
    }
  }

  introduceFooter() {
    const scroll = $(window).scrollTop();
    const footer = $('#footer');
    if (footer.offset().top - $(window).height() + 3 / 4 * footer.height() < scroll) {
      $('#footer--content').addClass(this.visibleClass);
    }
  }
}


module.exports = ScrollIntroduce;
