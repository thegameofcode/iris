iris.screen(
	 function (self) {
		
		var _$Title
		,	_$Author
		;
		
		self.create = function () {
			self.tmpl("screen/author_edit.html");
			
			_$Title = self.get("title")
			_$Author = self.get("author")
			
			self.screens("details", [["#authors/edit/details", "screen/author_details.js"]]);
		}
		
		self.awake = function (p_params) {
			iris.log("AWAKE AUTHOR EDIT", p_params)
			
			_$Title.val(p_params["t"])
			_$Author.val(p_params["a"])
		}
		
		self.sleep = function () {
			iris.log("SLEEP AUTHOR EDIT")
		}
	}
);
