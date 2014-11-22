
	var map;
var vectorLayer;
function dlJson() {
	document.getElementById("search_spinner").style.display = "block";

	var hashtag = document.getElementById("id_hashtag").value;
	$.get("../server/index.php", {
		twitter_query : "https://api.twitter.com/1.1/search/tweets.json?q="
				+ encodeURIComponent("#TPMP")
	}, function(data) {
		var obj = jQuery.parseJSON(data);
		afficherTweet(obj);
		document.getElementById("search_spinner").style.display = "none";
	});
}

function afficherTweet(data) {
	var nav = document.getElementById("tweet_list");

	for ( var i in data.statuses) {

		var li = document.createElement("div");
		li.innerHTML = data.statuses[i].text ;
		nav.appendChild(li);
		//if(data.statuses[i].coordinates.coordinates != null ){
			
			ajouterMarker(data.statuses[i].coordinates.coordinates[0], data.statuses[i].coordinates.coordinates[1]);
	//	}
	
	}
}
function afficherCarte() {
	 map = new ol.Map({
		target : 'map',
		layers : [ new ol.layer.Tile({
			source : new ol.source.MapQuest({
				layer : 'sat'
			})
		}) ],
		view : new ol.View({
			center : ol.proj.transform([ 37.41, 8.82 ], 'EPSG:4326',
					'EPSG:3857'),
			zoom : 4
		})
	});
	  vectorLayer = new ol.layer.Vector("Overlay");
	
		map.addLayer(vectorLayer);
}
function ajouterMarker(lon, lat){

	//markers.addMarker(new ol.Marker(new ol.LonLat(lon,lat), new ol.Icon()));
	  var feature = new ol.Feature.Vector(
	            new ol.geom.Point( lon, lat ).transform(epsg4326, projectTo),
	            {description:'This is the value of<br>the description attribute'} ,
	            {externalGraphic: './img/marker.png', graphicHeight: 25, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
	        );
	/*  var iconFeature = new ol.Feature({
		  geometry: new ol.geom.Point([0, 0]),
		  name: 'Null Island',
		  population: 4000,
		  rainfall: 500
		});*/
	 
	    vectorLayer.addFeatures(feature);

}

