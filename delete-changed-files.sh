#!/bin/bash

FILES_TO_DELETE=$(git diff --name-only $TRAVIS_COMMIT_RANGE | grep public/ | sed "s/public\//https:\/\/charlesmilette.net\//g" | head -c -1 | jq -R -s -c "split(\"\n\")")

SUCCESS=$(curl --silent -X DELETE "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache" -H "X-Auth-Email: ${CLOUDFLARE_EMAIL}" -H "X-Auth-Key: ${CLOUDFLARE_API_TOKEN}" -H "Content-Type: application/json" --data "{\"files\":${JSON_ARRAY_FILES_TO_DELETE}}" | jq -r .success)



if [[ "$SUCCESS" == "true" ]]
then
    exit 0
else
    exit 1
fi