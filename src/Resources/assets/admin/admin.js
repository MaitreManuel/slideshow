exports.init = () => {
  const settings = document.querySelector('#admin-settings'),
    cancel = document.querySelector('.btn-cancel'),
    panel = document.querySelector('#admin-panel'),
    valid = document.querySelector('.btn-valid');

  valid.addEventListener('click', () => {
    panel.classList.add('active');
    settings.classList.add('active');
  });

  cancel.addEventListener('click', () => {
    panel.classList.remove('active');
    settings.classList.remove('active');
  });
};
