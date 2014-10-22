/**
 * Created by dracorp on 20.10.14.
 */
(function($) {
    $.extend({
        count_distance: function () {
            var distance    = parseFloat( $("#distance").val().replace(",",".").replace(" ","") ) || 0;
            var days        = parseFloat( $("#days").val() ) || 0;
            var hours       = parseFloat( $("#hours").val() ) || 0;
            var minutes     = parseFloat( $("#minutes").val() ) || 0;
            var seconds     = parseFloat( $("#seconds").val() ) || 0;

            var totalSeconds        = days*3600*24 + hours*3600 + minutes*60 + seconds;
            var floatHours          = totalSeconds / 3600;
            var kilometersDistance  = distance/1000;

            var secondsPerKm    = Math.round(totalSeconds/kilometersDistance);
            var minutesPerKm    = Math.floor(secondsPerKm/60);
            var rest            = secondsPerKm - (minutesPerKm*60);

            var speed = Math.round(kilometersDistance/floatHours*100)/100;
            $("input#speed").val(speed);
            $("input#pace_minutes").val(minutesPerKm);
            $("input#pace_seconds").val(rest);
        },
        count_speed: function() {
            var distance    = parseFloat( $("#distance").val().replace(",",".").replace(" ","") ) || 0;
            var speedKmH    = parseFloat( $("#speed").val().replace(",",".").replace(" ","") ) || 0;

            // speed -> pace
            var a = 1 / speedKmH * 60;
            var pace_minutes = Math.floor(a);
            var pace_seconds = Math.round((a - pace_minutes) * 60);
            $("input#pace_minutes").val(pace_minutes);
            $("input#pace_seconds").val(pace_seconds);

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
        count_pace: function() {
            var paceMinutes = parseFloat( $("#pace_minutes").val() ) || 0;
            var paceSeconds = parseFloat( $("#pace_seconds").val() ) || 0;
            var distance    = parseFloat( $("#distance").val() ) || 0;

            var totalSeconds = paceMinutes*60 + paceSeconds;
            var d = 1/(totalSeconds/3600);
            var speed = Math.round(d*100)/100;

            $("input#speed").val(speed);
            // TODO: w ile przebiegnę dany dystans
            // pace*distance
            var time = totalSeconds*distance/1000; //[s]
            var days = Math.floor(time/(24*3600));
            time = time%(24*3600);
            var hours = Math.floor(time/3600);
            time = time%(3600);
            var minutes = Math.floor(time/60);
            var rest = time%60;

            $("input#days").val(days);
            $("input#hours").val(hours);
            $("input#minutes").val(minutes);
            $("input#seconds").val(rest);
        }
    });
})(jQuery);

jQuery(document).ready( function($) {

    $("button#count_distance").click(function (e) {
        e.preventDefault();
        $.count_distance(e);
    });
    $("button#count_speed").click(function (e) {
        e.preventDefault();
        $.count_speed();
    });
    $("button#count_pace").click(function (e) {
        e.preventDefault();
        $.count_pace();
    });

    $(".btn-reset").on("click", function(){
        $(".resetThis").val("");
    });
});