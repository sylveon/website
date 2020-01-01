"use strict";

(async () => {
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

	const image  = await fetch(`/.netlify/functions/get-random-image?w=${width}&h=${height}&orientation=${orientation}`).then(r => r.json());
	const back   = document.getElementById("back");
	const source = document.getElementById("source");
	back.onload = () => {
		source.classList.add("loaded");
		back.classList.add("loaded");
	};

	back.src = image.url;
	source.href = image.source;
	document.getElementById("author").textContent = image.author;
})();