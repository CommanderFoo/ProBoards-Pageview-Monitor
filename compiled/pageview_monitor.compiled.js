"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pageview_Monitor = function () {
	function Pageview_Monitor() {
		_classCallCheck(this, Pageview_Monitor);
	}

	_createClass(Pageview_Monitor, null, [{
		key: "init",
		value: function init() {
			this.PLUGIN_ID = "pd_pageview_monitor";
			this.LOCAL_KEY = "pd_pageview_monitor";
			this.SETTINGS = {};

			this.setup();

			$(this.ready.bind(this));
		}
	}, {
		key: "ready",
		value: function ready() {
			var now = +new Date();
			var add = parseInt(this.SETTINGS.time, 10) * 1000;

			if (!localStorage.getItem(this.LOCAL_KEY)) {
				localStorage.setItem(this.LOCAL_KEY, JSON.stringify({

					start: +new Date() + add,
					views: 0

				}));
			}

			var monitor = JSON.parse(localStorage.getItem(this.LOCAL_KEY));

			monitor.views++;

			var start = monitor.start;

			if (monitor.views >= this.SETTINGS.views) {
				if (monitor.start + add >= now) {
					this.display_message();
				}

				monitor.start = now;
				monitor.views = 0;
			}

			localStorage.setItem(this.LOCAL_KEY, JSON.stringify(monitor));

			if (this.SETTINGS.time == 60 || this.SETTINGS.debug == 1) {
				console.log("Views: " + monitor.views);
				console.log("Start: " + new Date(start + add));
				console.log("Now: " + new Date());
			}
		}
	}, {
		key: "setup",
		value: function setup() {
			var plugin = pb.plugin.get(this.PLUGIN_ID);

			if (plugin && plugin.settings) {
				this.SETTINGS = plugin.settings;
			}
		}
	}, {
		key: "display_message",
		value: function display_message() {
			$("<div></div>").html(this.SETTINGS.message).dialog({

				title: this.SETTINGS.title,
				resizable: false,
				draggable: false,
				modal: true,
				width: this.SETTINGS.width,
				height: this.SETTINGS.height,
				autoOpen: true,

				buttons: [{

					text: "Close",
					click: function click() {
						$(this).dialog("close");
					}

				}]

			});
		}
	}]);

	return Pageview_Monitor;
}();


Pageview_Monitor.init();