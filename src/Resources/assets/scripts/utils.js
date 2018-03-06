export default class Utils {
  static toggle (el, className) {
    if (el.classList.contains(className)) {
      el.classList.remove(className);
    } else {
      el.classList.add(className);
    }
  }

  static uniqueID () { // Generate unique key
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  loadImage(event) {
    const me = this;
    const getBase64 = (file) => {
      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        let image,
          preview = document.querySelector('.end_step_1'),
          scene = document.querySelector('.scene_steps'),
          btn_import = document.querySelector('#btn-import');

        image = reader.result;
        btn_import.classList.add('hide');
        scene.classList.add('hide');
        setTimeout(() => {
          btn_import.classList.add('d-none');
          scene.classList.add('d-none');
          btn_import.classList.remove('hide');
          scene.classList.remove('hide');
          preview.querySelector('img').src = reader.result;
          preview.classList.remove('d-none');
        }, 500);
        me.setState({ image: image });
      };
    };

    let file = event.currentTarget.querySelector('input[type="file"]');

    getBase64(file.files[0]);
  }

}
