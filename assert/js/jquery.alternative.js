if (typeof jQuick == "undefined")
window.jQuick = (function (window, document) {
	return (function () {
		var jQuick = function () {
			this.readyCallbacks = [];
			this.isReady = false;

			(function bindReady(jQuick) {
				if ( jQuick.isReady ) return;

				// Mozilla, Opera and webkit nightlies currently support this event
				if ( document.addEventListener ) {
					// Use the handy event callback
					document.addEventListener( "DOMContentLoaded", function(){
						document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
						jQuick.ready();
					}, false );

					// If IE event model is used
				} else if ( document.attachEvent ) {
					// ensure firing before onload,
					// maybe late but safe also for iframes
					document.attachEvent("onreadystatechange", function(){
						if ( document.readyState === "complete" ) {
							document.detachEvent( "onreadystatechange", arguments.callee );
							jQuick.ready();
						}
					});

					// If IE and not an iframe
					// continually check to see if the document is ready
					if ( document.documentElement.doScroll && window == window.top ) (function(){
						if ( jQuick.isReady ) return;

						try {
							// If IE is used, use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							document.documentElement.doScroll("left");
						} catch( error ) {
							setTimeout( arguments.callee, 0 );
							return;
						}

						// and execute any waiting functions
						jQuick.ready();
					})();
				}

				// A fallback to window.onload, that will always work
				window.onload = function () { jQuick.ready(); };
			})(this);
		};

		jQuick.prototype.ready = function (callback) {
			if (typeof callback == "undefined" && !jQuick.isReady) {
				jQuick.isReady = true;
				for (var i = 0; i < this.readyCallbacks.length; i += 1)
					this.readyCallbacks[i]();
			} else if (this.isReady)
				callback();
			else
				this.readyCallbacks.push(callback);
		};

		jQuick.prototype.on = function (elem, evt, func) {
			/* W3C */
			if (elem.addEventListener)
				elem.addEventListener(evt, func, false);
			/* IE8- */
			else if (elem.attachEvent)
				elem.attachEvent("on" + evt, func);
			/* Do nothing, I guess. */
			else
				elem[evt] = func;
		};

		jQuick.prototype.element = {
			hasClass: function (elem, clazz) {
				var className = " " + elem.getAttribute('class') + " ";
				return className.replace(/[\n\t]/g, " ").indexOf(" " + clazz + " ") > -1;
			},
			toggleClass: function (elem, clazz) {
				if (this.hasClass(elem, clazz))
					this.removeClass(elem, clazz);
				else
					this.addClass(elem, clazz);
			},
			removeClass: function (elem, clazz) {
				var className = " " + elem.getAttribute('class') + " ";
				var targetClass = " " + clazz + " ";
				var pos = className.replace(/[\n\t]/g, " ").indexOf(targetClass);
				if (pos > -1) // has the class before
					className = className.substring(0, pos) + " " + className.substring(pos + targetClass.length);
				elem.setAttribute('class', className.trim());
			},
		 	addClass: function (elem, clazz) {
				var className = " " + elem.getAttribute('class') + " ";
				var targetClass = " " + clazz + " ";
				var pos = className.replace(/[\n\t]/g, " ").indexOf(targetClass);
				if (pos > -1) // has the class before
					; // do nothing
				else
					className = className + clazz;
				elem.setAttribute('class', className.trim());
			}
		};

		return new jQuick();
	})();
})(window, document);
