#!/bin/bash

BUILD_NUMBER=$(curl --silent https://api.travis-ci.org/repos/sylveon/website | jq -r .last_build_number)

COMMIT_SHA=$(curl --silent https://api.travis-ci.org/repos/sylveon/website/builds?number=$(( BUILD_NUMBER - 1 )) | jq -r .[0].commit)

JSON_ARRAY_FILES_TO_DELETE=$(git diff --name-only $COMMIT_SHA HEAD | grep public/ | sed 's/public\//https:\/\/charlesmilette.net\//g' | head -c -1 | jq -R -s -c 'split("\n")')

SUCCESS=$(curl --silent -X DELETE "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache" -H "X-Auth-Email: ${CLOUDFLARE_EMAIL}" -H "X-Auth-Key: ${CLOUDFLARE_API_TOKEN}" -H "Content-Type: application/json" --data "{\"files\":${JSON_ARRAY_FILES_TO_DELETE}}" | jq -r .success)



if [[ "$SUCCESS" == "true" ]]
then
    return 0
else
    return 1
fi