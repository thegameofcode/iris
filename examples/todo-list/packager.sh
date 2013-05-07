rm -rf packed

mkdir packed
cp index.html packed
mkdir packed/css
mkdir packed/app
cp css/* packed/css

node ../../tools/iris_packager.js base='app/' output='packed/app' init='app/init.js' ext="html,js,css" input="css"
