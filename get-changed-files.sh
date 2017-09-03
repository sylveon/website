#!/bin/sh

BUILD_ID=$(curl --silent https://api.travis-ci.org/repos/sylveon/website | jq .last_build_id)

COMMIT_SHA=$(curl --silent https://api.travis-ci.org/builds/269385988 | jq -r .commit)

git diff --name-only $COMMIT_SHA HEAD
