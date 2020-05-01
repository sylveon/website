"use strict";
/* globals LuminousGallery */

(async () => {
	const distros = [...document.getElementById("distros").children];
	const instructions = [...document.getElementById("instructions").children];

	hideStuff(distros, instructions);

	const themes = await fetch("https://api.github.com/repos/sylveon/website/contents/public/terminology-themes/img/themes")
		.then(r => r.json())
		.then(d => d
			.map(f => f.name.replace(".png", ""))
			.sort((a, b) => a.localeCompare(b, { "sensitivity": "base" }))
			.map(renderTheme));

	document.getElementById("total-number").textContent = themes.length;

	new LuminousGallery(themes, {}, {
		caption: e => e.textContent,
		closeOnScroll: true,
		onOpen: () => document.getElementById("blur-wrapper").classList.add("blur"),
		onClose: () => document.getElementById("blur-wrapper").classList.remove("blur")
	});

	distros.forEach((e, i) => e.onclick = () => {
		if (e.classList.contains("active")) {
			hideStuff(distros, instructions);
		} else {
			hideStuff(distros, instructions);
			e.classList.add("active");
			instructions[i].style.display = "";
		}
	});

	document.body.classList.add("loaded");
})();

function renderTheme(themeName) {
	const imageFile = `img/themes/${themeName}.png`;

	const card = document.createElement("a");
	card.href = imageFile;

	const thumbnail = document.createElement("img");
	thumbnail.setAttribute("data-src", imageFile);
	thumbnail.width = 642 * 0.8;
	thumbnail.height = 390 * 0.8;
	thumbnail.className = "lazyload";

	const name = document.createElement("h3");
	name.textContent = themeName;

	card.append(thumbnail, name);

	const item = document.createElement("li");
	item.appendChild(card);
	document.getElementById("thumblist").appendChild(item);

	return card;
}

function hideStuff(distros, instructions) {
	distros.forEach(d => d.classList.remove("active"));
	instructions.forEach(i => i.style.display = "none");
}
