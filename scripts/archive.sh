#!/usr/bin/env bash
set -e

if [ ! -f ui-web/build/index.html ]; then
  echo "No web UI found. Run 'build' command first."
  exit 1
fi

mkdir -p package/archive
rm -rf package/archive.zip package/archive/*

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
