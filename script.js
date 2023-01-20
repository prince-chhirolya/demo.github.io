skrollr.init({
    forceHeight: false
});

(function(document, window) {
	'use strict';

	var DEFAULT_DURATION = 500;
	var DEFAULT_EASING = 'sqrt';

	var MENU_TOP_ATTR = 'data-menu-top';
	var MENU_OFFSET_ATTR = 'data-menu-offset';

	var skrollr = window.skrollr;
	var history = window.history;
	var supportsHistory = !!history.pushState;

	var findParentLink = function(element) {
		//Yay, it's a link!
		if(element.tagName === 'A') {
			return element;
		}

		if(element === document) {
			return false;
		}

		return findParentLink(element.parentNode);
	};

	var handleClick = function(e) {

		if((e.which || e.button) !== 1) {
			return;
		}

		var link = findParentLink(e.target);

		if(!link) {
			return;
		}

		if(handleLink(link)) {
			e.preventDefault();
		}
	};

	var handleLink = function(link, fake) {
	
		var href = link.getAttribute('href');

		if(!/^#/.test(href)) {
			return false;
		}

		var targetTop;

		var menuTop = link.getAttribute(MENU_TOP_ATTR);

		if(menuTop !== null) {
			targetTop = +menuTop;
		} else {
			var scrollTarget = document.getElementById(href.substr(1));

			if(!scrollTarget) {
				return false;
			}

			targetTop = _skrollrInstance.relativeToAbsolute(scrollTarget, 'top', 'top');

			var menuOffset = scrollTarget.getAttribute(MENU_OFFSET_ATTR);

			if(menuOffset !== null) {
				targetTop += +menuOffset;
			}
		}

		if(supportsHistory && !fake) {
			history.pushState({top: targetTop}, '', href);
		}

		if(_animate && !fake) {
			_skrollrInstance.animateTo(targetTop, {
				duration: _duration(_skrollrInstance.getScrollTop(), targetTop),
				easing: _easing
			});
		} else {
			defer(function() {
				_skrollrInstance.setScrollTop(targetTop);
			});
		}

		return true;
	};

	var defer = function(fn) {
		window.setTimeout(fn, 1);
	};

	skrollr.menu = {};
	skrollr.menu.init = function(skrollrInstance, options) {
		_skrollrInstance = skrollrInstance;

		options = options || {};

		_easing = options.easing || DEFAULT_EASING;
		_animate = options.animate !== false;
		_duration = options.duration || DEFAULT_DURATION;

		if(typeof _duration === 'number') {
			_duration = (function(duration) {
				return function() {
					return duration;
				};
			}(_duration));
		}
		skrollr.addEvent(document, 'click', handleClick);

		if(supportsHistory) {
			window.addEventListener('popstate', function(e) {
				var state = e.state || {};
				var top = state.top || 0;

				defer(function() {
					_skrollrInstance.setScrollTop(top);
				});
			}, false);
		}
	};

	var _skrollrInstance;

	var _easing;
	var _duration;
	var _animate;

	defer(function() {
		if(window.location.hash) {
			window.scrollTo(0, 0);

			if(document.querySelector) {
				var link = document.querySelector('a[href="' + window.location.hash + '"]');

				if(link) {
					handleLink(link, true);
				}
			}
		}
	});
}(document, window));

var s = skrollr.init(/*other stuff*/);

//The options (second parameter) are all optional. The values shown are the default values.
skrollr.menu.init(s, {
    //skrollr will smoothly animate to the new position using `animateTo`.
    animate: true,

    //The easing function to use.
    easing: 'sqrt',

    //How long the animation should take in ms.
    duration: function(currentTop, targetTop) {
    
        return 1000;

        //But you could calculate a value based on the current scroll position (`currentTop`) and the target scroll position (`targetTop`).
        //return Math.abs(currentTop - targetTop) * 10;
    },
});

$(".icon-bookmark").click(function(){
    $("#placemark").addClass("placemarked");
    $(".icon-bookmark").addClass("pressed");
});

/* Please ❤ this if you like it! */


(function($) { "use strict";
		
	//Page cursors

    document.getElementsByTagName("body")[0].addEventListener("mousemove", function(n) {
        t.style.left = n.clientX + "px", 
		t.style.top = n.clientY + "px", 
		e.style.left = n.clientX + "px", 
		e.style.top = n.clientY + "px", 
		i.style.left = n.clientX + "px", 
		i.style.top = n.clientY + "px"
    });
    var t = document.getElementById("cursor"),
        e = document.getElementById("cursor2"),
        i = document.getElementById("cursor3");
    function n(t) {
        e.classList.add("hover"), i.classList.add("hover")
    }
    function s(t) {
        e.classList.remove("hover"), i.classList.remove("hover")
    }
    s();
    for (var r = document.querySelectorAll(".hover-target"), a = r.length - 1; a >= 0; a--) {
        o(r[a])
    }
    function o(t) {
        t.addEventListener("mouseover", n), t.addEventListener("mouseout", s)
    }
	
	//Navigation

	var app = function () {
		var body = undefined;
		var menu = undefined;
		var menuItems = undefined;
		var init = function init() {
			body = document.querySelector('body');
			menu = document.querySelector('.menu-icon');
			menuItems = document.querySelectorAll('.nav__list-item');
			applyListeners();
		};
		var applyListeners = function applyListeners() {
			menu.addEventListener('click', function () {
				return toggleClass(body, 'nav-active');
			});
		};
		var toggleClass = function toggleClass(element, stringClass) {
			if (element.classList.contains(stringClass)) element.classList.remove(stringClass);else element.classList.add(stringClass);
		};
		init();
	}();

	
	//Switch light/dark
	
	$("#switch").on('click', function () {
		if ($("body").hasClass("light")) {
			$("body").removeClass("light");
			$("#switch").removeClass("switched");
		}
		else {
			$("body").addClass("light");
			$("#switch").addClass("switched");
		}
	});          
              
})(jQuery);