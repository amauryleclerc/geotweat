
var map;
var markersLayer;
var projS;
var projC;

function dlJson() {
    effacerTweet();
  
    document.getElementById("search_spinner").style.display = "inline";

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

    for (var i in data.statuses ) {
if (data.statuses[i].coordinates != null && data.statuses[i].coordinates.coordinates[0] !==0 ) {
    var text  = data.statuses[i].text;
    text =  chercherHashtag(text) ;
     text =  chercherURL(text);
        var li = document.createElement("li");
        
        li.innerHTML = text;
        nav.appendChild(li);
        

            ajouterMarker(data.statuses[i].coordinates.coordinates[0], data.statuses[i].coordinates.coordinates[1]);
        }

    }
}
function chercherURL(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
    return text.replace(exp,"<a target='_blank' href='$1'>$1</a>"); 
}
function chercherHashtag(text) {
       var exp = /\S*#(\[[^\]]+\]|\S+)/g;
    return text.replace(exp,'<a  href="#" onclick="javascript:replacerHashtag(\'$1\')" >#$1</a>'); 
}
function replacerHashtag(text){
       document.getElementById("id_hashtag").value = text;
       dlJson();
}

function afficherCarte() {
 map = new OpenLayers.Map('map' );
	map.addLayer(new OpenLayers.Layer.OSM());
map.zoomToMaxExtent();		

 projS = new OpenLayers.Projection("EPSG:4326");
projC = map.getProjectionObject();
 markersLayer = new OpenLayers.Layer.Markers("My Marker Layer");
 markersLayer.setVisibility(true);
map.addLayer(markersLayer);
}
function ajouterMarker(lon, lat) {

var iconSize =  new OpenLayers.Size(20,20);
var iconOffset = new OpenLayers.Pixel(-(iconSize.w/2), -iconSize.h);
var marker = new OpenLayers.Marker(
	new OpenLayers.LonLat(lon,lat).transform(projS, projC),
	new OpenLayers.Icon("img/twitter.png",iconSize,iconOffset)
);
markersLayer.addMarker(marker);

}
function zoomMarker(id){
    
}

