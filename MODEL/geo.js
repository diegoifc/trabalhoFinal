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
		 var latlng = new google.maps.LatLng(lat,lng);
		
		// finding out the coordinates
		if (geocoder) 
		{
		 geocoder.geocode({ 'latLng': latlng }, function (results, status)
			{
				if (status == google.maps.GeocoderStatus.OK) 
				{
					//location of first address (latitude + longitude)
					location1 = results[0];
					var geo = document.getElementById('geolo');
					geo.innerHTML =	"Perto de: " + location1.formatted_address;
				} else 
				{
					alert("Geocode was not successful for the following reason: " + status);
				}
			});
      
    }
	 var geo = document.getElementById('geolo');
	geo.innerHTML =	"Perto de: " + location1.formatted_address + lat + lng;
}	   
  

    
    this.getGeo = function () {
	
		navigator.geolocation.getCurrentPosition(this.onGeoSuccess,  this.onFail,{ enableHighAccuracy: true } );
		
    }

    this.onFail=function (message) {
      alert('Falha causada por: ' + message);
    }
}


