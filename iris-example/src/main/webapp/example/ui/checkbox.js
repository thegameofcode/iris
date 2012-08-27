/**
 * Create a simple checkbox with custom image for check
 * 
 * @PublicMethods
 * - Check
 * - Toggle
 * 
 * 
 * @Settings
 * - label -> if present, this will be the checkbox label.
 * - iconOn -> css class thats render the icon when the state is checked.
 * - iconOff -> css class thats render the icon when the state is un-checked.
 * - onClick -> triggers when the checkbox is clicked
 * - onCheck -> triggers when the checkbox is checked
 * - onUnCheck -> triggers when the checkbox is unchecked
 * - validate -> function that says if the UI validates
 * - validateError -> function that returns a error description for validations
 * 
 * @example
 * <div data-id="checkbox" data-label="Accept conditions?"></div>
 * 
 * _UICheck = self.InstanceUI(
 *	  "checkbox"
 *	, "ffa/ui/checkbox.js"
 *	, {
 *		 "onClick" : function(){alert("clicked!")}
 *		,"onCheck" : function(){alert("cheked!")}
 *		,"onUnCheck" : function(){alert("unchecked!")}
 *	}
 * );
 *	 		 
 * _UICheck.Check(); //return true if its checked or false if its not.
 * _UICheck.Check( false ); //force the checkbox to uncheck
 */
iris.UI(

	function(self) {

		var
			 _$ = null
			,_$Label = null
			,_$Icon = null
			,_IsChecked = false
		;
		
		self.Settings({
			 "label" : ""	//text
			,"iconOn" : "checkbox-on"	 //css class
			,"iconOff" : "checkbox-off" //css class
			,"onClick" : null
			,"onCheck" : null
			,"onUnCheck" : null
			,"validate" : null
			,"validateError" : null
		});

		// LyfeCycle
		self.Create = function() {
			self.Template( "example/ui/checkbox.html" );
			
			_$ = self.$Get();
			_$Label = self.$Get("check_label");
			_$Icon = self.$Get("check_icon");

			_Inflate();
			_InflateEvents();
		};
		
		function _Inflate(){
			if ( self.Setting("label") ){
				_$Label.html( self.Setting("label") );
			}
			
			if ( self.Setting("iconOff") ){
				_$Icon.addClass( self.Setting("iconOff") );
			}
		}

		function _InflateEvents(){
			_$.on("click", _OnClick );
		}
		
		function _DoCheck( p_event ){
			_$Icon.addClass( self.Setting("iconOn") );
			_$Icon.removeClass( self.Setting("iconOff") );
			_IsChecked = true;
			
			if ( typeof self.Setting("onCheck") == "function" ){
				self.Setting("onCheck")( p_event );
			}
		}
		
		function _DoUnCheck( p_event ){
			_$Icon.removeClass( self.Setting("iconOn") );
			_$Icon.addClass( self.Setting("iconOff") );
			_IsChecked = false;

			if ( typeof self.Setting("onUnCheck") == "function" ){
				self.Setting("onUnCheck")( p_event );
			}
		}
		
		function _Toggle( p_event ){
			if ( _IsChecked ){
				_DoUnCheck( p_event );
			} else {
				_DoCheck( p_event );
			}
		}
		
		function _OnClick( p_event ){
			_Toggle( p_event );
			if ( typeof self.Setting("onClick") == "function" ){
				self.Setting("onClick")( p_event );
			}
		}
		
		function _Check( p_check ){
			if( p_check === true ){
				_DoCheck();
			} else if( p_check === false ){
				_DoUnCheck();
			}
			return _IsChecked;
		}
		
		function _Validate(){
			if ( self.Setting("validate") ){
				return self.Setting("validate")();
			} else {
				return _IsChecked;
			}
		}

		function _ValidateError(){
			if ( self.Setting("validateError") ){
				return self.Setting("validateError")();
			} else {
				return "";
			}
		}
		
		/**
		 * Force check.
		 * Its always return the final state of the checkbox. This function can be used only for retrieve the checkbox state.
		 * 
		 * @function
		 * @param p_check {boolean} indicate the new checkbox state
		 */
		self.Check  = _Check;
		
		/**
		 * Change the checkbox state
		 * @function
		 */
		self.Toggle = _Toggle;
		
		/**
		 * Validate method. Can be overwrite with settings to adjust to your needs
		 */
		self.Validate = _Validate;
		
		/**
		 * Validate error method. Can be overwrite with settings to adjust to your needs. 
		 * Returns a message for invalid validation
		 */
		self.ValidateError = _ValidateError;
	}
);