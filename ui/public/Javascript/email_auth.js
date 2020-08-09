(function() {

  var config = firebaseConfig;
  firebase.initializeApp(config);

  const emailSignUp = document.getElementById('email');
  const passwordSignUp = document.getElementById('password');
  const buttonSignUp = document.getElementById('signup');
  const emailSignIn = document.getElementById('modal_email');
  const passwordSignIn = document.getElementById('modal_password');
  const buttonSignIn = document.getElementById('login');
  const buttonPasswordReset = document.getElementById('forgot_password');

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
        window.location.assign("./Walkthrough.html")
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
        window.location.assign("./WebMark.html")
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
    const email = emailSignIn.value;
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

}());
