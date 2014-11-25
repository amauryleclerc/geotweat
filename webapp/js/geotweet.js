
var map;
var markersLayer;
function dlJson() {
    effacerTweet();
  
    document.getElementById("search_spinner").style.display = "block";

    var hashtag = document.getElementById("id_hashtag").value;
    $.get("../server/index.php", {
        twitter_query: "https://api.twitter.com/1.1/search/tweets.json?q="
                + encodeURIComponent(hashtag)
    }, function (data) {
        var obj = jQuery.parseJSON(data);
        afficherTweet(obj);
        document.getElementById("search_spinner").style.display = "none";
    });
}
function effacerTweet() {
    var nav = document.getElementById("tweet_list");
    nav.innerHTML = "";
     markersLayer.clearMarkers();
}
function afficherTweet(data) {
    var nav = document.getElementById("tweet_list");

    for (var i in data.statuses) {
    if (data.statuses[i].coordinates != null ) {
        var li = document.createElement("div");
        li.innerHTML = data.statuses[i].text;
        nav.appendChild(li);
    

          //  alert(data.statuses[i].coordinates.coordinates[0] + " " + data.statuses[i].coordinates.coordinates[1]);
            console.log(data.statuses[i]);
            ajouterMarker(data.statuses[i].coordinates.coordinates[0], data.statuses[i].coordinates.coordinates[1]);
        }

    }
}
function afficherCarte() {
 map = new OpenLayers.Map('map' );
 var ol_wms = new OpenLayers.Layer.WMS(
    "OpenLayers WMS",
    "http://vmap0.tiles.osgeo.org/wms/vmap0",
    {layers: "basic"}
);
		/*	var wmscURL = [
				"http://wmsc1.terrapages.net/getmap?",
				"http://wmsc2.terrapages.net/getmap?",
				"http://wmsc3.terrapages.net/getmap?",
				"http://wmsc4.terrapages.net/getmap?"
			];
			var terrapagesStreetLayer = new OpenLayers.Layer.WMS( 'TerraPages Street',wmscURL, {layers: 'UnprojectedStreet', format: 'image/jpeg' }, {buffer: 1, isBaseLayer: true} );
		*/	map.addLayer(ol_wms);
			map.zoomToMaxExtent();		

 
 markersLayer = new OpenLayers.Layer.Markers("My Marker Layer");
 markersLayer.setVisibility(true);
map.addLayer(markersLayer);
}
function ajouterMarker(lon, lat) {

var iconSize =  new OpenLayers.Size(20,20);
var iconOffset = new OpenLayers.Pixel(-(iconSize.w/2), -iconSize.h);
var marker = new OpenLayers.Marker(
	new OpenLayers.LonLat(lon,lat),
	new OpenLayers.Icon("img/twitter.png",iconSize,iconOffset)
);
markersLayer.addMarker(marker);

}

