class Pageview_Monitor {

	static init(){
		this.PLUGIN_ID = "pd_pageview_monitor";
		this.LOCAL_KEY = "pd_pageview_monitor";
		this.SETTINGS = {};

		this.setup();

		$(this.ready.bind(this));
	}

	static ready(){
		let now = (+ new Date());
		let add = parseInt(this.SETTINGS.time, 10) * 1000;

		if(!localStorage.getItem(this.LOCAL_KEY)){
			localStorage.setItem(this.LOCAL_KEY, JSON.stringify({

				start: (+ new Date() + add),
				views: 0

			}));
		}

		let monitor = JSON.parse(localStorage.getItem(this.LOCAL_KEY));

		monitor.views ++;

		let start = monitor.start;

		if(monitor.views >= this.SETTINGS.views){
			if((monitor.start + add) >= now){
				this.display_message();
			}

			monitor.start = now;
			monitor.views = 0;
		}

		localStorage.setItem(this.LOCAL_KEY, JSON.stringify(monitor));

		if(this.SETTINGS.time == 60 || this.SETTINGS.debug == 1){
			console.log("Views: " + monitor.views);
			console.log("Start: " + new Date(start + add));
			console.log("Now: " + new Date());
		}
	}

	static setup(){
		let plugin = pb.plugin.get(this.PLUGIN_ID);

		if(plugin && plugin.settings){
			this.SETTINGS = plugin.settings;
		}
	}

	static display_message(){
		$("<div></div>").html(this.SETTINGS.message).dialog({

			title: this.SETTINGS.title,
			resizable: false,
			draggable: false,
			modal: true,
			width: this.SETTINGS.width,
			height: this.SETTINGS.height,
			autoOpen: true,

			buttons: [

				{

					text: "Close",
					click: function(){
						$(this).dialog("close");
					}

				}

			]

		});
	}

}

Pageview_Monitor.init();