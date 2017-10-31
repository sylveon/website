#!/bin/bash

FILES_TO_DELETE=$(git diff --exit-code --name-only --diff-filter=a "${TRAVIS_COMMIT_RANGE}" public/ | sed 's/public\//https:\/\/charlesmilette.net\//g' | head -c -1 | jq -R -s -c 'split("\n")')

if [[ "${PIPESTATUS[0]}" != "1" ]]
then
    exit "${PIPESTATUS[0]}"
fi

SUCCESS=$(curl --silent -X DELETE "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache" -H "X-Auth-Email: ${CLOUDFLARE_EMAIL}" -H "X-Auth-Key: ${CLOUDFLARE_API_TOKEN}" -H "Content-Type: application/json" --data "{\"files\":${FILES_TO_DELETE}}" | jq -r .success)



if [[ "${SUCCESS}" == "true" ]]
then
    exit 0
else
    exit 1
fi