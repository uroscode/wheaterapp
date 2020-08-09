$(document).ready(function(){

    $("#submitWeather").click(function () {
        var city = $('#city').val();
        var api = "APPID=347646ef2b73488926f03785e2aae229";

        if(city != ''){

            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&' + api,
                type:"GET",
                dataType: "jsonp",
                success: function(data){
                    JSON.stringify(data);
                    $(".message").removeClass();
                    var current_time = data.dt;
                    $(".info-weather").fadeIn(3000);
                    $(".info-weather").css("display" , "block");
                    $(".city_name").html(city);
                    $(".city_temp").html(Math.ceil(data.main.temp) + "C");
                    $(".wind_speed").html(data.wind.speed + "m/s");
                    $(".city_current").html(data.weather[0].main);
                    $(".time").html(time(current_time));

                     var current = data.weather[0].main;

                     if(current == 'Clear'){
                        $("#icon").removeClass();
                        $("#icon").addClass("sunny");
                         $("#cover").css("background-image", "url('img/sunny.jpg')");
                        alert(current);
                     }
                     else if(current == 'Clouds'){
                         $("#icon").removeClass();
                         $("#icon").addClass("cloudy");
                         $("#cover").css("background-image", "url('img/clouds.jpg')");
                         alert(current);

                     }else if(current == 'Rain'){
                         $("#icon").removeClass();
                         $("#icon").addClass("rainy");
                         $("#cover").css("background-image", "url('img/rain.jpg')");
                         alert(current);
                     }else if(current == 'Mist'){
                         $("#icon").removeClass();
                         $("#icon").addClass("cloudy");
                         $("#cover").css("background-image", "url('img/mist.jpg')");
                         alert(current);
                     }
                },error: function (dataError) {
                    $(".message").addClass('alert alert-warning').html("City name not valid!.");
                }
            })

        }else{
            $(".message").addClass('alert alert-warning').html("Fields are required! Please enter a city name.");
        }

    });

     function time(current_time){
        var date = new Date(current_time * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();
        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;
    }

});