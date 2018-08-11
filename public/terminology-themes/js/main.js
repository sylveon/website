"use strict";
/* globals LuminousGallery */

(async () => {
	const data = await fetch("https://api.github.com/repos/sylveon/website/contents/public/terminology-themes/img").then(r => r.json());

	const themes = data
		.filter(f => !(f.name === "transparent.gif" || f.name === "bw-placeholder.png" || f.type !== "file"))
		.map(f => f.name.replace(".png", ""))
		.sort((a, b) => a.localeCompare(b, { "sensitivity": "base" }));

	document.getElementById("total-number").textContent = themes.length;

	new LuminousGallery(themes.map(renderTheme), {}, {
		caption: e => e.textContent,
		closeOnScroll: true,
		onOpen: () => document.getElementById("wrapper").classList.add("blur"),
		onClose: () => document.getElementById("wrapper").classList.remove("blur")
	});

	document.body.classList.add("loaded");
})();

function renderTheme(themeName, themeIndex) {
	const imageFile = "img/" + themeName + ".png";

	const card = document.createElement("a");
	card.href = imageFile;

	const thumbnail = document.createElement("img");
	thumbnail.setAttribute("data-src", imageFile);
	thumbnail.width = 642;
	thumbnail.height = 390;
	thumbnail.src = "img/transparent.gif";
	thumbnail.className = "lazyload";

	const name = document.createElement("h3");
	name.textContent = themeName;

	card.appendChild(thumbnail);
	card.appendChild(name);
	document.getElementById(`pics-${(themeIndex % 3) + 1}`).appendChild(card);

	return card;
}