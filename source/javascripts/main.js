const $ = require('jquery');
const Events = require('throttle-debounce');
const Menu = require('./components/Menu');
const ScrollIntroduce = require('./components/ScrollIntroduce');

const resizeProjectPhotos = () => {
  const element = $('.projects--list--item');
  const itemWidth = element.width();
  element.height(itemWidth);
};

const handleResizingProjectPhotos = () => {
  resizeProjectPhotos();
  $(window).resize(Events.throttle(300, resizeProjectPhotos));
};

const setupAnalitycs = () => {
  window.dataLayer = window.dataLayer || [];
  const gtag = (...args) => {
    window.dataLayer.push(args);
  };

  gtag('js', new Date());
  gtag('config', 'UA-121989512-1');
};

$(() => {
  handleResizingProjectPhotos();
  setupAnalitycs();
  const menu = new Menu();
  const si = new ScrollIntroduce();
});
