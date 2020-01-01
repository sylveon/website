//import fetch from "node-fetch";

//export async function handler(event, context) {
exports.handler =  async function(event, context) {
    if (event.httpMethod !== "GET") {
        return {
            statusCode: 405
        };
    }

    if (event.queryStringParameters.w !== undefined && event.queryStringParameters.h !== undefined && event.queryStringParameters.orientation !== undefined) {
        const width = parseInt(event.queryStringParameters.w, 10);
        const height = parseInt(event.queryStringParameters.h, 10);
        const orientation = event.queryStringParameters.orientation;
        if (!isNaN(width) && !isNaN(height) && (orientation === "squarish" || orientation === "landscape" || orientation === "portrait")) {
            const fetch = require("node-fetch");

            const result = await fetch(`https://api.unsplash.com/photos/random?w=${width}&h=${height}&orientation=${orientation}&client_id=${process.env.UNSPLASH_CLIENT_ID}`);
            if (!result.ok) {
                return {
                    statusCode: 500
                };
            }

            const data = await result.json();
            return {
                statusCode: 200,
                body: JSON.stringify({
                    url: data.urls.custom,
                    source: data.user.links.html + "?utm_source=charlesmilette-website&utm_medium=referral",
                    author: data.user.name ? data.user.name : data.user.username
                })
            };
        }
    }

    return {
        statusCode: 400
    };
}