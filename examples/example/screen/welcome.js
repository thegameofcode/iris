iris.screen(function(self) {
	self.create = function() {
		self.tmpl("screen/welcome.html");

		self.screens("screens", 
			[
				[ "#destroy", "screen/example_destroy.js"],
				[ "#destroy-all", "screen/example_destroy_all.js"],
				[ "#instance", "screen/example_instance.js"],
				[ "#list", "screen/example_list.js"],
				[ "#addon-radios", "screen/example_addon_radios.js"],
				[ "#addon-validation", "screen/example_addon_validation.js"],
				[ "#template-parameters", "screen/example_template_params.js"],
				[ "#screen-parameters", "screen/example_screen_params.js"],
				[ "#nested-uis", "screen/example_nested_uis.js"]
			]
		);

		if ( !document.location.hash ) {
			iris.navigate("#instance");
		}
	}
});