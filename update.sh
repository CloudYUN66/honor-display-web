#!/bin/bash

# npm run build:mb-course-test || { echo "command failed"; exit 1; }
# # shellcheck disable=SC2164
# cd apps/mb-course
# ls dist.zip && rm -rf dist.zip
# zip -q -r dist.zip dist-mb-course/
# scp -P 443 dist.zip root@116.205.182.99:/usr/share/nginx/

echo "更新后端"
ssh -p 443 root@116.205.182.99 "cd /project/deploys/honor_display/server && rm -rf awards.db index.js"
scp -P 443 server/awards.db root@116.205.182.99:/project/deploys/honor_display/server/
scp -P 443 server/index.js root@116.205.182.99:/project/deploys/honor_display/server/
ssh -p 443 root@116.205.182.99 "cd /project/deploys/honor_display/server && docker-compose up -d"


echo "打包前端"
npm run build
ls build.zip && rm -rf build.zip
zip -q -r build.zip build/
ssh -p 443 root@116.205.182.99 "cd /project/deploys/honor_display/ && rm -rf build"
scp -P 443 build.zip root@116.205.182.99:/project/deploys/honor_display
ssh -p 443 root@116.205.182.99 "cd /project/deploys/honor_display && unzip build.zip && rm -rf build.zip && docker-compose restart"

echo "更新完成"
