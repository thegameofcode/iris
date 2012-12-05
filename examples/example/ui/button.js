/**
 * Simple button with states and label.
 * 
 * Render a button with simple structure.
 * 
 * @PublicMethods
 * - Enable
 * - Disable
 * - Active
 * - OnClick
 * - Text
 * 
 * @Settings
 * - label -> if present, this will be the button label.
 * - click -> function to execute on onClick
 * - disabledClass -> class to apply or remove when the button is activated or deactivated. Default "disabled"
 * 
 * @examples
 * <span data-id="button" data-label="Create"></span>
 * 
 * _Button = self.InstanceUI(
 *	  	  "button"
 *		, "button.js"
 *		, {"onClick" : function(){alert("Create")}
 * });
 *
 * _Button.Enable();
 * _Button.Text("Load");
 * _Button.Click( function(){ alert("Load"); });
 * alert( _Button.Text() );
 * if ( _Button.Active() ){}
 * 
 */
iris.UI(

	function(self) {

		var
			//TEMPLATE
			 _$ = null
			,_$BtnText = null
			//VARS
			,_IsActive = true
		;
		
		self.Settings({
			 "label" : ""	//text
			,"onClick" : null //function
			,"disabledClass" : "disabled"
		});

		// LyfeCycle
		self.Create = function() {
			self.Template("example/ui/button.html");
			
			_$ = self.$Get();
			_$BtnText = self.$Get("button_text");

			_Inflate();
			_InflateEvents();
		};
		
		function _Inflate(){
			if ( self.Setting("label") ){
				_$BtnText.html( self.Setting("label") );
			}
		}
		
		function _InflateEvents(){
			_$.on("click", _OnClick );
		}
		
		function _OnClick( p_event ){
			if ( !_IsActive ) return false;
			
			if ( typeof self.Setting("onClick") == "function" ){
				self.Setting("onClick")( p_event );
			}
		}
		
		function _Enable(){
			_$.removeClass( self.Setting("disabledClass") );
			_IsActive = true;
		}

		function _Disable(){
			_$.addClass( self.Setting("disabledClass") );
			_IsActive = false;
		}
		
		function _Active(){
			return _IsActive;
		}
		
		function _Text( p_text ){
			if ( p_text != "undefined" ){
				_$BtnText.html( self.Setting("label") );
			}
			return self.Setting("label");
		}
		
		function _SetClick( f_func ){
			if ( f_func && typeof f_func == "function"){
				self.Setting("onClick", f_func);
			}
			return self.Setting("onClick");
		}
		
		/**
		 * Enables the button, removing class in self.Setting("disabledClass") and switching ON his click event. 
		 * @function
		 */
		self.Enable = _Enable;

		/**
		 * Disables the button, applying class in self.Setting("disabledClass") and switching OFF his click event.
		 * @function 
		 */
		self.Disable = _Disable;

		/**
		 * Return a boolean indicating the button state.
		 * @function 
		 */
		self.Active = _Active;
		
		/**
		 * Change the button text or retrieve its value.
		 * @function 
		 * @example
		 * buttonUi.Text("Text has changed!");
		 * alert( buttonUi.Text() ); //alerts "Text has changed!"
		 */
		self.Text = _Text;
		
		/**
		 * Sets a function to be executed when the button is clicked.
		 * @function 
		 */
		self.Click = _SetClick;
	}
);