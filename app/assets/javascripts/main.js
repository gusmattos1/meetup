
var latitude
var longitude
var loader = document.getElementById('loading')
var button = document.getElementById('get_meetup')
var maintitle = document.getElementById('main_title')

button.addEventListener('click', function(event){
    event.preventDefault()
    loader.style.display = 'block';
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
            
            loader.style.display = "none";
            button.style.display = 'none';
            maintitle.style.display = 'none';
            display_data(data)
            
        });
    }
    
      function error(err) {
        // alert("Unable to retrieve your location");
        alert(`ERROR(${err.code}): ${err.message}`);
        console.log('error');
        loader.style.display = "none";
      }
      navigator.geolocation.getCurrentPosition(success, error);
    }

function display_data(data) {

  var result = document.getElementById('result')
    for (var i = 0; i < data.events.length; i++) {
        var section         = document.createElement("section")
        var div             = document.createElement("div")
        var div2             = document.createElement("div")
        var name            = document.createElement("h2")
        var time             = document.createElement("p")
        var span             = document.createElement("span")
        var request_link    = document.createElement("a")
        var image           = document.createElement('img')
        var request_button  = document.createElement("button")

        section.setAttribute('class', 'site-section py-lg')
        div.setAttribute('class', 'div_event')
        image.setAttribute('class', 'img-fluid event_image')
        span.setAttribute('class', 'mr-2')

        name.innerText       = data.events[i].name
        div2.appendChild(name)

        span.innerText       = 'When: ' + data.events[i].local_date + ' at ' + data.events[i].local_time
        // span.appendChild(time)
        div2.appendChild(span)
        
        request_link.setAttribute('target', '_blank')
        request_link.setAttribute('href', '/show?urlname=' + data.events[i].group.urlname + '&event_id=' + data.events[i].id)
        request_button.innerText = 'Select Event'
        request_link.appendChild(image)
        
        if (data.events[i].featured_photo) {
            image.setAttribute('src', data.events[i].featured_photo.photo_link)
        } else {
            image.setAttribute('src', 'http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg')
        }
        div2.appendChild(request_link)
        div.appendChild(div2)
        result.appendChild(div)
    }
}

