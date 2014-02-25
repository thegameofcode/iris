iris.screen(function (self) {

	var start, countLabel;

	self.create = function() {
		
		self.tmpl(iris.path.screen.welcome.html);

		self.get('make_uis').click(function () {

			// for (var i = 0, len = 10; i < len; i++) {
			// 	console.log('*******************');
			// 	console.log('**   ROUND ' + i + ' **');
			// 	console.log('*******************');

				createUIs(iris.path.ui.basic.js);
				addUIListeners();
				removeUIs();
			// }
			
		});
	};

	function startCount (label) {
		start = new Date().getTime();
		countLabel = label;
	}

	function endCount () {
		var time = new Date().getTime() - start;
		start = 0;
		console.log(countLabel, ' in ', time, ' millis');
	}

	function createUIs (path) {
		startCount("Create UIs");

		var ui;
		for (var i = 0, len = self.get('num_uis').val(); i < len; i++) {
			self.ui('container', path, {}, self.APPEND);
		}

		endCount();
	}

	function addUIListeners () {
		startCount("Add UI listeners");

		for (var i = 0, len = self.uis.length; i < len; i++) {
			for (var j = 0; j < len; j++) {

				if ( i == j ) continue;

				for (var k = 0; k < 2; k++) {
					self.uis[i].listen(self.uis[j], 'test-event-' + k, self.uis[i].listener);
					//self.uis[j].on('test-event-' + k, self.uis[i].listener);
				}
			}
		}

		endCount();
	}

	function removeUIs () {
		startCount("Random destroy UIs");

		var randomIdx;
		while ( self.uis.length > 0 ) {
			randomIdx = Math.floor(Math.random() * self.uis.length);
			self.destroyUI(self.uis[randomIdx]);
		}
		
		endCount();
	}

},iris.path.screen.welcome.js);


/*

A cada UI le escuchan <num_uis> - 1 UIs diferentes
Cada UI tiene <num_uis> - 1 * <event_names> listeners
No se produce memory leaks

***

<num_uis> = 100
<event_names> = 2

Create UIs  in  15  millis
Add UI listeners  in  60  millis
Random destroy UIs  in  47  millis 

***

<num_uis> = 200
<event_names> = 2

Create UIs  in  37  millis
Add UI listeners  in  340  millis
Random destroy UIs  in  294  millis 

***

<num_uis> = 300
<event_names> = 2

Create UIs  in  56  millis
Add UI listeners  in  908  millis
Random destroy UIs  in  921  millis

***

<num_uis> = 400
<event_names> = 2

Create UIs  in  68  millis
Add UI listeners  in  1837  millis
Random destroy UIs  in  2263  millis 

***

<num_uis> = 500
<event_names> = 2

Create UIs  in  97  millis
Add UI listeners  in  3711  millis
Random destroy UIs  in  3725  millis 

***

<num_uis> = 1000
<event_names> = 2

Create UIs  in  148  millis
Add UI listeners  in  25344  millis
Random destroy UIs  in  28719  millis


***************
***************
***************
***************


A cada UI le escuchan <num_uis> - 1 UIs diferentes
Cada UI tiene <num_uis> - 1 * <event_names> listeners
No se produce memory leaks


<num_uis> = 500
<event_names> = 2

Create UIs  in  76  millis
Add UI listeners  in  1242  millis
Random destroy UIs  in  10  millis 

<num_uis> = 1000
<event_names> = 2

Create UIs  in  129  millis
Add UI listeners  in  7928  millis
Random destroy UIs  in  20  millis 

*/
