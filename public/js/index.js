"use strict";

(async () => {

	const clientId = atob("%{id}");
	const width    = window.screen.width;
	const height   = window.screen.height;

	let orientation;
	if (width === height) {
		orientation = "squarish";
	} else if (width > height) {
		orientation = "landscape";
	} else if (height > width) {
		orientation = "portrait";
	}

	const data  = await fetch(`https://api.unsplash.com/photos/random?w=${width}&h=${height}&orientation=${orientation}&client_id=${clientId}`);
	const image = await data.json();
	const back  = document.getElementById("back");
	back.onload = () => {
		source.classList.add("loaded");
		back.classList.add("loaded");
	};

	back.src = image.urls.custom;
	document.getElementById("source").href = image.user.links.html + "?utm_source=charlesmilette-website&utm_medium=referral";
	document.getElementById("author").textContent = image.user.name ? image.user.name : image.user.username;

})();