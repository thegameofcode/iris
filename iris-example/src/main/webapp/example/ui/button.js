/**
 * Simple button with states and icon.
 * 
 * Render a button with simple structure, with a label and icon.
 * 
 * @PublicMethods
 * - Enable
 * - Disable
 * - Active
 * - OnClick
 * - Text
 * - Icon
 * 
 * @Settings
 * - label -> if present, this will be the button label.
 * - icon -> if present, this will be the class applied to the icon <span> 
 * - click -> function to execute on onClick
 * - disabledClass -> class to apply or remove when the button is activated or deactivated. Default ffa.STATES.DISABLED
 * 
 * @examples
 * <span data-id="button" data-label="Create"></span>
 * 
 * _Button = self.InstanceUI(
 *	  	  "button"
 *		, "ffa/ui/button.js"
 *		, {"onClick" : function(){alert("Create")}
 * });
 *
 * _Button.Enable();
 * _Button.Text("Load");
 * _Button.Icon("k-icon-load");
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
			,_$BtnIco = null
			,_$Ico = null
			//VARS
			,_IsActive = true
		;
		
		self.Settings({
			 "label" : ""	//text
			,"icon" : ""	//css class
			,"onClick" : null //function
			,"disabledClass" : "disabled"
		});

		// LyfeCycle
		self.Create = function() {
			self.Template("example/ui/button.html");
			
			_$ = self.$Get();
			_$BtnText = self.$Get("button_text");
			_$BtnIco = self.$Get("button_icon");

			_Inflate();
			_InflateEvents();
		};
		
		function _Inflate(){
			if ( self.Setting("label") ){
				_$BtnText.html( self.Setting("label") );
			}
			
			if ( self.Setting("icon") ){
				_$BtnIco.addClass( self.Setting("icon") );
			} else {
				_$BtnIco.hide();
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
		
		function _Icon( p_iconClass ){
			if( p_iconClass == "" || p_iconClass == "undefined"){
				self.Setting("icon", "" );
				_$BtnIco.hide();
			} else {
				self.Setting("icon", p_iconClass );
				_$BtnIco.show();
				_$BtnIco.removeClass();
				_$BtnIco.addClass( ffa.CSS.ICON + " " + self.Setting("icon") );
			}
			return self.Setting("icon");
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
		 * Change the button icon or retrieve its value.
		 * @function 
		 * @example
		 * buttonUi.Icon("k-icon-wait");
		 * alert( buttonUi.Icon() ); //alerts "k-icon-wait"
		 */
		self.Icon = _Icon;
		
		/**
		 * Sets a function to be executed when the button is clicked.
		 * @function 
		 */
		self.Click = _SetClick;
	}
);