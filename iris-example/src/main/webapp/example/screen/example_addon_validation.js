iris.Screen(
	function (self) {
		
		var 
			//template elements
	 	 	   _$InputRequired
	 	     , _$InputRequired2
		 	 , _$InputNumeric
		 	 , _$ValidationMsgs
			//AddOns
			,_Validator
		;
		
		self.Create = function () {
			
			self.Template( "example/screen/example_addon_validation.html" );

			_$InputRequired = self.$Get("validate_required_name");
			_$InputRequired2 = self.$Get("validate_required_surname");
			_$InputNumeric = self.$Get("validate_numeric_age");
			_$ValidationMsgs = self.$Get("validation-msgs");
			
			self.InstanceUI(
				  "validate_button"
				, "example/ui/button.js"
				, {"onClick" : _Validate }
			);

 			_Validator = iris.ApplyAddOn( "example/addon/validator.js", [_$InputRequired, _$InputRequired2, _$InputNumeric]);
 		};
		
		function _Validate(){
			_$ValidationMsgs.html("");
			
			if ( !_Validator.IsValid() ){
				var msg = "Validation errors:<BR>";
				msg += _Validator.ErrorMessages().join("<BR>");
				_$ValidationMsgs.html(msg);
				return false;
			} else {
				_$ValidationMsgs.html("<span style='color:green;'>Form OK!</span>");
				return true;
			} 
			
		}
		
	}
);