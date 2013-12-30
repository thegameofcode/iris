iris.screen(function (self) {

    // First of all, formatting configurations
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

    self.create = function() {
        self.tmpl(iris.path.datajq_tmpl);

        var data = {
            person: {
                name:"test name",
                money: -67890.678,
                num: 1014.68,
                acceptTerms : true, // no change this value
                isAdmin : false, // no change this value or data-jq-toggle test doesnt work well if toogle fails
                region: {
                    country: "country test"
                },
                lastLogin: 1358506927400,
                updated: "Fri Jan 18 2013 13:09:47 GMT+0100 (CET)",
                style: "color:green;",
                undefinedValue: undefined
            }
        };


        // Check printed values
        window.expect(17);

        self.inflate(data);

        window.strictEqual(self.get("test_div").attr("title"), data.person.name, "Data attr in div title attribute");

        window.strictEqual(self.get("test_attr_on_data").attr("data-example"), data.person.name, "Data attr in div data-example attribute");

        window.strictEqual(self.get("test_multiple_attrs").html(), data.person.region.country, "Set up a multiple attributes, val");

        window.strictEqual(self.get("test_multiple_attrs").attr("title"), data.person.name, "Set up a multiple attributes, title");

        window.strictEqual(self.get("test_multiple_attrs").attr("style").replace(" ","", "g"), data.person.style, "Set up a multiple attributes, style");

        window.strictEqual(self.get("test_textarea").text(), data.person.name, "Data set text on textareas");

        window.strictEqual(self.get("test_check_accept").attr("checked"), "checked", "Data set checked");

        window.strictEqual(self.get("test_input_hidden").val(), data.person.name, "Data jq on hidden inputs");

        window.strictEqual(self.get("test_button").text(), data.person.region.country, "Data jq on button");

        window.strictEqual(self.get("test_radio").prop("checked"), data.person.isAdmin, "Data jq on radio");

        // Toggle
        window.strictEqual(self.get().css("display"), data.person.isAdmin ? "block" : "none", "Data jq toggle");

        // Currency
        var money = iris.currency( data.person.money );
        window.strictEqual(self.get("test_format_currency").attr("title"), money, "With currency format");

        // Dates
        var date = iris.date( data.person.lastLogin );
        window.strictEqual(self.get("test_format_date").text(), date, "With date format");

        date = iris.date( data.person.updated, "y-m-d" );
        window.strictEqual(self.get("test_format_date_params").text(), date, "With date format & param");

        var num = iris.number(data.person.num);
        window.strictEqual(self.get("test_format_number").text(), num, "With number format");

        
        window.strictEqual(self.get("test_toggle_undefined").is(":visible"), false, "Toggle with undefined value");

        window.strictEqual(self.get("test_toggle_not_exist_property").is(":visible"), false, "Toggle with not exist property");

        window.start();

    };

},iris.path.datajq);