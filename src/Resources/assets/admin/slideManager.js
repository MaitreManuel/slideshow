import firebase from 'firebase';
import Utils from '../scripts/utils';

export default class slideManager {

  static getConfig () {
    return {
      apiKey: 'AIzaSyAF2w55IwwCMTtSyyYzxnf0gR9rhTeR4uI',
      authDomain: 'slideshow-59bcd.firebaseapp.com',
      databaseURL: 'https://slideshow-59bcd.firebaseio.com',
      projectId: 'slideshow-59bcd',
      storageBucket: 'slideshow-59bcd.appspot.com',
      messagingSenderId: '308033884881'
    };
  }

  constructor () {
    firebase.initializeApp(slideManager.getConfig());
  }

  getSlides () {
    return firebase.database().ref('/slides').once('value');
  }

  addSlide (title, description, link, src) {
    firebase.database().ref('slides/' + Utils.uniqueID()).set({
      title: title,
      description: description,
      link: link,
      src: src
    }.then(console.log('slide is added')));
  }

}