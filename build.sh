cd client/
npm run build
cp -rfv build/static ../server/static/
cp build/index.html ../server/view/index.ejs

