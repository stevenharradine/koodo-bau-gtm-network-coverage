"use strict";

// dbNetCov is short for deviceBlockNetworkCoverage
const dbNetCov = {
	devEnvironment: false
};

dbNetCov.init = () => {
	dbNetCov.checkEnvironment();
	dbNetCov.getWindowWidth();
};

dbNetCov.checkEnvironment = () => {
	if(window.location.href.indexOf("localhost") > -1) {
		dbNetCov.devEnvironment = true;
	}
};

dbNetCov.getWindowWidth = () => {
	dbNetCov.windowWidth = window.innerWidth; // width of window + scrollbar
	dbNetCov.calculateModuleWidth();
};

// method to adjust module width based on screen size
dbNetCov.calculateModuleWidth = () => {
	let dbMaxWidth = undefined;
	let dbWidth = undefined;

	if (dbNetCov.windowWidth >= 1100) { // desktop view
		dbMaxWidth = 373;
		dbWidth = document.querySelector("#db-network-coverage").clientWidth;

		if (dbWidth > dbMaxWidth) {
			jQuery(".db-network-coverage").css("width", dbMaxWidth);
		} else {
			jQuery(".db-network-coverage").css("width", dbWidth);
		};
	} else if (dbNetCov.windowWidth <= 1099 && dbNetCov.windowWidth >= 768 ) { // tablet view
		dbMaxWidth = 515;
		dbWidth = document.querySelector("#db-network-coverage").clientWidth;

		if (dbWidth > dbMaxWidth) {
			jQuery(".db-network-coverage").css("width", dbMaxWidth);
		} else {
			jQuery(".db-network-coverage").css("width", dbWidth);
		};
	} else if (dbNetCov.windowWidth <= 767 ) { // mobile view
		dbMaxWidth = 767;
		dbWidth = document.querySelector("#db-network-coverage").clientWidth;

		if (dbWidth > dbMaxWidth) {
			jQuery(".db-network-coverage").css("width", dbMaxWidth);
		} else {
			jQuery(".db-network-coverage").css("width", dbWidth);
		};
	};
};

window.onresize = () => {
	dbNetCov.getWindowWidth();

	if(dbNetCov.devEnvironment === true) {
		wdHelper.calculateDimensions();
	}
};

jQuery("#toggle-bell").on("click", function() {
	if(!jQuery(this).hasClass("toggle-active")) { // if toggle is not active, do nothing
		let rogersMapZIndex = jQuery(".rogers-layer").css("z-index"); // store z-index value
		rogersMapZIndex = rogersMapZIndex * 1; // convert to number
		jQuery(".bell-layer").css("z-index", rogersMapZIndex + 1); // add 1 to bring map layer to top
	}

	jQuery(this).toggleClass("toggle-active"); // indicates active toggle
	jQuery(".bell-layer").toggleClass("layer-active"); // show map layer
});

jQuery("#toggle-rogers").on("click", function() { // if toggle is not active, do nothing
	if(!jQuery(this).hasClass("toggle-active")) {
		let bellMapZIndex = jQuery(".bell-layer").css("z-index"); // store z-index value
		bellMapZIndex = bellMapZIndex * 1; // convert to number
		jQuery(".rogers-layer").css("z-index", bellMapZIndex + 1); // add 1 to bring map layer to top
	}
	
	jQuery(this).toggleClass("toggle-active"); // indicates active toggle
	jQuery(".rogers-layer").toggleClass("layer-active"); // show map layer
});

document.addEventListener("DOMContentLoaded", () => {
	dbNetCov.init();
});