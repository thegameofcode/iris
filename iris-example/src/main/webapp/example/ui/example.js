iris.UI(
	function (self) {

		self.Create = function () {
			self.TemplateMode(self.TEMPLATE_APPEND);
			self.Template("example/ui/example.html");
			
			self.$Get("label").text("Example " + self.Setting("count"));
			
			iris.ApplyBE("example/be/be_radios.js", [self.$Get("check1"), self.$Get("check2"), self.$Get("check3"), self.$Get("check4")]);
			
		};

	}
);