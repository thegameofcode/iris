iris.ui(function (self) {

	self.create = function() {
		self.tmpl(iris.path.ui.withmodel.html);

		var model = iris.model(iris.path.model.example.js, {text: 'Timestamp ' + new Date().getTime() });
	};

},iris.path.ui.withmodel.js);
