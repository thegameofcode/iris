/**
 * Makes a set of buttons act as a radio buttons allowing only one of them to be pressed.
 *  
 * @AppliesTo button.js
 * @Example iris.ApplyBE("ffa/ui/be_radios.js", [_ButtonOpt1, _ButtonOpt2, _ButtonOpt3]);
 * @Adds
 * - Press( state ) -> Set
 */
iris.AddOn(

	function( self ) {
		
		self.Settings({
			"name" : "default"
		});
				
		var _DePressAll = function() {
			for ( var f=0, F=self.Size(); f<F; f++ ) {
				self.Get(f).Press( false );
			}
		}
		
		self.UIAddOn = function(self) {
			
			var  _$
				,_IsPressed = false
			;
			
			function _Init () {
				_$ = self.$Get();
				_$.off("click");
				_$.on("click", function( p_event ){
					_OnClick( p_event );
				});
			}
			
			function _Press( p_press ){
				if ( p_press === true ){
					_DePressAll();
					_IsPressed = true;
					_$.addClass("selected");
				} else if( p_press === false) {
					_IsPressed = false;
					_$.removeClass("selected");
				}
				return _IsPressed;
			}
					
			function _OnClick( p_event ){
				if ( !self.Active() ) return false;
				
				if( _IsPressed ){
					_IsPressed = false;
					_$.removeClass("selected");
				} else {
					_DePressAll();
					_Press( true );
				}
				
				if ( typeof self.Setting("onClick") == "function" ){
					self.Setting("onClick")( p_event );
				}
			}
			
			self.Press = _Press;
			
			_Init();
		}
		
		// LyfeCycle
		self.Create = function() {
			iris.D("AddOn Radios Applied, name=", self.Setting("name"));
		};
		
	}
);