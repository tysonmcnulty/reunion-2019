#!/usr/bin/env bash
mkdir -p package
mkdir -p package/archive
rm -rf package/archive/*

mkdir -p package/archive/app/src
mkdir -p package/archive/ui-web/build

cp -R package.json \
  package-lock.json \
  index.js \
  package/archive

cp -R app/src package/archive/app/src
cp -R ui-web/build package/archive/ui-web/build

npm install --production --prefix package/archive

zip -rqm package/archive.zip package/archive/*