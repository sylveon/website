import fetch from "node-fetch";

export async function handler(event, context) {
    if (event.httpMethod !== "GET") {
        return {
            statusCode: 405
        };
    }

    if (event.queryStringParameters.w !== undefined && event.queryStringParameters.h !== undefined && event.queryStringParameters.orientation !== undefined) {
        var width = parseInt(event.queryStringParameters.w, 10);
        var height = parseInt(event.queryStringParameters.h, 10);
        var orientation = event.queryStringParameters.orientation;
        if (!isNaN(width) && !isNaN(height) && (orientation === "squarish" || orientation === "landscape" || orientation === "portrait")) {
            const result = await fetch(`https://api.unsplash.com/photos/random?w=${width}&h=${height}&orientation=${orientation}&client_id=${process.env.UNSPLASH_CLIENT_ID}`).then(r => r.json());

            const reply = {
                url: result.urls.custom,
                source: result.user.links.html + "?utm_source=charlesmilette-website&utm_medium=referral",
                author: result.user.name ? result.user.name : result.user.username
            };

            return {
                statusCode: 200,
                body: JSON.stringify(reply)
            };
        }
    }

    return {
        statusCode: 400
    };
}