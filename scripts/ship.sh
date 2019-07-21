#!/usr/bin/env bash

{
  scripts/test.sh && \
  scripts/archive.sh && \
  scripts/deploy.sh $@ && \
  echo "🐝 Ship successful!"
} || {
  echo "🚨 Ship unsuccessful."
  exit 1
}
