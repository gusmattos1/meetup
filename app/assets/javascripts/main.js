
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
        // ajax call to google maps to   readible address from location data
        var response = $.ajax({
            url: '/meetup?lat='+pos.lat+'&lng='+pos.lng,
            method: 'GET',
            dataType: 'json'
        }).done(function(data) {
            console.log(data);
            
            display_data(data)
            
        });
    }
    
      function error(err) {
        // alert("Unable to retrieve your location");
        alert(`ERROR(${err.code}): ${err.message}`);
        console.log('error');
        
      }
      navigator.geolocation.getCurrentPosition(success, error);
    }

function display_data(data) {

    var result = document.getElementById('result')
for (var i = 0; i < data.events.length; i++) {
  var div             = document.createElement("div")
  var name            = document.createElement("h3")
  var time             = document.createElement("p")
  var request_link    = document.createElement("a")
  var request_button  = document.createElement("button")

  name.innerText        = data.events[i].name
  time.innerText       =  data.events[i].time
  div.classList.add("single_result")
  request_link.setAttribute('target', '_blank')
  request_link.setAttribute('href', '/show?urlname=' + data.events[i].group.urlname + '&event_id=' + data.events[i].id)
  request_button.innerText = 'Select Event'
  request_link.appendChild(request_button)
  div.appendChild(name)
  div.appendChild(time)
  div.appendChild(request_link)
  result.appendChild(div)
}
}

