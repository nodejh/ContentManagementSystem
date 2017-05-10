cd client/
npm run build
cd ../
cp client/build/index.html server/views/index.ejs
cp -rfv client/build/ server/static/
#mv server/view/index.html

