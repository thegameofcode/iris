iris.Screen(
	function (self) {
		
		var 
			//template elements
	 	 	   _$InputRequired
	 	     , _$InputRequired2
		 	 , _$InputNumeric
		 	 , _$ValidationMsgs
			//UIs
		 	 ,_CheckboxRequired
			//BEs
			,_Validator
		;
		
		self.Create = function () {
			
			self.Template( "example/screen/example_be_validation.html" );

			_$InputRequired = self.$Get("validate_required_name");
			_$InputRequired2 = self.$Get("validate_required_surname");
			_$InputNumeric = self.$Get("validate_numeric_age");
			_$ValidationMsgs = self.$Get("validation-msgs");
			
			_CheckboxRequired = self.InstanceUI(
				  "checkbox"
	 			, "example/ui/checkbox.js"
	 			, {
	 				 "onClick" : function(){iris.D("clicked!")}
	 				,"onCheck" : function(){iris.D("cheked!")}
	 				,"onUnCheck" : function(){iris.D("unchecked!")}
	 				,"validateError" : function(){return "You must accept conditions."}
	 			}
	 		 );

			self.InstanceUI(
				  "validate_button"
				, "example/ui/button.js"
				, {"onClick" : _Validate }
			);

 			_Validator = iris.ApplyBE( "example/be/be_validator.js", [_$InputRequired, _$InputRequired2, _$InputNumeric, _CheckboxRequired]);
 		};
		
		function _Validate(){
			_$ValidationMsgs.html("");
			
			if ( !_Validator.IsValid() ){
				var msg = "Validation errors:<BR>";
				msg += _Validator.ErrorMessages().join("<BR>");
				_$ValidationMsgs.html(msg);
				return false;
			} else {
				return true;
			} 
			
		}
		
	}
);