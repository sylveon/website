"use strict";
/* globals LuminousGallery */

(() => {
	fetch("https://api.github.com/repos/sylveon/website/contents/public/terminology-themes/img").then(r =>
		r.json()
	).then(t => {
		let themes = t.filter(v =>
			!(v.name === "transparent.gif" || v.name === "bw-placeholder.png" || v.type !== "file")
		).map(f =>
			f.name.replace(".png", "")
		).sort((a, b) =>
			a.localeCompare(b, {
				"sensitivity": "base"
			})
		);

		document.getElementById("total-number").textContent = themes.length;

		new LuminousGallery(themes.map(renderTheme), {}, {
			caption: e => e.textContent,
			closeOnScroll: true,
			onOpen: () => document.getElementById("wrapper").classList.add("blur"),
			onClose: () => document.getElementById("wrapper").classList.remove("blur")
		});

		document.body.classList.add("loaded");
	});
})();

function renderTheme(themeName, themeIndex) {
	let imageFile = "img/" + themeName + ".png";

	let card = document.createElement("a");
	card.href = imageFile;

	let thumbnail = document.createElement("img");
	thumbnail.setAttribute("data-src", imageFile);
	thumbnail.width = 642;
	thumbnail.height = 390;
	thumbnail.src = "img/transparent.gif";
	thumbnail.className = "lazyload";

	let name = document.createElement("h3");
	name.textContent = themeName;

	card.appendChild(thumbnail);
	card.appendChild(name);
	document.getElementById("pics-" + Math.round(themeIndex / 3 % 1 * 3 + 1)).appendChild(card);

	return card;
}