iris.screen(function (self) {

    self.create = function() {
        // initial configuration
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



        self.tmpl("test/component/models.html");

        var data = { person: { name:"test name", money: -67890.678, region: { country: "country test" }, lastLogin: 1358506927400, updated: "Fri Jan 18 2013 13:09:47 GMT+0100 (CET)" } };
        //var data = { person: { name:"test name", money: -67890.678, region: { country: "country test" } }, lastLogin: "Fri Jan 18 2013 13:09:47 GMT+0100 (CET)" };

        self.inflate(data);

        // Check printed values
        window.expect(9);

        window.strictEqual(self.get("test_div").text(), data.person.name, "Data models on divs");
        window.strictEqual(self.get("test_span").text(), data.person.name, "Data models on spans");
        window.strictEqual(self.get("test_button").text(), data.person.region.country, "Data models on button");
        window.strictEqual(self.get("test_input_text").val(), data.person.name, "Data models on text inputs");
        window.strictEqual(self.get("test_input_hidden").val(), data.person.name, "Data models on hidden inputs");
        window.strictEqual(self.get("test_textarea").val(), data.person.name, "Data models on textareas");



        //
        // with formats
        //

        // Currency

        var money = iris.currency( data.person.money );
        window.strictEqual(self.get("test_format_currency").text(), money, "Data models with currency formats");

        // Dates
        var date = iris.date( data.person.lastLogin );
        window.strictEqual(self.get("test_format_date").text(), date, "Data models with date formats without params");

        date = iris.date( data.person.updated, "y-m-d" );
        window.strictEqual(self.get("test_format_date_params").text(), date, "Data models with date formats with params");


        window.start();

    };

},iris.path.models);