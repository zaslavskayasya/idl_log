(function ($) {
	"use strict";

	const firebaseConfig = {
		apiKey: "AIzaSyBGFRz6ZeevupFnq75UDLAYBrqThjzn9MI",
		authDomain: "idalp-platform.firebaseapp.com",
		projectId: "idalp-platform",
		storageBucket: "idalp-platform.appspot.com",
		messagingSenderId: "539345605215",
		appId: "1:539345605215:web:e20f84a2a0b93d8f1981ea",
		measurementId: "G-Y70NMSN16L"
	};

	// Initialize Firebase
	const fb = firebase.initializeApp(firebaseConfig);

	//check state

	fb.auth().onAuthStateChanged(function (user) {
		$('.lds-ellipsis').fadeOut(); // will first fade out the loading animation
		$('.preloader').delay(333).fadeOut('slow'); // will fade out the white DIV that covers the website.
		if (user !== null) {
			window.location.href = "index.html";
		} else {
			$('body').delay(333);
		}
	});

	function getParameterByName(name, url = window.location.href) {
		name = name.replace(/[\[\]]/g, '\\$&');
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

	async function auth(email, password) {
		try {
			const user = await fb.auth().signInWithEmailAndPassword(email, password);
		} catch (err) {
			document.querySelector('div.alert').innerText = err.message;
			$('div.alert').removeClass('d-none');
		}
	}

	async function forgot(email) {
		fb.auth().sendPasswordResetEmail(email).then(function () {
			document.querySelector('#emailAddress').value = "";
			$('#message-error').addClass('d-none');
			$('#message-info').removeClass('d-none');
			document.querySelector('#message-info').innerText = "You will receive per email a recovery link";

		}).catch(function (error) {
			$('#message-info').addClass('d-none');
			$('#message-error').removeClass('d-none');
			document.querySelector('#message-error').innerText = error.message;
		});
	}

	async function resetPassword(password) {
		var mode = getParameterByName('mode');
		var actionCode = getParameterByName('oobCode');
		var auth = fb.auth();

		auth.verifyPasswordResetCode(actionCode).then((email) => {
			var accountEmail = email;
			var newPassword = document.querySelector('#newPassword').value.trim();
			auth.confirmPasswordReset(actionCode, newPassword).then((resp) => {
				auth.signInWithEmailAndPassword(accountEmail, newPassword);
			}).catch((error) => {
				$('#message-error').removeClass('d-none');				
				document.querySelector('#message-error').innerText = error.message;
			});
		}).catch((error) => {
			$('#message-error').removeClass('d-none');
			document.querySelector('#message-error').innerText = "Invalid or expired link. Try to reset the password again.";
		});

	}
	// Login
	if ($("#loginForm").length) {
		document.querySelector('#loginForm button').addEventListener('click', function (e) {
			let email = document.querySelector('#emailAddress'),
				password = document.querySelector('#loginPassword');

			if ($('#loginForm')[0].checkValidity()) {
				auth(email.value.trim(), password.value.trim());
				e.preventDefault();
				e.stopPropagation();
			} else {
				// password.closest(".form-item").classList.add('error-decor');
			}
		});

	}
	//Forgot password
	if ($("#forgotForm").length) {
		document.querySelector('#forgotForm button').addEventListener('click', function (e) {
			let email = document.querySelector('#emailAddress').value.trim();

			if ($('#forgotForm')[0].checkValidity()) {
				e.preventDefault();
				e.stopPropagation();
				forgot(email);
			}
		});
	}

	//Reset password
	if ($("#resetForm").length) {
		document.querySelector('#resetForm button').addEventListener('click', function (e) {
			let newPassword = document.querySelector('#newPassword').value.trim();

			if ($('#resetForm')[0].checkValidity()) {
				e.preventDefault();
				e.stopPropagation();
				resetPassword(newPassword);
			}
		});
	}

	// Fixed Bootstrap Multiple Modal Issue
	$('body').on('hidden.bs.modal', function () {
		if ($('.modal.show').length > 0) {
			$('body').addClass('modal-open');
		}
	});

	/*------------------------
	   tooltips
	-------------------------- */
	$('[data-toggle=\'tooltip\']').tooltip({
		container: 'body'
	});

})(jQuery)