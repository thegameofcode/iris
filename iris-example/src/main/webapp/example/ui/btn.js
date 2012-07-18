/**
 * <div data-id='ui_btn_example' data-label='@@EXAMPLE@@'></div>
 */
iris.UI(
	function (self) {
		
		var _$Label = null
		;
		
		self.Settings({
			 "label" : "default-label"
			,"onClick" : function () {alert("default-click")}
		});
		
		self.Create = function () {
			self.Template("example/ui/btn.html");
			
			_$Label = self.$Get( "label" );
			self.Click( self.Setting("onClick") );
			self.Label( self.Setting("label") );
		};
		
		self.Label = function (p_label) {
			if ( p_label !== undefined ) {
				self.Setting("label", p_label);
				_$Label.text( p_label );
			}
			else {
				return self.Setting("label");
			}
		};
		
		self.Click = function (f_onClick) {
			if ( f_onClick !== undefined ) {
				self.$Get().unbind("click")
					.bind("click", f_onClick)
					.css("cursor","pointer");
			}
			else {
				self.$Get().click();
			}
		}; 
		
	}
);