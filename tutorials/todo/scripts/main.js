(function() {

 // Launch Impress (slides)
 impress().init();

 // Setup behavior for code movies
 _([
  'index',
  'init',
  'welcome_template',
  'welcome_presenter'
  ]).forEach(function(step) {

  var movie = CodeMirror.movie(step + '-movie'),
  playBtn = document.getElementById(step + '-button'),
  execBtn = document.getElementById(step + '-exec');

  // Play button behavior
  if (playBtn) {
   playBtn.addEventListener('click', function() {
    if (movie.state() === 'play') {
     movie.pause();
     this.innerHTML = 'Play';
    } else {
     movie.play();
     this.innerHTML = 'Pause';
    }
   });
   movie.on('stop', function() {
    playBtn.innerHTML = 'Play';
   });
  }


  // Execute code from a Code Mirror editor
  if (execBtn) {
   execBtn.addEventListener('click', function() {
    eval(movie._editor.getValue());
   });
  }
   /*
  var textArea = document.getElementById(step + '-movie');
  
     
  textArea.addEventListener("keydown", function ( event ) {
   if ( event.keyCode === 9 || ( event.keyCode >= 33 && event.keyCode <= 34 ) || (event.keyCode >= 37 && event.keyCode <= 40) ) {
    if (!event)
     event = window.event;

    //IE9 & Other Browsers
    if (event.stopPropagation) {
     event.stopPropagation();
    }
    //IE8 and Lower
    else {
     event.cancelBubble = true;
    }
   }
  }, false);
  
  textArea.addEventListener("keyup", function ( event ) {
   if ( event.keyCode === 9 || ( event.keyCode >= 33 && event.keyCode <= 34 ) || (event.keyCode >= 37 && event.keyCode <= 40) ) {
    
    if (!event)
     event = window.event;

    //IE9 & Other Browsers
    if (event.stopPropagation) {
     event.stopPropagation();
    }
    //IE8 and Lower
    else {
     event.cancelBubble = true;
    }
   }
  }, false);
*/
 });

})();
