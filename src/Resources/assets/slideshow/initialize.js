import $ from 'jquery';
import 'jquery-mousewheel';
import 'slick-carousel';

exports.init = () => {
  let tracking, rightTracking,
    dragging = false,
    slider = document.querySelector('.slideshow .slider'),
    maxItems = document.querySelectorAll('.slideshow-text .item').length,
    sliderRight = document.querySelector('.slideshow').cloneNode(true);

  sliderRight.classList.value = sliderRight.classList.value.concat(' slideshow-right');
  document.querySelector('.split-slideshow').appendChild(sliderRight);

  let rightItems = Array.from(sliderRight.querySelectorAll('.item')),
    reverseItems = rightItems.reverse();

  sliderRight.querySelector('.slider').innerHTML = '';
  for (let i = 0; i < maxItems; i++) {
    sliderRight.querySelector('.slider').appendChild(reverseItems[i]);
  }

  slider.classList.add('slideshow-left');

  $('.slideshow-left').slick({
    arrows: false,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    dots: true,
    infinite: true,
    speed: 1000,
    vertical: true,
    verticalSwiping: true
  }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    if (currentSlide > nextSlide && nextSlide === 0 && currentSlide === maxItems - 1) {
      $('.slideshow-right .slider').slick('slickGoTo', -1);
      $('.slideshow-text').slick('slickGoTo', maxItems);
      $('.slideshow-description').slick('slickGoTo', maxItems);
    } else if (currentSlide < nextSlide && currentSlide === 0 && nextSlide === maxItems - 1) {
      $('.slideshow-right .slider').slick('slickGoTo', maxItems);
      $('.slideshow-text').slick('slickGoTo', -1);
      $('.slideshow-description').slick('slickGoTo', -1);
    } else {
      $('.slideshow-right .slider').slick('slickGoTo', maxItems - 1 - nextSlide);
      $('.slideshow-text').slick('slickGoTo', nextSlide);
      $('.slideshow-description').slick('slickGoTo', nextSlide);
    }
  }).on('mousewheel', function(event) {
    event.preventDefault();
    if (event.deltaX > 0 || event.deltaY < 0) {
      $(this).slick('slickNext');
    } else if (event.deltaX < 0 || event.deltaY > 0) {
      $(this).slick('slickPrev');
    }
  }).on('mousedown touchstart', function(){
    dragging = true;
    tracking = $('.slick-track', slider).css('transform');
    tracking = parseInt(tracking.split(',')[5]);
    rightTracking = $('.slideshow-right .slick-track').css('transform');
    rightTracking = parseInt(rightTracking.split(',')[5]);
  }).on('mousemove touchmove', function(){
    if (dragging) {
      let newTracking = $('.slideshow-left .slick-track').css('transform');
      newTracking = parseInt(newTracking.split(',')[5]);
      let diffTracking = newTracking - tracking;
      $('.slideshow-right .slick-track').css({'transform': 'matrix(1, 0, 0, 1, 0, ' + (rightTracking - diffTracking) + ')'});
    }
  }).on('mouseleave touchend mouseup', function(){
    dragging = false;
  });

  $('.slideshow-right .slider').slick({
    arrows: false,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    infinite: true,
    initialSlide: maxItems - 1,
    speed: 950,
    swipe: false,
    vertical: true
  });
  $('.slideshow-text').slick({
    arrows: false,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    infinite: true,
    speed: 900,
    swipe: false,
    vertical: true
  });
  $('.slideshow-description').slick({
    arrows: false,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    infinite: true,
    speed: 900,
    swipe: false,
    vertical: true
  });

  document.querySelector('#admin-settings').classList.remove('d-none');
};
