
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Help Screen Created");
            self.tmpl("test/bad_practices/help.html");
        };

    },
    "test/bad_practices/help.js");