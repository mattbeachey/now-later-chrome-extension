// Initialize Firebase
var config = {
    apiKey: "AIzaSyBwOBa-W-5ZSFm_GnJBh-W1hmARGt8vB1I",
    authDomain: "now-and-later-265301.firebaseapp.com",
    databaseURL: "https://now-and-later-265301.firebaseio.com",
    projectId: "now-and-later-265301",
    storageBucket: "now-and-later-265301.appspot.com",
    messagingSenderId: "1006117928571",
    appId: "1:1006117928571:web:235c8e9c229d7f20bf2cde"
  };
  firebase.initializeApp(config);
  
  /**
   * initApp handles setting up the Firebase context and registering
   * callbacks for the auth status.
   *
   * The core initialization is in firebase.App - this is the glue class
   * which stores configuration. We provide an app name here to allow
   * distinguishing multiple app instances.
   *
   * This method also registers a listener with firebase.auth().onAuthStateChanged.
   * This listener is called when the user is signed in or out, and that
   * is where we update the UI.
   *
   * When signed in, we also authenticate to the Firebase Realtime Database.
   */
  function initApp() {
    // Listen for auth state changes.
    firebase.auth().onAuthStateChanged(function(user) {
      console.log('User state change detected from the Background script of the Chrome Extension:', user);
    });
  }
  
  window.onload = function() {
    initApp();
  };