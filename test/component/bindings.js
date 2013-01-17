iris.screen(function (self) {

	self.create = function() {
		self.tmpl("test/component/bindings.html");

		var data = { person: { name:"test name", region: { country: "country test" } } };

		self.inflate(data);

		window.strictEqual(self.get("test_div").text(), data.person.name, "Data bindings on divs");
		window.strictEqual(self.get("test_span").text(), data.person.name, "Data bindings on spans");
		window.strictEqual(self.get("test_button").text(), data.person.region.country, "Data bindings on button");
		window.strictEqual(self.get("test_input_text").val(), data.person.name, "Data bindings on text inputs");
		window.strictEqual(self.get("test_input_hidden").val(), data.person.name, "Data bindings on hidden inputs");
		window.strictEqual(self.get("test_textarea").val(), data.person.name, "Data bindings on textareas");

		window.start();
	};

});