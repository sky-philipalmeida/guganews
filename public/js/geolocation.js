var Geolocation = {
	rad: function(x) { return x * Math.PI / 180 },
  // Distance in kilometers between two points using the Haversine algo.
  haversine: function(p1, p2) {
  	var R = 6371
  	var dLat  = this.rad(p2.latitude - p1.latitude)
  	var dLong = this.rad(p2.longitude - p1.longitude)
  	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  	Math.cos(this.rad(p1.latitude)) * Math.cos(this.rad(p2.latitude)) * Math.sin(dLong/2) * Math.sin(dLong/2)
  	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  	var d = R * c
  	return Math.round(d)
  },
  // Distance between me and the passed position.
  distance_from: function(position,current_location) {
  	var distance = Geolocation.haversine(
  		position.coords, current_location.coords)
    // Sugar: If distance is less than 1km, don't bump into me.
    
    return distance;
}
}
function parse_gps( input ) {
	if( input.indexOf( 'N' ) == -1 && input.indexOf( 'S' ) == -1 &&
		input.indexOf( 'W' ) == -1 && input.indexOf( 'E' ) == -1 ) {
		return input.split(',');
}
var parts = input.split(/[°'"]+/).join(' ').split(/[^\w\S]+/);
var directions = [];
var coords = [];
var dd = 0;
var pow = 0;
for( i in parts ) {
    // we end on a direction
    if( isNaN( parts[i] ) ) {
    	var _float = parseFloat( parts[i] );
    	var direction = parts[i];
    	if( !isNaN(_float ) ) {
    		dd += ( _float / Math.pow( 60, pow++ ) );
    		direction = parts[i].replace( _float, '' );
    	}
    	direction = direction[0];
    	if( direction == 'S' || direction == 'W' )
    		dd *= -1;
    	directions[ directions.length ] = direction;
    	coords[ coords.length ] = dd;
    	dd = pow = 0;
    } else {
    	dd += ( parseFloat(parts[i]) / Math.pow( 60, pow++ ) );
    }
}
if( directions[0] == 'W' || directions[0] == 'E' ) {
	var tmp = coords[0];
	coords[0] = coords[1];
	coords[1] = tmp;
}
return coords;
}

/*
country = {
	coords : {
		latitude: parse_gps('35°18\'S 149°07\'E')[0],
		longitude: parse_gps('35°18\'S 149°07\'E')[1],
	}
};
*/

function show_map(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
  // let's show a map or do something interesting!
  // console.log(country.coords);
  // console.log(position.coords);
  var distance=0;
  var closer=false;
  var country = {};
  for (var t in resources) { 
  	resources[t].map(function(co){

  		var cpos= parse_gps(co.gps);
		country = {
			coords : {
				latitude: cpos[0],
				longitude: cpos[1],
			}
		};
  		distance=Geolocation.distance_from(country,position);
  		co.distance=distance;

  		if (closer===false){
  			closer=co;
  		}else {
  			if (closer.distance>co.distance) {
  				closer=co;
  			}
  		}

  	}) 
  }

	// console.log(closer);
	// alert(closer.name);
	currentCountryData={};
	currentCountryData.data={};
    currentCountryData.data.url=closer.url;
    currentCountryData.data.name=closer.name;

    getNews(false,true);

  return position;

}


function errorHandler(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
		alert("User denied the request for Geolocation.");
		break;
		case error.POSITION_UNAVAILABLE:
		alert("Location information is unavailable.");
		break;
		case error.TIMEOUT:
		alert("The request to get user location timed out.");
		break;
		case error.UNKNOWN_ERROR:
		alert("An unknown error occurred.");
		break;
	}
}
