(function($) {
    /**
     * global pattern for distance, checks if it is in km
      * @type {RegExp}
     */
    var kilometers = new RegExp("(k|km)$");
    /**
     * global variables from input field
     */
    var distance, days, hours, minutes, seconds, speedKmH, paceMinutes, paceSeconds;

    /**
     * Reads data from input field
     * @private
     */
    function _read_data(){
        "use strict";
        distance    = $("#distance").val().replace(",",".").replace(" ","") || 0;
        if(kilometers.test(distance)){
            distance=parseFloat(distance)*1000;
        } else {
            distance=parseFloat(distance);
        }
        days        = parseFloat( $("#days").val() ) || 0;
        hours       = parseFloat( $("#hours").val() ) || 0;
        minutes     = parseFloat( $("#minutes").val() ) || 0;
        seconds     = parseFloat( $("#seconds").val() ) || 0;

        speedKmH    = parseFloat( $("#speed").val().replace(",",".").replace(" ","") ) || 0;

        paceMinutes = parseFloat( $("#pace_minutes").val() ) || 0;
        paceSeconds = parseFloat( $("#pace_seconds").val() ) || 0;
    }

    $.extend({
        /**
         * count distance to speed, pace
         */
        count_distance: function() {
            _read_data();

            var totalSeconds        = days*3600*24 + hours*3600 + minutes*60 + seconds;
            var floatHours          = totalSeconds / 3600;
            var kilometersDistance  = distance/1000;

            // count pace
            var secondsPerKm    = totalSeconds/kilometersDistance;
            var minutesPerKm    = Math.floor(secondsPerKm/60);
            var rest            = Math.round((secondsPerKm - minutesPerKm*60)*100)/100;

            // output
            $("input#pace_minutes").val(minutesPerKm);
            $("input#pace_seconds").val(rest);

            // count speed
            var speed = Math.round(kilometersDistance/floatHours*1000)/1000;
            $("input#speed").val(speed);

        },
        /**
         * count speed to pace or time
         */
        count_speed: function() {
            _read_data();

            // speed -> pace
            var a = 1 / speedKmH * 60;
            var pace_minutes = Math.floor(a);
            var pace_seconds = ((a - pace_minutes) * 60);
            var pace_sseconds = Math.round((pace_seconds%1)*100);
            pace_seconds = Math.round((pace_seconds+pace_sseconds/100)*100)/100;
            $("input#pace_minutes").val(pace_minutes);
            $("input#pace_seconds").val(pace_seconds);
            $("input#pace_sseconds").val(pace_sseconds);

            var speedMPerS = speedKmH/3600*1000;
            var totalSeconds = Math.round(distance/speedMPerS);
            var day = Math.floor(totalSeconds/24/3600);
            totalSeconds = totalSeconds%(24*3600);

            var hour = Math.floor(totalSeconds/3600);
            totalSeconds = totalSeconds%3600;

            var minute = Math.floor(totalSeconds/60);
            var rest = Math.floor(totalSeconds%60);

            $("input#days").val(day);
            $("input#hours").val(hour);
            $("input#minutes").val(minute);
            $("input#seconds").val(rest);
        },
        /**
         * count pace to speed or time
         */
        count_pace: function() {
            _read_data();

            // pace -> speed
            var totalSeconds = paceMinutes*60 + paceSeconds;
            var d = 1/(totalSeconds/3600);
            var speed = Math.round(d*1000)/1000;

            $("input#speed").val(speed);

            // pace -> time
            var time = totalSeconds*distance/1000; // s/km
            var days = Math.floor(time/(24*3600));
            time = time%(24*3600);
            var hours = Math.floor(time/3600);
            time = time%(3600);
            var minutes = Math.floor(time/60);
            var rest = Math.round((time%60)*100)/100;

            $("input#days").val(days);
            $("input#hours").val(hours);
            $("input#minutes").val(minutes);
            $("input#seconds").val(rest);
        }
    });
})(jQuery);

jQuery(document).ready( function($) {
	var userLang = navigator.language || navigator.userLanguage;
	var lang = userLang.split('-')[0];

    $("button#count_distance").click(function (e) {
        e.preventDefault();
        $.count_distance(e);
    });
    $("#distance,#days,#hours,#minutes,#seconds").keyup(
        function() {
            $.count_distance();
        }
    );

    $("button#count_speed").click(function (e) {
        e.preventDefault();
        $.count_speed();
    });
    $("#speed").keyup(
        function () {
            $.count_speed();
        }
    );

    $("button#count_pace").click(function (e) {
        e.preventDefault();
        $.count_pace();
    });
    $("#pace_minutes,#pace_seconds").keyup(
        function () {
            $.count_pace();
        }
    );

    $(".btn-reset").on("click", function(){
        $(".resetThis").val("");
    });
});