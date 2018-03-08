import firebase from 'firebase';
import Utils from '../scripts/utils';

export default class slideManager {

  static _instance;
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

  static getManager () {
    if(!this._instance) {
      this._instance = new slideManager();
    }
    return this._instance;
  }

  login (email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout () {
    return firebase.auth().signOut();
  }

  getSlides () {
    return firebase.database().ref('/slides').once('value');
  }

  getSlideTitle () {
    return firebase.database().ref('/slide_title').once('value');
  }

  updateSlide (id, title, description, link, image) {
    firebase.database().ref('/slides').child(id).update({
      title: title,
      description: description,
      link: link,
      image: image
    });
  }

  addSlide (title, description, link, image) {
    return firebase.database().ref('slides/' + Utils.uniqueID()).set({
      title: title,
      description: description,
      link: link,
      image: image
    });
  }

}
