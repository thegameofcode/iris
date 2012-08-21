iris.UI(
	function (self) {

		self.Create = function () {
			self.TemplateMode(self.TEMPLATE_APPEND);
			self.Template("example/ui/example.html");
			
			self.$Get("label").text("Example " + self.Setting("count"))
		};

	}
);