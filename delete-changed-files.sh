#!/bin/sh

BUILD_ID=$(curl --silent https://api.travis-ci.org/repos/sylveon/website | jq .last_build_id)

COMMIT_SHA=$(curl --silent https://api.travis-ci.org/builds/269385988 | jq -r .commit)

JSON_ARRAY_FILES_TO_DELETE=$(git diff --name-only $COMMIT_SHA HEAD | grep public/ | sed 's/public\//https:\/\/charlesmilette.net\//g' | jq -R -s -c 'split("\n")')

curl -X DELETE "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache" -H "X-Auth-Email: ${CLOUDFLARE_EMAIL}" -H "X-Auth-Key: ${CLOUDFLARE_API_TOKEN}" -H "Content-Type: application/json" --data '{"files":${JSON_ARRAY_FILES_TO_DELETE}}'
