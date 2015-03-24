jQuick.ready(function () {
	var Containers = Sizzle(".masonry-container");
	for (var i = 0; i < Containers.length; i += 1) {
		var msnry = new Masonry(Containers[i], {
			columnWidth: '.masonry-grid-sizer',
			gutter: '.masonry-gutter-sizer',
			itemSelector: '.item'
		});
		Containers[i].masonry = msnry;
		imagesLoaded(Containers[i], (function (msnry) {
			return function() {
				msnry.layout();
			};
		})(msnry));

		var Toggles = Sizzle("[data-masonry-target][data-masonry-class]", Containers[i]);
		for (var j = 0; j < Toggles.length; j += 1) {
			var Target = Sizzle(Toggles[j].getAttribute('data-masonry-target'))[0];
			var Clazz = Toggles[j].getAttribute('data-masonry-class');
			jQuick.on(Toggles[j], 'click', (function (msnry, target, clazz) {
				return function() {
					jQuick.element.toggleClass(target, clazz);
					msnry.layout();
				};
			})(msnry, Target, Clazz));
		}
	}
});
