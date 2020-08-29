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

	const result  = await fetch(`/.netlify/functions/get-random-image?w=${encodeURIComponent(width)}&h=${encodeURIComponent(height)}&orientation=${encodeURIComponent(orientation)}`);
	if (result.ok) {
		const image  = await result.json();
		const back   = document.getElementById("back");
		const source = document.getElementById("source");
		back.onload  = () => {
			source.classList.add("loaded");
			back.classList.add("loaded");
		};

		back.src = image.url;
		back.alt = image.description;
		source.href = image.source;
		document.getElementById("author").textContent = image.author;
	}
})();