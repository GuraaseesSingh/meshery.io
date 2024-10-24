/*
 * Stellarnav.js 2.6.0
 * Responsive, lightweight, multi-level dropdown menu.
 * Copyright (c) 2018 Vinny Moreira - http://vinnymoreira.com
 * Released under the MIT license
 */
(function($) {
	$.fn.stellarNav = function(options, width, breakpoint) {

		var $nav, $width, $breakpoint, $parentItems;
		nav = $(this);
		width = $(window).width();

		// default settings
		var settings = $.extend({
			theme: 'plain', // adds default color to nav. (light, dark)
			breakpoint: 768, // number in pixels to determine when the nav should turn mobile friendly
			menuLabel: '', // label for the mobile nav
			sticky: false, // makes nav sticky on scroll (desktop only)
			position: 'static', // 'static', 'top', 'left', 'right' - when set to 'top', this forces the mobile nav to be placed absolutely on the very top of page
			openingSpeed: 80, // how fast the dropdown should open in milliseconds
			closingDelay: 80, // controls how long the dropdowns stay open for in milliseconds
			showArrows: true, // shows dropdown arrows next to the items that have sub menus
			phoneBtn: '', // adds a click-to-call phone link to the top of menu - i.e.: "18009084500"
			phoneLabel: 'Call Us', // label for the phone button
			locationBtn: '', // adds a location link to the top of menu - i.e.: "/location/", "http://site.com/contact-us/"
			locationLabel: 'Location', // label for the location button
			closeBtn: false, // adds a close button to the end of nav
			closeLabel: 'Close', // label for the close button
			mobileMode: false,
			scrollbarFix: false // fixes horizontal scrollbar issue on very long navs
		}, options);

		return this.each(function() {

			// defines black or white themes
			if (settings.theme == 'light' || settings.theme == 'dark') {
				nav.addClass(settings.theme);
			}

			if (settings.breakpoint) {
				breakpoint = settings.breakpoint;
			}

			if (settings.menuLabel) {
				menuLabel = settings.menuLabel;
			} else {
				menuLabel = '';
			}

			if (settings.phoneLabel) {
				phoneLabel = settings.phoneLabel;
			} else {
				phoneLabel = '';
			}

			if (settings.locationLabel) {
				locationLabel = settings.locationLabel;
			} else {
				locationLabel = '';
			}

			if (settings.closeLabel) {
				closeLabel = settings.closeLabel;
			} else {
				closeLabel = '';
			}

			// css classes for main menu mobile buttons
			if (settings.phoneBtn && settings.locationBtn) {
				var cssClass = 'third';
			} else if (settings.phoneBtn || settings.locationBtn) {
				var cssClass = 'half';
			} else {
				var cssClass = 'full';
			}

			// adds the toggle button to open and close nav
			if (settings.position == 'right' || settings.position == 'left') {
				nav.prepend('<a href="#" class="menu-toggle"><span class="bars"><span></span><span></span><span></span></span></a>');
			} else {
				nav.prepend('<a href="#" class="menu-toggle ' + cssClass + '"><span class="bars"><span></span><span></span><span></span></span></a>');
			}

			// adds a click-to-call link
			if (settings.phoneBtn && !(settings.position == 'right' || settings.position == 'left')) {
				var btn = '<a href="tel:' + settings.phoneBtn + '" class="call-btn-mobile ' + cssClass + '"><svg id="icon-phone"></svg> <span>' + phoneLabel + '</span></a>';
				nav.find('a.menu-toggle').after(btn);
			}

			// adds a location page link to the beginning of nav
			if (settings.locationBtn && !(settings.position == 'right' || settings.position == 'left')) {
				var btn = '<a href="' + settings.locationBtn + '" class="location-btn-mobile ' + cssClass + '" target="_blank"><svg id="icon-location"></svg> <span>' + locationLabel + '</span></a>';
				nav.find('a.menu-toggle').after(btn);
			}

			// Makes nav sticky on scroll
			if (settings.sticky) {
				navPos = nav.offset().top;
				if (width >= breakpoint) {
					$(window).on('scroll', function() {
						if ($(window).scrollTop() > navPos) {
							nav.addClass('fixed');
						} else {
							nav.removeClass('fixed');
						}
					});
				}
			}

			if (settings.position == 'top') {
				nav.addClass('top');
			}

			if (settings.position == 'left' || settings.position == 'right') {
				var closeBtn = '<a href="#" class="close-menu ' + cssClass + '"><span class="icon-close"></span>' + closeLabel + '</a>';
				var phoneBtn = '<a href="tel:' + settings.phoneBtn + '" class="call-btn-mobile ' + cssClass + '"><svg id="icon-phone"></svg></a>';
				var locationBtn = '<a href="' + settings.locationBtn + '" class="location-btn-mobile ' + cssClass + '" target="_blank"><svg id="icon-location"></svg></i></a>';

				nav.find('ul:first').prepend(closeBtn);

				if (settings.locationBtn) {
					nav.find('ul:first').prepend(locationBtn);
				}
				if (settings.phoneBtn) {
					nav.find('ul:first').prepend(phoneBtn);
				}
			}

			if (settings.position == 'right') {
				nav.addClass('right');
			}

			if (settings.position == 'left') {
				nav.addClass('left');
			}

			if (!settings.showArrows) {
				nav.addClass('hide-arrows');
			}

			if (settings.closeBtn && !(settings.position == 'right' || settings.position == 'left')) {
				// adds a link to end of nav to close it
				nav.find('ul:first').append('<li><a href="#" class="close-menu"><span class="icon-close"></span> ' + closeLabel + '</a></li>');
			}

			if (settings.scrollbarFix) {
				$('body').addClass('stellarnav-noscroll-x');
			}

			// svg graphics
			// phone icon
			var phoneIcon = document.getElementById('icon-phone'); // Gets phone icon element
			if (phoneIcon) {
				phoneIcon.setAttribute('viewBox', '0 0 480 480');
				var newPhoneIcon = document.createElementNS("http://www.w3.org/2000/svg", 'path'); // Create a path in SVG's namespace
				newPhoneIcon.setAttribute('d', 'M340.273,275.083l-53.755-53.761c-10.707-10.664-28.438-10.34-39.518,0.744l-27.082,27.076 c-1.711-0.943-3.482-1.928-5.344-2.973c-17.102-9.476-40.509-22.464-65.14-47.113c-24.704-24.701-37.704-48.144-47.209-65.257     c-1.003-1.813-1.964-3.561-2.913-5.221l18.176-18.149l8.936-8.947c11.097-11.1,11.403-28.826,0.721-39.521L73.39,8.194 C62.708-2.486,44.969-2.162,33.872,8.938l-15.15,15.237l0.414,0.411c-5.08,6.482-9.325,13.958-12.484,22.02     C3.74,54.28,1.927,61.603,1.098,68.941C-6,127.785,20.89,181.564,93.866,254.541c100.875,100.868,182.167,93.248,185.674,92.876 c7.638-0.913,14.958-2.738,22.397-5.627c7.992-3.122,15.463-7.361,21.941-12.43l0.331,0.294l15.348-15.029     C350.631,303.527,350.95,285.795,340.273,275.083z'); // Sets path for phone icon
				phoneIcon.appendChild(newPhoneIcon); // Appends path to phone icon
			}

			// location icon
			var locationIcon = document.getElementById('icon-location'); // Gets location icon element
			if (locationIcon) {
				locationIcon.setAttribute('viewBox', '0 0 448 512');
				var newLocationIcon = document.createElementNS("http://www.w3.org/2000/svg", 'path'); // Create a path in SVG's namespace
				newLocationIcon.setAttribute('d', 'M224.1 0c-70.69 0-128.1 57.31-128.1 128 0 36.08 15.47 69.15 39.9 93.56l88.38 88.37c5.46 5.46 14.34 5.46 19.8 0l88.38-88.37C336.63 197.15 352.1 164.08 352.1 128 352.1 57.31 294.7 0 224.1 0zM224.1 192c-35.29 0-64.1-28.71-64.1-64 0-35.29 28.81-64 64.1-64s64.1 28.71 64.1 64c0 35.29-28.81 64-64.1 64z'); // Sets path for location icon
				locationIcon.appendChild(newLocationIcon); // Appends path to location icon
			}

			// click to toggle mobile menu
			$(document).on('click', '.menu-toggle', function(e) {
				e.preventDefault();
				nav.toggleClass('open');
			});

			// click to close mobile menu
			$(document).on('click', '.close-menu', function(e) {
				e.preventDefault();
				nav.removeClass('open');
			});

			// click to open sub-menu on mobile
			$(document).on('click', 'li a', function(e) {
				if ($(this).siblings('ul').length) {
					e.preventDefault();
					$(this).siblings('ul').stop(true, true).slideToggle(settings.openingSpeed);
				}
			});

			// sets up dropdown on hover for desktop
			$(nav).find('li').hover(function() {
				$(this).children('ul').stop(true, true).slideDown(settings.openingSpeed);
			}, function() {
				$(this).children('ul').stop(true, true).slideUp(settings.closingDelay);
			});

			// update breakpoint
			$(window).resize(function() {
				width = $(window).width();
				if (width < breakpoint) {
					nav.removeClass('open');
				}
			});
		});
	};
})(jQuery);
