import fetch from "node-fetch";

export async function handler(event, context) {
	if (event.httpMethod !== "GET") {
		return {
			statusCode: 405
		};
	}

	const queryParams = validateParams(event.queryStringParameters);
	if (queryParams) {
		const { width, height } = queryParams;

		const params = new URLSearchParams();
		params.set("w", width);
		params.set("h", height);
		params.set("query", "stars astronomy");
		params.set("content_filter", "low");
		params.set("client_id", process.env.UNSPLASH_CLIENT_ID);

		if (Math.abs(width - height) <= 200) {
			params.set("orientation", "squarish");
		} else if (width > height) {
			params.set("orientation", "landscape");
		} else if (height > width) {
			params.set("orientation", "portrait");
		}

		const result = await fetch(`https://api.unsplash.com/photos/random?${params.toString()}`);
		const data = await result.json();
		if (result.ok) {
			const returnParams = new URLSearchParams();
			returnParams.set("w", width);
			returnParams.set("h", height);

			return {
				statusCode: 200,
				body: JSON.stringify({
					url: `${data.urls.full}&${returnParams.toString()}`,
					source: data.user.links.html + "?utm_source=charlesmilette-website&utm_medium=referral",
					author: data.user.name || data.user.username,
					description: data.description
				})
			};
		} else {
			console.log(JSON.stringify(data));
			return {
				statusCode: 500
			};
		}
	} else {
		return {
			statusCode: 400
		};
	}
}

function validateParams(queryStringParameters) {
	const width = parseInt(queryStringParameters.w, 10);
	const height = parseInt(queryStringParameters.h, 10);

	if (!isNaN(width) && width >= 1 && !isNaN(height) && height >= 1) {
		return { width, height };
	} else {
		return false;
	}
}