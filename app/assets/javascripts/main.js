
var latitude
var longitude
var loader = document.getElementById('loading')
// loader is a div with a animation with css

var button = document.getElementById('get_meetup')
var maintitle = document.getElementById('main_title')
var div_yeld = document.getElementById('div_yeld')

button.addEventListener('click', function(event){
    event.preventDefault()
    loader.style.display = 'block';
    // show the loader wile api call 

    geoFindMe()
});
function geoFindMe() {
    
    function success(position) {
        
        var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
        };

        // ajax call to meetup api with the lat and long
        var response = $.ajax({
            url: '/meetup?lat='+pos.lat+'&lng='+pos.lng,
            method: 'GET',
            dataType: 'json'
        }).done(function(data) {

            loader.style.display = "none";
            button.style.display = 'none';
            maintitle.style.display = 'none';
            div_yeld.style.backgroundColor = "#f7f5f3";

            display_data(data)
            
            // remove the button, logo and the loader from the page and call the function to display the results on the page
        });
    }
    
      function error(err) {
        // alert("Unable to retrieve your location");
        alert(`ERROR(${err.code}): ${err.message}`);
        console.log('error');

        var response = $.ajax({
            url: '/meetup?lat=43.6&lng=-79.3',
            method: 'GET',
            dataType: 'json'
        }).done(function(data) {

            loader.style.display = "none";
            button.style.display = 'none';
            maintitle.style.display = 'none';
            div_yeld.style.backgroundColor = "#f7f5f3";

            display_data(data)
        });
            // remove the button, logo and the loader from the page and call the function to display the results on the page
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

        div2.style.display = "grid";
        section.setAttribute('class', 'site-section py-lg')
        div.setAttribute('class', 'div_event')
        image.setAttribute('class', 'img-fluid event_image')
        span.setAttribute('class', 'mr-2')
        name.setAttribute('class', 'h2_event_title')

        name.innerText       = data.events[i].name
        div2.appendChild(name)

        span.innerText       = 'When: ' + data.events[i].local_date + ' at ' + data.events[i].local_time
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

