"use strict";
/* globals LuminousGallery */

async function asyncInit() {
	const result = await fetch("https://api.github.com/repos/sylveon/website/contents/public/terminology-themes/img/themes");
	if (result.ok) {
		const themes = (await result.json())
			.map(f => f.name.replace(".png", ""))
			.sort((a, b) => a.localeCompare(b, { "sensitivity": "base" }))
			.map(themeName => {
				const imageFile = `img/themes/${encodeURIComponent(themeName)}.png`;

				const card = document.createElement("a");
				card.href = imageFile;

				const thumbnail = document.createElement("img");
				thumbnail.setAttribute("data-src", imageFile);
				thumbnail.alt = themeName;
				thumbnail.classList.add("lazyload");
				thumbnail.onerror = () => {
					thumbnail.style.opacity = "0";
				}

				const name = document.createElement("h3");
				name.textContent = themeName;

				card.append(thumbnail, name);

				const item = document.createElement("li");
				item.appendChild(card);
				document.getElementById("thumblist").appendChild(item);

				return card;
			});

		document.getElementById("total-number").textContent = themes.length;

		new LuminousGallery(themes, {}, {
			caption: e => e.textContent,
			closeOnScroll: true
		});

		document.body.classList.add("loaded");
	}
}

function hideStuff(distros, instructions) {
	distros.forEach(d => d.classList.remove("active"));
	instructions.forEach(i => i.style.display = "none");
}

(() => {
	asyncInit();

	const distros = [...document.getElementById("distros").children];
	const instructions = [...document.getElementById("instructions").children];

	hideStuff(distros, instructions);

	distros.forEach((e, i) => e.onclick = () => {
		if (e.classList.contains("active")) {
			hideStuff(distros, instructions);
		} else {
			hideStuff(distros, instructions);
			e.classList.add("active");
			instructions[i].style.display = "";
		}
	});
})();