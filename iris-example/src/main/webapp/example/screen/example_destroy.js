iris.Screen(function(self) {
	var _UIs = []
	,	_$InputIdx
	;
	
	self.Create = function() {
		self.Template("example/screen/example_destroy.html");

		self.$Get("btn_create").click(_Create);
		self.$Get("btn_destroy").click(_DestroyUI);

		_$InputIdx = self.$Get("idx");
		
	}

	function _Create() {
		_UIs.push(
			self.InstanceUI("container", "example/ui/example.js")
		);
	}

	function _DestroyUI() {
		var idx = _$InputIdx.val();
		self.DestroyUI(_UIs[idx]);
		_UIs.splice(idx, 1);
	}
});