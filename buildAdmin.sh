cd admin-client/
npm run build
cd ../
cp admin-client/build/index.html admin-koa/views/index.ejs
cp -rfv admin-client/build/ admin-koa/static/


