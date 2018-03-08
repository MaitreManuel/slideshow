export default class Utils {

  /*
  * Permet d'activer ou desactiver une classe sur un element
  * */
  static toggle (el, className) {
    if (el.classList.contains(className)) {
      el.classList.remove(className);
    } else {
      el.classList.add(className);
    }
  }

  /*
  * Permet de generer un ID unique
  * */
  static uniqueID () {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  /*
  * Charge une image dans le DOM et retourne son code en base64
  * */
  static loadImageFileAsURL (fileSelected) {
    const fileReader = new FileReader();

    fileReader.onload = function(fileLoadedEvent) {
      const textAreaFileContents = document.querySelector('#admin-img img');
      textAreaFileContents.src = fileLoadedEvent.target.result;
    };
    fileReader.readAsDataURL(fileSelected);

  }

}
