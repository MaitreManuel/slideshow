import slideManager from './slideManager';
import Utils from '../scripts/utils';

exports.init = () => {
  const settings = document.querySelector('#admin-settings'),
    cancel = document.querySelector('.btn-cancel'),
    panel = document.querySelector('#admin-panel'),
    valid = document.querySelector('.btn-valid'),
    adminImg = document.querySelector('#admin-img'),
    adminTitle = document.querySelector('#admin-title'),
    adminDesc = document.querySelector('#admin-desc'),
    adminLink = document.querySelector('#admin-link'),
    block = document.querySelector('#block'),
    sManager = slideManager.getManager();

  valid.addEventListener('click', () => {
    block.classList.add('block');

    if(panel.classList.contains('active')) {
      if(formIsNotEmpty()) {
        const slideForFile = getInfo('admin');
        Utils.loadImageFileAsURL(slideForFile.imgFile);

        const slideToUpdate = getInfo('admin');
        sManager.updateSlide(slideToUpdate.slideId, slideToUpdate.titleHTML, slideToUpdate.descHTML, slideToUpdate.linkHTML, slideToUpdate.imgSrc);
      } else {
        alert('Veuillez remplir tous les champs');
      }
    } else {
      cloneSlide();
      panel.classList.add('active');
      settings.classList.add('active');
    }
  });

  cancel.addEventListener('click', () => {
    block.classList.remove('block');
    panel.classList.remove('active');
    settings.classList.remove('active');
  });


  /*
  * Permet de cloner une image (pour la mettre dans l'admin)
  * */
  const cloneSlide = () => {
    const slideObject = getInfo();
    emptyAdminField();

    adminImg.appendChild(slideObject.imgHTML.cloneNode(true));
    adminTitle.value = slideObject.titleHTML;
    adminDesc.value= 'test';
    adminLink.value = 'test';
  };

  /*
  * Return un objet contenant les infos de l'admin ou du slide
  * */
  const getInfo = (which = '') => {
    if(which === 'DOM' || which === '') {
      return {
        slideId: document.querySelector('#slides-image .slick-current .item img').getAttribute('data-id'),
        imgHTML: document.querySelector('#slides-image .slick-current .item img'),
        titleHTML:document.querySelector('#slides-text .slick-current .item').innerHTML,
        // descHTML: document.querySelector('#slides-desc').innerHTML,
        // linkHTML: document.querySelector('#slides-link').innerHTML
      };
    } else if (which === 'admin') {
      return {
        slideId: document.querySelector('#slides-image .slick-current .item img').getAttribute('data-id'),
        imgFile: document.querySelector('input[type=file]').files[0],
        imgSrc: document.querySelector('#admin-img img').src,
        titleHTML: document.querySelector('#admin-title').value,
        descHTML: document.querySelector('#admin-desc').value,
        linkHTML: document.querySelector('#admin-link').value
      };
    }
  };

  /*
  * Vide les champs de l'admin
  * */
  const emptyAdminField = () => {
    adminTitle.innerHTML = '';
    while (adminImg.firstChild) {
      adminImg.removeChild(adminImg.firstChild);
    }
    adminDesc.innerHTML = '';
    adminLink.innerHTML = '';
  };

  /*
  * Verifie que le form est rempli
  * */
  const formIsNotEmpty = () => {
    if (adminTitle.value != ''  && adminDesc.value != '' && adminLink.value != '' && document.querySelector('input[type=file]').files.length === 1) {
      return true;
    } else {
      return false;
    }
  };
};
