var video = document.getElementById("video") || document.getElementById("audio");
video.addEventListener('loadeddata', function() {
    init({
        start				: {%= CurrentADC.PropValue("start_value") %},
        connectLeft	   : {%= CurrentADC.PropValue("connect_left") %},
        connectRight  : {%= CurrentADC.PropValue("connect_right") %},
        orientation		: '{%= CurrentADC.PropValue("orientation") %}',
        direction		 : '{%= CurrentADC.PropValue("direction") %}',
        tooltips		  : {%= CurrentADC.PropValue("tooltips") %},
        animate			 : {%= CurrentADC.PropValue("animate") %},
        animationDuration : {%= CurrentADC.PropValue("anim_duration") %},
        min				   : {%= CurrentADC.PropValue("min") %},
        max				   : {%= CurrentADC.PropValue("max") %},
        step			   : {%= CurrentADC.PropValue("step") %},
        decimals 		: {%= CurrentADC.PropValue("decimal_nbr") %},
        separator		: '{%:= CurrentADC.PropValue("decimal_separator") %}',
        thousand	   : '{%:= CurrentADC.PropValue("thousand_separator") %}',
        prefix			  : '{%:= CurrentADC.PropValue("prefix") %}',
        postfix			  : '{%:= CurrentADC.PropValue("postfix") %}',
        negative		: '{%:= CurrentADC.PropValue("negatives_numbers") %}',
        pipsDensity     : {%= CurrentADC.PropValue("density") %},
        graphTitle		 : '{%= CurrentADC.PropValue("title") %}',
        graphSub		: '{%= CurrentADC.PropValue("subtitle") %}',
        xTitle			    : '{%= CurrentADC.PropValue("x_axis") %}',
        yTitle				: '{%= CurrentADC.PropValue("y_axis") %}',
        data				: '{%= CurrentADC.PropValue("data") %}',
        timeInterval 	 : {%= CurrentADC.PropValue("interval") %},
        timeTimeout	   : {%= CurrentADC.PropValue("timeout") %},
        message			 : '{%= CurrentADC.PropValue("message") %}',
        showChart		: {%= CurrentADC.PropValue("show_chart") %},
        valueStop		 : {%= CurrentADC.PropValue("value_stop") %},
        length			   : '{%= CurrentADC.PropValue("length") %}',
        inputName	   : '{%= CurrentQuestion.InputName() %}',
        controls		   : {%= CurrentADC.PropValue("controls") %}
    });
});