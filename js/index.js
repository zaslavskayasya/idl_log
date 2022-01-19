const firebaseConfig = {
	apiKey: "AIzaSyBGFRz6ZeevupFnq75UDLAYBrqThjzn9MI",
	authDomain: "idalp-platform.firebaseapp.com",
	projectId: "idalp-platform",
	storageBucket: "idalp-platform.appspot.com",
	messagingSenderId: "539345605215",
	appId: "1:539345605215:web:e20f84a2a0b93d8f1981ea",
	measurementId: "G-Y70NMSN16L"
};

const fb = firebase.initializeApp(firebaseConfig);

var oUserGlobal, oComponent;

fb.auth().onAuthStateChanged(function (user) {

	if (user !== null) {
		oUserGlobal = user;
		sap.ui.getCore().attachInit(function () {
			oComponent = new sap.ui.core.ComponentContainer({
				id: "container",
				name: "com.idalp.Platform"
			});
			oComponent.placeAt("content");
			$('.lds-ellipsis').fadeOut(); // will first fade out the loading animation
			$('.preloader').delay(333).fadeOut('slow'); // will fade out the white DIV that covers the website.
			$('body').delay(333);

		});
	} else {
		window.location.href = "login.html";
		delete oUserGlobal;
		oComponent.destroy();
	}
})

// Fixed Bootstrap Multiple Modal Issue
$('body').on('hidden.bs.modal', function () {
	if ($('.modal.show').length > 0) {
		$('body').addClass('modal-open');
	}
});