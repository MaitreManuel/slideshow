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
    sManager = slideManager.getManager();

  valid.addEventListener('click', () => {
    if(panel.classList.contains('active')) {
      if(formIsNotEmpty()) {
        const slideForFile = getInfo('admin');
        Utils.loadImageFileAsURL(slideForFile.imgFile);
        if(valid.classList.contains('toAdd')) {
          /*
          * Ajout de la slide sur firebase
          * */
          const slideToAdd = getInfo('admin');
          sManager.addSlide(slideToAdd.titleHTML, slideToAdd.descHTML, slideToAdd.linkHTML, slideToAdd.imgSrc);
          valid.classList.remove('toAdd');
        } else {
          const slideToUpdate = getInfo('admin');
          /*
          * Update de la slide
          * */
          sManager.updateSlide(slideToUpdate.slideId, slideToUpdate.titleHTML, slideToUpdate.descHTML, slideToUpdate.linkHTML, slideToUpdate.imgSrc);
        }
        setTimeout(() => {
          panel.classList.remove('active');
          settings.classList.remove('active');
        }, 3000);
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
    panel.classList.remove('active');
    settings.classList.remove('active');
    valid.classList.remove('toAdd');
  });


  /*
  * Ajout d'une slide
  * */
  document.querySelector('#add').addEventListener('click', () => {
    /*
    * ajouter class sur le bouton valider pour changer le update en add si la classe est active
    * */
    emptyAdminField();
    valid.classList.add('toAdd');
  });

  /*
  * Supprimer une slide
  * */
  document.querySelector('#remove').addEventListener('click', () => {
    const idToDelete = getInfo().slideId;
    sManager.deleteSlide(idToDelete).then(
      window.location.reload()
    );
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
        descHTML: document.querySelector('#slides-description').innerHTML,
        // linkHTML: document.querySelector('#slides-link').innerHTML
      };
    } else if (which === 'admin') {
      return {
        slideId: document.querySelector('#slides-image .slick-current .item img').getAttribute('data-id'),
        imgFile: document.querySelector('input[type=file]').files[0],
        imgSrc: document.querySelector('#admin-img img') !== null ? document.querySelector('#admin-img img').src : undefined,
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
    adminTitle.value = '';
    while (adminImg.firstChild) {
      adminImg.removeChild(adminImg.firstChild);
    }
    adminImg.appendChild(document.createElement('img'));
    adminDesc.value = '';
    adminLink.value = '';
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
