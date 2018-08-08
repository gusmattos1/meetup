
var latitude
var longitude


document.getElementById('get_meetup').addEventListener('click', function(event){
    event.preventDefault()
    geoFindMe()
});
function geoFindMe() {
    
    function success(position) {
        console.log('start succes');
        
        var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
        };
        // ajax call to google maps to find readible address from location data
        var response = $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+pos.lat+', '+pos.lng+'&key=AIzaSyDxHtxeT7TcaPqz8y2tPRWbqIwB9ROdZfk',
            method: 'GET',
            dataType: 'json'
        }).done(function(data) {
            // console.log(response.responseJSON.results[0].address_components[8].long_name);
            latitude = response.responseJSON.results[0].geometry.location.lat
            longitude = response.responseJSON.results[0].geometry.location.lng
            
            console.log(latitude);
            console.log(longitude);

            // meetups_api_call()
            
        });
    }
    
      function error(err) {
        // alert("Unable to retrieve your location");
        alert(`ERROR(${err.code}): ${err.message}`);
        console.log('error');
        
      }
      navigator.geolocation.getCurrentPosition(success, error);
    }

    function  meetups_api_call() {
        console.log(zipcode);

        var response = $.ajax({
            url: 'https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public&lon=' + longitude + '&page=20&radius=smart&lat=' + latitude,
            method: 'GET',
            dataType: 'json'
        }).done(function(data) {
          
            console.log(data);
            
            
        });

    }
    