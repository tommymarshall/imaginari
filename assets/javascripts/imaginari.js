var Imaginari = (function (){
	var breakpoints = [2400, 1800, 1600, 1400, 980, 768, 480]; // High to low
	var currentBreakpoint = -1;
	var screenWidth;
	var pixelRatio = ( 'devicePixelRatio' in window ? ',' + devicePixelRatio : ',1' );

	init = function () {
		this.binds();
		this.monitor(); // Initial page load
	},

	binds = function() {
		window.addEventListener( 'resize', this.monitor, false );
	},

	monitor = function() {
		this.getScreenWidth();

		if ( this.screenWidth !== this.currentBreakpoint ) {
			this.currentBreakpoint = this.screenWidth;

			this.setCookie();
			this.updateImages();
		}
	},

	updateImages = function() {
		var images = document.images;

		for ( var i = 0; i < images.length; i++ ) {
			if ( images[i].src.indexOf( 'assets' ) === -1 ) {
				images[i].src = images[i].src.substring( 0, ( images[i].src.indexOf('?') > 0 ? images[i].src.indexOf( '?' ) : images[i].src.length ) ) + '?' + this.screenWidth;
			}
		}
	},

	getScreenWidth = function() {
		for ( var i = 0; i < breakpoints.length; i++ ) {
			if ( window.innerWidth < breakpoints[i] ) {
				this.screenWidth = breakpoints[i];
			}
		}
	},

	setCookie = function() {
		document.cookie = 'resolution=' + this.screenWidth + pixelRatio +'; path=/';
	};

	return this.init();
}());
