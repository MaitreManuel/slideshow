exports.init = () => {
  const settings = document.querySelector('#admin-settings');
  settings.addEventListener('click', () => {
    console.log('test');
  });
};