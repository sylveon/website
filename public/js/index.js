"use strict";

(() => {

	const clientId = atob("%{id}");
	const width = window.screen.width;
	const height = window.screen.height;

	let orientation;
	if (width === height) {
		orientation = "squarish";
	} else if (width > height) {
		orientation = "landscape";
	} else if (height > width) {
		orientation = "portrait";
	}

	fetch(`https://api.unsplash.com/photos/random?w=${width}&h=${height}&orientation=${orientation}&client_id=${clientId}`).then(r =>
		r.json()
	).then(image => {
		const body   = document.body;
		const source = document.getElementById("source");
		const author = document.getElementById("author");

		body.style.setProperty("--background", "url('" + image.urls.custom + "')");
		source.href = image.user.links.html;
		author.textContent = image.user.name ? image.user.name : image.user.username;

		source.classList.add("loaded");
	});

})();