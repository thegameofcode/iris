iris.screen(function(self) {
	self.create = function() {
		self.tmpl(iris.path.welcome_tmpl);

		self.screens("screens", 
			[
				[ "destroy", iris.path.example_destroy],
				[ "destroy-all", iris.path.example_destroy_all],
				[ "instance", iris.path.example_instance],
				[ "list", iris.path.example_list],
				[ "template-parameters", iris.path.example_template_params],
				[ "screen-parameters", iris.path.example_screen_params],
				[ "nested-uis", iris.path.example_nested_uis]
			]
		);

		if ( !document.location.hash ) {
			iris.navigate("#/instance");
		}
	}
}, iris.path.welcome);