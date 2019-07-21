#!/usr/bin/env bash
mkdir -p package
mkdir -p package/archive
rm package/archive.zip
rm -rf package/archive/*

cp -R package.json \
  package-lock.json \
  index.js \
  package/archive

mkdir -p package/archive/app
mkdir -p package/archive/ui-web

cp -R app/src package/archive/app
cp -R ui-web/build package/archive/ui-web

npm install --production --quiet --prefix package/archive

pushd package/archive
zip -rq ../archive.zip ./*
popd
