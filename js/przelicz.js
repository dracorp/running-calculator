/**
 * Created by piecia on 20.10.14.
 */
(function($) {
    $.extend({
        przelicz_dystans: function (e) {
            var dystans = parseFloat( $("#dystans").val().replace(",",".") ) || 0;
            var dni     = parseFloat( $("#dni").val() ) || 0;
            var godziny = parseFloat( $("#godziny").val() ) || 0;
            var minuty  = parseFloat( $("#minuty").val() ) || 0;
            var sekundy = parseFloat( $("#sekundy").val() ) || 0;

            var totalSeconds        = dni*3600*24 + godziny*3600 + minuty*60 + sekundy;
            var floatHours          = totalSeconds / 3600;
            var kilometersDistance  = dystans/1000;

            var secondsPerKm = Math.round(totalSeconds/kilometersDistance);
            var minutesPerKm = Math.floor(secondsPerKm/60);
            var rest     = secondsPerKm - (minutesPerKm*60);

            var predkosc = Math.round(kilometersDistance/floatHours*100)/100;
            $("input#predkosc").val(predkosc);
            $("input#tempo_minuty").val(minutesPerKm);
            $("input#tempo_sekundy").val(rest);
        },
        przelicz_predkosc: function(e) {
            var dystans         = parseFloat( $("#dystans").val().replace(",",".") ) || 0;
            var dystansKm       = dystans/1000;
            var speedKmPerH     = parseFloat( $("#predkosc").val().replace(",",".") ) || 0;

            // predkosc -> tempo
            var a = 1 / speedKmPerH * 60;
            var tempo_minuty = Math.floor(a);
            var tempo_sekundy = Math.round((a - tempo_minuty) * 60);
            $("input#tempo_minuty").val(tempo_minuty);
            $("input#tempo_sekundy").val(tempo_sekundy);

            var speedMPerS = speedKmPerH/3600*1000;
            var totalSeconds = dystans/speedMPerS;
            var day = Math.floor(totalSeconds/24/3600);
            totalSeconds = totalSeconds%(24*3600);

            var hour = Math.floor(totalSeconds/3600);
            totalSeconds = totalSeconds%3600;

            var minute = Math.floor(totalSeconds/60);
            var rest = Math.floor(totalSeconds%60);

            $("input#dni").val(day);
            $("input#godziny").val(hour);
            $("input#minuty").val(minute);
            $("input#sekundy").val(rest);



        },
        przelicz_tempo: function(e) {
            var tempoMinuty     = parseFloat( $("#tempo_minuty").val() ) || 0;
            var tempoSekundy    = parseFloat( $("#tempo_sekundy").val() ) || 0;

            var totalSeconds = tempoMinuty*60 + tempoSekundy;
            var d = 1/(totalSeconds/3600);
            var speed = Math.round(d*100)/100;

            $("input#predkosc").val(speed);
            // TODO: w ile przebiegnę dany dystans
        }
    });
})(jQuery);

jQuery(document).ready( function($) {

    $("button#przelicz_dystans").click(function (e) {
        e.preventDefault();
        $.przelicz_dystans(e);
    });
    $("button#przelicz_predkosc").click(function (e) {
        e.preventDefault();
        $.przelicz_predkosc();
    });
    $("button#przelicz_tempo").click(function (e) {
        e.preventDefault();
        $.przelicz_tempo();
    });
/*    function licz(form){

        var dystans=eval(form.dystans.value) || 0
        var dni=eval(form.dni.value) || 0;
        var godziny=eval(form.godziny.value) || 0;
        var minuty=eval(form.minuty.value) || 0;
        var sekundy=eval(form.sekundy.value) || 0;

        var predkosc = (dystans/1000) / (godziny + minuty/60 + sekundy/3600);
        predkosc =  predkosc * 1000;
        predkosc = Math.round(prededkosc)/1000;

        sekundy = hours * 3600 + minutes * 60 + sekundy;

        var seknakil = Math.round(sekundy / (dystans/1000)*10) / 10;
        minuty  = Math.floor(seknakil/60);
        var reszta = Math.round((seknakil - minuty*60)*10) / 10;

        form.predkosc.value = predkosc;
        form.tempo.value = minuty;
        form.sekundy.value = reszta;
    };*/
    $(".btn-reset").on("click", function(){
        $(".resetThis").val("");
    });
});