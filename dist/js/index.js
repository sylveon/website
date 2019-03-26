"use strict";

(async () => {
	const clientId = atob("%{id}");
	const width    = window.screen.width;
	const height   = window.screen.height;

	let orientation;
	if (Math.abs(width - height) <= 200) {
		orientation = "squarish";
	} else if (width > height) {
		orientation = "landscape";
	} else if (height > width) {
		orientation = "portrait";
	}

	const image  = await fetch(`https://api.unsplash.com/photos/random?w=${width}&h=${height}&orientation=${orientation}&client_id=${clientId}`).then(r => r.json());
	const back   = document.getElementById("back");
	const source = document.getElementById("source");
	back.onload = () => {
		source.classList.add("loaded");
		back.classList.add("loaded");
	};

	back.src = image.urls.custom;
	source.href = image.user.links.html + "?utm_source=charlesmilette-website&utm_medium=referral";
	document.getElementById("author").textContent = image.user.name ? image.user.name : image.user.username;
})();