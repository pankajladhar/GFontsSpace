#!/usr/bin/env bash

if [ -d "./static" ]
then
    rm -rf static
fi

mv ./build/index.html index.html
mv ./build/favicon.ico favicon.ico
mv ./build/asset-manifest.json asset-manifest.json
mv ./build/service-worker.js service-worker.js
mv ./build/static/ static

today=`date '+%Y_%m_%d__%H_%M_%S'`;
git add .
git commit -am "Deployed at $today"
git push origin gh-pages