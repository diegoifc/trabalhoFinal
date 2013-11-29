	function objtGeo(){

	var watchId;   
    var destino; 

	this.setWatchId=function(nId){
			this.watchId= nId;
		}
	

    this.onGeoSuccess = function(position) {
	    
	 var geocoder;

	geocoder = new google.maps.Geocoder(); // creating a new geocode object
		
		// getting the two address values
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		
		// finding out the coordinates
		if (geocoder) 
		{
			geocoder.geocode( { 'latlng': lat,lng }, function(results, status) 
			{
				if (status == google.maps.GeocoderStatus.OK) 
				{
					//location of first address (latitude + longitude)
					location1 = results[0].geometry.location;
				} else 
				{
					alert("Geocode was not successful for the following reason: " + status);
				}
			});
      var geo = document.getElementById('geo');
		geo.innerHTML =	"Perto de: " + location1;
    }
}	   
  

    
    this.getGeo = function () {
	
		navigator.geolocation.getCurrentPosition(this.onGeoSuccess,  this.onFail,{ enableHighAccuracy: true } );
		
    }

    this.onFail=function (message) {
      alert('Falha causada por: ' + message);
    }
}


