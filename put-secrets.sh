#!/bin/bash

sed -i "s/%{id}/${UNSPLASH_CLIENT_ID}/g" dist/js/index.js