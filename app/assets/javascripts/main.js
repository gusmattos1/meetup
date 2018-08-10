
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
    var div3             = document.createElement("div")
    var div4             = document.createElement("div")
    var div5             = document.createElement("div")
    var div6             = document.createElement("div")
    var div7             = document.createElement("div")
    var name            = document.createElement("h2")
    var time             = document.createElement("p")
    var span             = document.createElement("span")
    var request_link    = document.createElement("a")
    var image           = document.createElement('img')
    var request_button  = document.createElement("button")

    section.setAttribute('class', 'site-section py-lg')
    div.setAttribute('class', 'container')
    div2.setAttribute('class', 'row blog-entries')
    div3.setAttribute('class', 'col-md-12 col-lg-8 main-content')
    div4.setAttribute('class', 'post-meta')
    div5.setAttribute('class', 'post-content-body')
    div6.setAttribute('class', 'row mb-5')
    div7.setAttribute('class', 'col-md-12 mb-4 element-animate fadeInUp element-animated')
    image.setAttribute('class', 'img-fluid')
    span.setAttribute('class', 'mr-2')

    name.innerText       = data.events[i].name
    div3.appendChild(name)

    time.innerText       = 'When: ' + data.events[i].local_date + ' at ' + data.events[i].local_time
    span.appendChild(time)
    div3.appendChild(span)


    
    request_link.setAttribute('target', '_blank')
    request_link.setAttribute('href', '/show?urlname=' + data.events[i].group.urlname + '&event_id=' + data.events[i].id)
    request_button.innerText = 'Select Event'
    request_link.appendChild(image)
    
    if (data.events[i].featured_photo) {
    image.setAttribute('src', data.events[i].featured_photo.photo_link)
    } else {
    image.setAttribute('src', 'http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg')
    }
    div7.appendChild(request_link)
    div6.appendChild(div7)
    div5.appendChild(div6)
    div3.appendChild(div5)
    div3.appendChild(div4)
    div2.appendChild(div3)
    div.appendChild(div2)
    result.appendChild(div)


}
}

