exports.init = () => {
  const settings = document.querySelector('#admin-settings'),
    cancel = document.querySelector('.btn-cancel'),
    panel = document.querySelector('#admin-panel'),
    valid = document.querySelector('.btn-valid'),
    adminImg = document.querySelector('#admin-img'),
    adminTitle = document.querySelector('#admin-title'),
    adminDesc = document.querySelector('#admin-desc'),
    adminLink = document.querySelector('#admin-link');

  valid.addEventListener('click', () => {
    panel.classList.add('active');
    settings.classList.add('active');

    cloneSlide();
  });

  cancel.addEventListener('click', () => {
    panel.classList.remove('active');
    settings.classList.remove('active');
  });

  const cloneSlide = () => {
    const imgHTML = document.querySelector('#slides-image .slick-current .item img').cloneNode(true),
      titleHTML = document.querySelector('#slides-text .slick-current .item').innerHTML;
      // descHTML = document.querySelector('#slides-desc').innerHTML,
      // linkHTML = document.querySelector('#slides-link').innerHTML;

    adminImg.innerHTML = '';
    adminTitle.innerHTML = '';

    adminImg.appendChild(imgHTML);
    adminTitle.value = titleHTML;
    adminDesc.value= 'test';
    adminLink.value = 'test';
  };
};
