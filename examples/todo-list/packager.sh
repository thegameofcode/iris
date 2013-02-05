rm -Rf packed

mkdir packed
cp index.html packed
mkdir packed/css
cp css/base.css packed/css

node ../../tools/iris_packager.js input='app' output='packed' init='init.js'
