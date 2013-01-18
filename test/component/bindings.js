iris.screen(function (self) {

	self.create = function() {
		self.tmpl("test/component/bindings.html");

		var data = { person: { name:"test name", money: -67890.678, region: { country: "country test" } } };

		self.inflate(data);

		window.strictEqual(self.get("test_div").text(), data.person.name, "Data bindings on divs");
		window.strictEqual(self.get("test_span").text(), data.person.name, "Data bindings on spans");
		window.strictEqual(self.get("test_button").text(), data.person.region.country, "Data bindings on button");
		window.strictEqual(self.get("test_input_text").val(), data.person.name, "Data bindings on text inputs");
		window.strictEqual(self.get("test_input_hidden").val(), data.person.name, "Data bindings on hidden inputs");
		window.strictEqual(self.get("test_textarea").val(), data.person.name, "Data bindings on textareas");

		//
		// with formats
		//
	
        iris.locale(
            "en_US", {
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                dateFormat: "m/d/Y h:i:s",
                currency: {
                    formatPos: "n",
                    formatNeg: "(n)",
                    decimal: ".",
                    thousand: ",",
                    precision: 2
                }
            }
        );
        iris.locale("en_US");

		var money = iris.currency( data.person.money );
		window.strictEqual(self.get("test_format_currency").text(), money, "Data bindings with currency formats");

		window.start();

	};

});