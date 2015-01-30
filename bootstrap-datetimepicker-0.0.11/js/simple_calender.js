(function($) {
	var DateTimePicker=function(element,options){
		this.id=dpgId++;
		this.init(element,options);
	};
	var dateToDate=function(dt){
		if(typeof dt==="string"){
			return new Date(dt);
		}
		return dt;
	};	
	DateTimePicker.prototype={
		constructor:DateTimePicker,
		init:function(element,options){
			var icon;
			if(!(options.pickTime||options.pickDate))
				throw new Error("Must choose at least one picker");
			this.options=options;
			this.$element=$(element);
			this.language=options.language in dates?options.language:"en";
			this.pickDate=options.pickDate;
			this.pickTime=options.pickTime;
			this.isInput=this.$element.is("input");
			this.component=false;
			if(this.$element.find(".input-append")||this.$element.find(".input-prepend"))this.component=this.$element.find(".add-on");
			this.format=options.format;
			if(!this.format){
				if(this.isInput)this.format=this.$element.data("format");
				else this.format=this.$element.find("input").data("format");
				if(!this.format)
					this.format="MM/dd/yyyy";
			}
			this._compileFormat();
			if(this.component){
				icon=this.component.find("i");
			}
			if(this.pickTime){
				if(icon&&icon.length)
					this.timeIcon=icon.data("time-icon");
				if(!this.timeIcon)
					this.timeIcon="icon-time";
				icon.addClass(this.timeIcon);
			}
			if(this.pickDate){
				if(icon&&icon.length)
					this.dateIcon=icon.data("date-icon");
				if(!this.dateIcon)
					this.dateIcon="icon-calendar";
				icon.removeClass(this.timeIcon);
				icon.addClass(this.dateIcon);
			}
			this.widget=$(getTemplate(this.timeIcon,options.pickDate,options.pickTime,options.pick12HourFormat,options.pickSeconds,options.collapse)).appendTo("body");
			this.minViewMode=options.minViewMode||this.$element.data("date-minviewmode")||0;
			if(typeof this.minViewMode==="string"){
				switch(this.minViewMode){
					case"months":
					this.minViewMode=1;
					break;
					case"years":
					this.minViewMode=2;
					break;
					default:
					this.minViewMode=0;
					break;
				}
			}
			this.viewMode=options.viewMode||this.$element.data("date-viewmode")||0;
			if(typeof this.viewMode==="string"){
				switch(this.viewMode){
					case"months":
					this.viewMode=1;
					break;
					case"years":
					this.viewMode=2;
					break;
					default:
					this.viewMode=0;
					break;
				}
			}
			this.startViewMode=this.viewMode;
			this.weekStart=options.weekStart||this.$element.data("date-weekstart")||0;
			this.weekEnd=this.weekStart===0?6:this.weekStart-1;
			this.setStartDate(options.startDate||this.$element.data("date-startdate"));
			this.setEndDate(options.endDate||this.$element.data("date-enddate"));
			this.fillDow();
			this.fillMonths();
			this.fillHours();
			this.fillMinutes();
			this.fillSeconds();
			this.update();
			this.showMode();
			this._attachDatePickerEvents();
		},
	}
})