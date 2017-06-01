var slider,//the div for the slider
    video,//the video to react
    interval,//the setInterval of data save
    timeout,//the setTimeout of inactivity
    chrono = 0, //the chrono compared to the duration of the video
    options;

//Create the slider with the options object
function createSlider() {
    noUiSlider.create(slider, {
        start				: options.start,
        connect			 : options.connect,
        orientation		: options.orientation,
        step			   : options.step,
        direction		 : options.direction,
        tooltips		  : options.tooltips,
        animate			 : options.animate,
        animationDuration	: options.animationDuration,
        range			  : {
            'min'  	: options.min,
            'max'  :  options.max
        },
        format	: wNumb({
            decimals	 	 : options.decimals,
            separator 	     : options.separator,
            thousand	    : options.thousand,
            prefix		    	: options.prefix,
            suffix		    	: options.suffix,
            negative	      : options.negative,
        }),
        pips	: {
            mode	: 'range', //range, steps
            density	: options.pipsDensity,
            format	: wNumb({
                decimals	 	 : options.decimals,
                separator 	     : options.separator,
                thousand	    : options.thousand,
                prefix		    	: options.prefix,
                suffix		    	: options.suffix,
                negative	      : options.negative,
            })
        }
    });
}

//Create the chart with the values in the options object
// options.values.
// MoreOver, he takes all is elements in this object (title of axis...)
function createChart() {
    Highcharts.chart('chart', {
        title: {
            text: options.graphTitle
        },
        subtitle: {
        text: options.graphSub
		},
        xAxis: {
            title: {
                text: options.xTitle
            }
        },
        yAxis: {
            title: {
                text: options.yTitle
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                pointStart: 0
            }
        },
        series: [{
            name: options.data,
            data: options.values
        }]
    });
}

//If the person is inactive from time given in parameter
function inactive() {
    //Stop all by an alert
    alert(options.message.replace("%s", options.timeTimeout));
    //then reset the timeout
    resetTimer();
};

//Save in the options.values array all datas for each interval
//given in parameter
function saveEmote() {
    //Recover the value
    var value = slider.noUiSlider.get();
    //push it in the array
    options.values.push(parseInt(value));
    //add to the chrono the time of an interval
    chrono += options.timeInterval;

    //If the video is finish, clear all and display the graph
    if (chrono >= video.duration) {
        //Pause the video if the event come from the stop value
        video.pause();
        //Clear all timer
        clearInterval(interval);
        clearTimeout(timeout);
        //create chart
        if (options.showChart) {
            createChart();
        }
        
        document.getElementById(options.inputName).value = options.values.join(";");
        // remove the event from the slider
        slider.noUiSlider.off('slide');
    }
}

//Reset the timer of inactivity
function resetTimer() {
    //first reset the timeout when slider is used
    clearTimeout(timeout);
    //then reset it
    timeout = setTimeout(inactive, options.timeTimeout * 1000);
}

//Init function called in the dynamic js
function init(optionsADC) {
    options = {
        start				: optionsADC.start || 50, //Number
        connect			 : [optionsADC.connectLeft, optionsADC.connectRight], // false, true, [bool, bool]
        orientation		: optionsADC.orientation || 'horizontal',//"vertical", "horizontal"
        direction		 : optionsADC.direction || 'ltr', //"ltr", "rtl"
        tooltips		  : optionsADC.tooltips || true, //false, true
        animate			 : optionsADC.animate || true, // false, true
        animationDuration	: optionsADC.animationDuration || 300, //ms
        min				   : optionsADC.min || 0,
        max				   : optionsADC.max || 100,
        step				: optionsADC.step || 1,
        decimals	 	 : optionsADC.decimals || 0, //Number of decimals
        separator 	     : optionsADC.separator || '.', //Separator of decimals
        thousand	    : optionsADC.thousand || ' ', //Separator between thousand
        prefix		    	: optionsADC.prefix || '', //Before the number
        suffix		    	: optionsADC.suffix || '',  //After the number
        negative	      : optionsADC.negative || '-', //Separator for negative number
        pipsDensity    : optionsADC.pipsDensity || 1,//pips density
        showScale		: optionsADC.showScale,//show or no the scale
        showChart 		: optionsADC.showChart,
        graphTitle		 : optionsADC.graphTitle || '',
        graphSub		: optionsADC.graphSub || '',
        xTitle			    : optionsADC.xTitle || '',
        yTitle				: optionsADC.yTitle || '',
        data				: optionsADC.data || '',
        timeInterval 	: optionsADC.timeInterval || 1,
        timeTimeout	  : optionsADC.timeTimeout || 10,
        message			: optionsADC.message || "Inactif depuis %ss",
        values			   : optionsADC.values || [],
        valueStop		: optionsADC.valueStop,
		length			   : optionsADC.length,
        inputName	  : optionsADC.inputName
    };
    //Recover slider and video
    slider = document.getElementById('slider');
    video = document.getElementById("video");
    
    //Create the slider with options object
    createSlider();
    //If the personne is active, reset the timeout
    slider.noUiSlider.on('slide', function () {
        if (options.timeTimeout !== -1) {
            resetTimer();
        }
        //if the is a Stop value
        if (options.valueStop === -1) {
            return;
        }
        //if the value is <= to the stop value, set the chrono to the time of the video + 1s.
        //Then call the function to finish the program
        if (parseInt(slider.noUiSlider.get()) <= options.valueStop) {
            chrono = video.duration + 1;
            saveEmote();
        }
    });
    
    //if the length of the slider is not specified, take the length of the video
    if (!options.length) {
        options.length = video.clientWidth.toString();
    }
   	//Check if the length has the correct value with unity
    //Default is px
    if (!options.length.match(/px|%|vw|rem|em/)) {
        options.length += "px";
    }

    //if the slider is horizontal, the length equal the width
    if (options.orientation === "horizontal") {
        slider.style.width = options.length;
    }
    //else if the slider is vertical, the length equal the height
    else if (options.orientation === "vertical") {
        slider.style.height =  options.length;
    }
    
    //Create intervals and timeout timers
    interval = setInterval(saveEmote, options.timeInterval * 1000);
    if (options.timeTimeout !== -1) {
        timeout = setTimeout(inactive, options.timeTimeout * 1000);
    }
}
