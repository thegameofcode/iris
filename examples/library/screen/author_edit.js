iris.Screen(
	 function (self) {
		
		var _$Title
		,	_$Author
		;
		
		self.Create = function () {
			self.Template("library/screen/author_edit.html");
			
			_$Title = self.$Get("title")
			_$Author = self.$Get("author")
			
			self.AddScreen("details", "#authors/edit/details", "library/screen/author_details.js");
		}
		
		self.Awake = function (p_params) {
			iris.D("AWAKE AUTHOR EDIT", p_params)
			
			_$Title.val(p_params["t"])
			_$Author.val(p_params["a"])
		}
		
		self.Sleep = function () {
			iris.D("SLEEP AUTHOR EDIT")
		}
	}
);
