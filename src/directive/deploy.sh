#!/usr/bin/env sh

# abort on errors
set -e

# rm -rf deshopastore
# mkdir deshopastore
# build
npm run build.pro

# navigate into the build output directory

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

rm -rf elektro
mkdir elektro
cp -r dist/* elektro

#cp /c/xampp/htdocs/deshopastore/wp-content/mu-plugins/deshopastore.php oss/functions.php
#cp -r /c/xampp/htdocs/deshopastore/wp-content/themes/deshopastore/woocommerce oss/woocommerce

cd elektro
rm -rf dev
rm -rf fontawesome
rm -f bootstrap.css


mv index.html index.php
git init
git add .
git commit -m "initial commit"
echo "Cooling off for 3 second..."
sleep 3
echo "Add git origin..."
git remote add origin ssh://buyelekt@buyelektro.com.ng/home/buyelekt/public_html/wp-content/themes/elektro
echo "starting push..."
git push -uf origin master
#git clone ssh://u46-dd6jzudhruwc@giow1063.siteground.us:18765/~/www/deshopastore.online/public_html/wp-content/themes/deshopastore

echo "waiting for 10second..."
sleep 10
# scp -r -P 18765 * u46-dd6jzudhruwc@giow1063.siteground.us:/home/u46-dd6jzudhruwc/www/deshopastore.online/public_html/wp-content/themes/deshopastore

echo "copying completed"

npm run serve.dev
#git init
#git add -A
#git commit -m 'deploy'


#git push -uf ssh://u46-dd6jzudhruwc@giow1063.siteground.us:18765/~/www/deshopastore.online/public_html/wp-content/themes/deshopastore master


# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

# cd -
