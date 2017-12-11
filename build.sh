#!/usr/bin/env bash

if [ -d "./static" ]
then
    rm -rf static
fi

mv ./build/index.html index.html
mv ./build/favicon.ico favicon.ico
mv ./build/asset-manifest.json asset-manifest.json
mv ./build/service-worker.js service-worker.js
mb ./build/manifest.json manifest.json
mb ./build/font-awesome.css font-awesome.css
mv ./build/static/ static
mv ./build/fonts/ fonts

today=`date '+%Y_%m_%d__%H_%M_%S'`;
git add .
git commit -am "Deployed at $today"
git push origin gh-pages
