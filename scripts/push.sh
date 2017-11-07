#!/bin/bash
printf '\n\n>>>>>>>>>>>>>>>>>> cd /Users/coin/Documents/GitRepository/babymarket-web-src/build\n\n'
cd /Users/coin/Documents/GitRepository/babymarket-web-src/build
printf '\n\n>>>>>>>>>>>>>>>>>> ls -la\n\n'
ls -la

rm -rfv /Users/coin/Documents/GitRepository/babymarket-web-build/static/*

printf '\n\n>>>>>>>>>>>>>>>>>> cp -rvf ./* /Users/coin/Documents/GitRepository/babymarket-web-build\n\n'
cp -rvf ./* /Users/coin/Documents/GitRepository/babymarket-web-build
printf '\n\n>>>>>>>>>>>>>>>>>> cd /Users/coin/Documents/GitRepository/babymarket-web-build\n\n'
cd /Users/coin/Documents/GitRepository/babymarket-web-build
printf '\n\n>>>>>>>>>>>>>>>>>> git status\n\n'
git status
printf '\n\n>>>>>>>>>>>>>>>>>> git add .\n\n'
git add .
printf '\n\n>>>>>>>>>>>>>>>>>> git status\n\n'
git status
printf "\n\n>>>>>>>>>>>>>>>>>> git commit -m 'auto commit by bash script'\n\n"
git commit -m 'auto commit by bash script'
printf '\n\n>>>>>>>>>>>>>>>>>> git push\n\n'
git push