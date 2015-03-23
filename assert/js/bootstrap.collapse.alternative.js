jQuick.ready(function () {
	/* Collapses */
	(function () {
		var Collapses = Sizzle("[data-toggle='collapse'][data-target^='#']");
		for (var i = 0; i < Collapses.length; i += 1) {
			var Button = Collapses[i];
			var Target = Sizzle(Button.getAttribute('data-target'))[0];

			jQuick.on(Button, 'click', (function(Button, Target) {
				return function (evt) {
					evt.preventDefault();
					var Opened = jQuick.element.hasClass(Button, 'active');
					if (Opened) {
						jQuick.element.addClass(Target, 'collapse');
						jQuick.element.removeClass(Button, 'active');
					} else {
						jQuick.element.removeClass(Target, 'collapse');
						jQuick.element.addClass(Button, 'active');
					}
					var MasonryContainer = Target;
					while (MasonryContainer != document) {
						if (typeof MasonryContainer.masonry != "undefined") {
							MasonryContainer.masonry.layout();
							break;
						}
						MasonryContainer = MasonryContainer.parentElement;
					}
				};
			})(Button, Target));
		}
	})();
});
