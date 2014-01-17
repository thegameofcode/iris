iris.screen(function (self) {

	self.create = function() {
		self.tmpl(iris.path.screen.welcome.html);

		// No select a value by default
		self.get('locale_select').prop("selectedIndex", -1);

		self.get('locale_select').on('change', function (e) {
			iris.locale(this.value);

			var params = {
				 price : -1479.59
				,date : new Date()
				,locale : iris.locale()
			};

			self.inflate(params);
		});

	};

},iris.path.screen.welcome.js);
