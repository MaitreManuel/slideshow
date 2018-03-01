export default class Utils {
  static toggle (el, className) {
    if (el.classList.contains(className)) {
      el.classList.remove(className);
    } else {
      el.classList.add(className);
    }
  }

  static uniqueID () { // Generate unique key
    return '_' + Math.random().toString(36).substr(2, 9)
  }

}
