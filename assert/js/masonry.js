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
	}
});
