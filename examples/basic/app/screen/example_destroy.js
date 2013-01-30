iris.screen(function(self) {
	var uiList = []
	,	inputIdx
	;
	
	self.create = function() {
		self.tmpl(iris.path.example_destroy_tmpl);

		self.get("btncreateUI").click(createUI);
		self.get("btn_destroy").click(deleteUI);

		inputIdx = self.get("idx");
		
	}

	function createUI() {
		uiList.push(
			self.ui("container", iris.path.ui_example)
		);
	}

	function deleteUI() {
		var idx = inputIdx.val();
		self.destroyUI(uiList[idx]);
		uiList.splice(idx, 1);
	}
}, iris.path.example_destroy);