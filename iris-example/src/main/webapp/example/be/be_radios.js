/**
 * Makes a set of buttons act as a radio buttons allowing only one of them to be pressed
 *  
 * @AppliesTo button.js
 * @Example iris.ApplyBE("ffa/ui/be_radios.js", [_ButtonOpt1, _ButtonOpt2, _ButtonOpt3]);
 * @Adds
 * - Press( state ) -> Set
 */
iris.BE(

	function( self ) {
		
		var 
			_Radios = []
		;
				
		var _DePressAll = function(){
			var i,I = _Radios.length;
			for( i = 0; i<I; i++){
				var ui = _Radios[i];
				ui.Press( false );
			}
		}
		
		var BE = function( self ){
			
			var
				 _$
				,_IsPressed = false
			;
			
			self.InitBE = function(){
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
					_$.addClass("k-state-selected");
				} else if( p_press === false) {
					_IsPressed = false;
					_$.removeClass("k-state-selected");
				}
				return _IsPressed;
			}
					
			function _OnClick( p_event ){
				if ( !self.Active() ) return false;
				
				if( _IsPressed ){
					_IsPressed = false;
					_$.removeClass("k-state-selected");
				} else {
					_DePressAll();
					_Press( true );
				}
				
				if ( typeof self.Setting("onClick") == "function" ){
					self.Setting("onClick")( p_event );
				}
			}
			
			self.Press = _Press;
		}
		
		// LyfeCycle
		self.Apply = function( p_uis ) {
			var i,I = p_uis.length;
			for( i = 0; i<I; i++){
				var ui = p_uis[i];
				_Radios[_Radios.length] = ui;
				ui.proptotype = new BE( ui );
				ui.InitBE();
			}
		};
		
	}
);