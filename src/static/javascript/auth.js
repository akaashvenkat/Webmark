(function() {

  var config = firebaseConfig;
  if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
  }

  const emailSignUp = document.getElementById('signup_email');
  const passwordSignUp = document.getElementById('signup_password');
  const buttonSignUp = document.getElementById('signup_button');
  const emailSignIn = document.getElementById('signin_email');
  const passwordSignIn = document.getElementById('signin_password');
  const buttonSignIn = document.getElementById('login_button');
  const emailPasswordReset = document.getElementById('reset_password_email');
  const buttonPasswordReset = document.getElementById('reset_password_button');
  const googleSignUp = document.getElementById('googlesignupdiv');
  const googleSignIn = document.getElementById('googlesignindiv');

  if (buttonSignUp) {
    buttonSignUp.addEventListener('click', e => {
      const email = emailSignUp.value;
      const pass = passwordSignUp.value;
      const auth = firebase.auth();

      if (email.length < 1 && pass.length < 1) {
        alert('Please enter an email and a password.');
        return;
      } else if (email.length < 1) {
        alert('Please enter an email.');
        return;
      } else if (pass.length < 1) {
        alert('Please enter a password.');
        return;
      }

      auth.createUserWithEmailAndPassword(email, pass)
        .then(function(result) {
          auth.currentUser.getIdToken(true)
            .then(function (idToken) {
              updateToken(idToken)
                .then(function(result) {
                  window.location.assign("./walkthrough")
              });
  	        })
            .catch(function (error) {
              self.text = "ERROR:" + error.message;
          });
        })
        .catch(function(error) {
          if (error.code == 'auth/email-already-in-use') {
            alert('The email is already in use. Please sign up with another email.');
          } else if (error.code == 'auth/invalid-email') {
            alert('The email address is not valid. Please use a valid email address.');
          } else if (error.code == 'auth/weak-password') {
            alert('The password is too weak. Please use a stronger password.');
          } else {
            alert(error.message);
          }
          console.log(error);
          return;
      });
    });
  }

  async function updateToken(tok) {
    document.cookie = "cookieToken=" + tok;
  }

  buttonSignIn.addEventListener('click', e => {
    const email = emailSignIn.value;
    const pass = passwordSignIn.value;
    const auth = firebase.auth();

    if (email.length < 1 && pass.length < 1) {
      alert('Please enter an email and a password.');
      return;
    } else if (email.length < 1) {
      alert('Please enter an email.');
      return;
    } else if (pass.length < 1) {
      alert('Please enter a password.');
      return;
    }

    auth.signInWithEmailAndPassword(email, pass)
      .then(function(result) {
        auth.currentUser.getIdToken(true)
          .then(function (idToken) {
            updateToken(idToken)
              .then(function(result) {
                window.location.assign("./webmarks")
            });
	        })
          .catch(function (error) {
            self.text = "ERROR:" + error.message;
        });
      })
      .catch(function(error) {
        if (error.code == 'auth/invalid-email') {
          alert('The email address is not valid. Please use a valid email address.');
        } else if (error.code == 'auth/user-not-found') {
          alert('The email you entered is not present in our system. Please try another email.');
        } else if (error.code == 'auth/wrong-password') {
          alert('The password typed is incorrect. Please try again.');
        } else {
          alert(error.message);
        }
        console.log(error);
        return;
    });
  });

  buttonPasswordReset.addEventListener('click', e => {
    const email = emailPasswordReset.value;
    const auth = firebase.auth();

    if (email.length < 1) {
      alert('Please enter an email.');
      return;
    }

    auth.sendPasswordResetEmail(email)
      .then(function(result) {
        alert('Please check your email to reset your password.');
        return;
      })
      .catch(function(error) {
        if (error.code == 'auth/invalid-email') {
          alert('The email address is not valid. Please use a valid email address.');
        } else if (error.code == 'auth/user-not-found') {
          alert('The email you entered is not present in our system. Please try another email.');
        } else {
          alert(error.message);
        }
        console.log(error);
        return;
    });
  });

  if (googleSignUp) {
    googleSignUp.addEventListener('click', e => {
      const auth = firebase.auth();
      var provider = new firebase.auth.GoogleAuthProvider();

      auth.signInWithPopup(provider)
        .then(function(result) {
          auth.currentUser.getIdToken(true)
            .then(function (idToken) {
              updateToken(idToken)
                .then(function(result) {
                  window.location.assign("./walkthrough")
              });
            })
            .catch(function (error) {
              self.text = "ERROR:" + error.message;
          });
        })
        .catch(function(error) {
          alert(error.message);
          console.log(error);
          return;
      });
    });
  }

  googleSignIn.addEventListener('click', e => {
    const auth = firebase.auth();
    var provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
      .then(function(result) {
        auth.currentUser.getIdToken(true)
          .then(function (idToken) {
            updateToken(idToken)
              .then(function(result) {
                window.location.assign("./webmarks")
            });
          })
          .catch(function (error) {
            self.text = "ERROR:" + error.message;
        });
      })
      .catch(function(error) {
        alert(error.message);
        console.log(error);
        return;
    });
  });

}());
