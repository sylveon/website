"use strict";

(async () => {
	const params = new URLSearchParams();
	params.set("w", window.screen.width);
	params.set("h", window.screen.height);

	const result  = await fetch(`/.netlify/functions/get-random-image?${params}`);
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