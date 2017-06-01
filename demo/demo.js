var slider,//the div for the slider
    video,//the video to react
    interval,//the setInterval of data save
    timeout,//the setTimeout of inactivity
    chrono = 0, //the chrono compared to the duration of the video
    values = [],//Values used for the chart
    options;

function createSlider() {
    noUiSlider.create(slider, {
        start				: options.start,
        connect			 : options.connect,
        orientation		: options.orientation,
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

function createChart() {
    Highcharts.chart('chart', {
        title: {
            text: options.graphTitle
        },
        /*
        subtitle: {
        text: ''
		},
		*/
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
            data: values
        }]
    });
}

function inactive() {
    console.log('Inactivite depuis ' + options.timeTimeout + "s.");
    clearTimeout(timeout);
    timeout = setTimeout(inactive, options.timeTimeout * 1000);
};

function saveEmote() {
    var value = slider.noUiSlider.get();
    values.push(parseInt(value));
    chrono += options.timeInterval;

    if (chrono > video.duration) {
        clearInterval(interval);
        clearTimeout(timeout);
        createChart();
    }
}

function resetTimer() {
    //first reset the timeout when slider is used
    clearTimeout(timeout);
    //then reset it
    timeout = setTimeout(inactive, options.timeTimeout * 1000);
}

function init(optionsADC) {
    options = {
        start				: optionsADC.start || 50, //Number
        connect			 : optionsADC.connect, // false, true, [bool, bool]
        orientation		: optionsADC.orientation || 'horizontal',//"vertical", "horizontal"
        direction		 : optionsADC.direction || 'ltr', //"ltr", "rtl"
        tooltips		  : optionsADC.tooltips || true, //false, true
        animate			 : optionsADC.animate || true, // false, true
        animationDuration	: optionsADC.animationDuration || 300, //ms
        min				   : optionsADC.min || 0,
        max				   : optionsADC.max || 100,
        decimals	 	 : optionsADC.decimals || 0, //Number of decimals
        separator 	     : optionsADC.separator || '.', //Separator of decimals
        thousand	    : optionsADC.thousand || ' ', //Separator between thousand
        prefix		    	: optionsADC.prefix || '', //Before the number
        suffix		    	: optionsADC.suffix || '',  //After the number
        negative	      : optionsADC.negative || '-', //Separator for negative number
        pipsDensity    : optionsADC.pipsDensity || 1,//pips density
        showScale		: optionsADC.showScale,//show or no the scale
        graphTitle		 : optionsADC.graphTitle || 'Your reactions...',
        xTitle			    : optionsADC.xTitle || 'Time',
        yTitle				: optionsADC.yTitle || 'Intensity',
        data				: optionsADC.data || 'Intensity',
        timeInterval 	: optionsADC.timeInterval || 1,
        timeTimeout	  : optionsADC.timeTimeout || 10,
        values			   : optionsADC.values || [],
		length			   : optionsADC.length
    };
    slider = document.getElementById('slider');
    video = document.getElementById("video");
    //Create the slider with options object
    createSlider();
    //If the personne is active, reset the timeout
    slider.noUiSlider.on('slide', function () {    
        resetTimer();
    });
    //Create intervals and timeout timers
    interval = setInterval(saveEmote, options.timeInterval * 1000);
    timeout = setTimeout(inactive, options.timeTimeout * 1000);
}