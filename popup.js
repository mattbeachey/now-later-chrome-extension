//waits until chrome extension popup content has loaded before getting element
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("button").addEventListener("click", getVideoURL)

    //queries current chrome tab for url
    function getVideoURL() {
        chrome.tabs.query({ currentWindow: true, active: true },
            function (tabs) { 
                const currentUrl = tabs[0].url;
                chrome.tabs.sendMessage(tabs[0].id, currentUrl)
            })
    }
})


// TODO(DEVELOPER): Change the values below using values from the initialization snippet: Firebase Console > Overview > Add Firebase to your web app.
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
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // [START_EXCLUDE]
        document.getElementById('quickstart-button').textContent = 'Sign out';
        document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
        document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
        // [END_EXCLUDE]
      } else {
        // Let's try to get a Google auth token programmatically.
        // [START_EXCLUDE]
        document.getElementById('quickstart-button').textContent = 'Sign-in with Google';
        document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
        document.getElementById('quickstart-account-details').textContent = 'null';
        // [END_EXCLUDE]
      }
      document.getElementById('quickstart-button').disabled = false;
    });
    // [END authstatelistener]
  
    document.getElementById('quickstart-button').addEventListener('click', startSignIn, false);
  }
  
  /**
   * Start the auth flow and authorizes to Firebase.
   * @param{boolean} interactive True if the OAuth flow should request with an interactive mode.
   */
  function startAuth(interactive) {
    // Request an OAuth token from the Chrome Identity API.
    chrome.identity.getAuthToken({interactive: !!interactive}, function(token) {
      if (chrome.runtime.lastError && !interactive) {
        console.log('It was not possible to get a token programmatically.');
      } else if(chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else if (token) {
        // Authorize Firebase with the OAuth Access Token.
        var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
        firebase.auth().signInWithCredential(credential).catch(function(error) {
          // The OAuth token might have been invalidated. Lets' remove it from cache.
          if (error.code === 'auth/invalid-credential') {
            chrome.identity.removeCachedAuthToken({token: token}, function() {
              startAuth(interactive);
            });
          }
        });
      } else {
        console.error('The OAuth Token was null');
      }
    });
  }
  
  /**
   * Starts the sign-in process.
   */
  function startSignIn() {
    document.getElementById('quickstart-button').disabled = true;
    if (firebase.auth().currentUser) {
        console.log("signed in")
      firebase.auth().signOut();
    } else {
        console.log("not signed in")  
      startAuth(true);
    }
  }
  
  window.onload = function() {
    initApp();
  };