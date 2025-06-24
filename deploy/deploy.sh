#!/usr/bin/env bash
INTER="php"

git fetch
git reset --hard origin/main

ssh localhost . ~/pilarsen.ru/deploy/build.sh