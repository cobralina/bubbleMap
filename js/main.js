
//--- Tausender-Formatierung ------------------------------------------------------------------------------- //

function thousendPoints(zahl) {
    var i;
    var j=0;
    var ergebnis="";

    i=zahl.length-1;

    if(i>2){

        while (i >= 0) {
            ergebnis=zahl.substr(i,1)+ergebnis;
            j++;
            if (j==3) {
                ergebnis="."+ergebnis;
                j=0;
            }
            i--;
        } } else {
        ergebnis = zahl;
    }
    return ergebnis;
}


//----- Internet Explorer Abfrage -------------------------------------------------------------------------//

function getInternetExplorerVersion()
{
    var rV = -1; // Return value assumes failure.

    if (navigator.appName == 'Microsoft Internet Explorer' || navigator.appName == 'Netscape') {
        var uA = navigator.userAgent;
        var rE = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");

        if (rE.exec(uA) != null) {
            rV = parseFloat(RegExp.$1);
        }
        /*check for IE 11*/
        else if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            rV = 11;
        }
    }
    return rV;
}




//--- JSON laden ------------------------------------------------------------------------------------------- //

function loadJSON(file,callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', file, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == '200') {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}



// Daten laden und rendern--------------------------------------------------------------------------------------- //
function generateAssets() {


    loadJSON('json/assets.json', function (text) {

        var allItems = JSON.parse(text);
		var arrID = [];
        var arrLand = [];
        var arr2013 = [];
        var arr2014 = [];
        var arr2015 = [];
        var arr2016 = [];
		var arr2017 = [];
        

        for (var i = 0; i < allItems.assetList.length; i++) {

            var singleAsset = allItems.assetList[i];
           var AssetID = singleAsset.ID;
		    var AssetLand = singleAsset.Land;
            var Asset2013 = singleAsset.j2013;
             var Asset2014 = singleAsset.j2014;
            var Asset2015 = singleAsset.j2015;
           var Asset2016 = singleAsset.j2016;
           var Asset2017 = singleAsset.j2017;
            
     
	 		arrID.push(AssetID);
           arrLand.push(AssetLand);
          arr2013.push(Asset2013);
          arr2014.push(Asset2014);
         arr2015.push(Asset2015);
          arr2016.push(Asset2016);
         arr2017.push(Asset2017);

                    }
					
		 for (var i = 1; i < allItems.assetList.length; i++) {
			 
			 mouseLand(arrID[i], arrLand[i], arr2013[i], arr2014[i], arr2015[i], arr2016[i], arr2017[i]);
			 
			 }
					

    });

}


// Jahreskreise generieren ------------------------------------------------------------------------------------------ //

function generateCircle (_year, _yearvalue, _group, _xpos){

    var valueyear = _yearvalue / 100;
    var radiusyear= Math.sqrt(valueyear/3.14);

    var circleyear = _group.append('circle')
        .attr('fill', '#bfe5f9')
        .attr('r', 1)
        .attr('cx', _xpos)
        .attr('cy', 80 - radiusyear/2)
        .attr('id', ('circle' + _year));


    var animatecircle = document.getElementById('circle' + _year);

    TweenLite.to(animatecircle, 1, {attr:{r:radiusyear}})
}

// Text zu Jahreskreisen generieren ------------------------------------------------------------------------------- //

function generateText (_year, _yearvalue, _group, _xpos) {

    

    var yeartext = _group.append('text')
        .attr('class', 'circleyear')
        .text(_year)
        .attr('fill', '#ffffff')
        .attr('x', _xpos)
        .attr('y', 120)
        .attr('text-anchor', 'middle');

    var valueNumAsNum = Number(_yearvalue);
    var valueNum = valueNumAsNum.toLocaleString();

    var yearvalue =  _group.append('text')
        .attr('class', 'circletext')
        .attr('fill', '#ffffff')
        .text(valueNum)
        .attr('x', _xpos)
        .attr('y', 140)
        .attr('text-anchor', 'middle');
}

// Mouseover - Daten einblenden ------------------------------------------------------------------------------------ //


function mouseLand (_landID, _landname, _land2013, _land2014, _land2015, _land2016, _land2017) {


    var event = 'mouseover';

    if ('ontouchstart' in window) {
        event = 'touchstart';
    }


    var btnLand = document.getElementById(_landID);
    var toolTip = document.getElementById('tooltip');
    var landName = document.getElementById('land-headline');


    btnLand.addEventListener(event, function(e) {


        if (toolTip.style.opacity==0){
        toolTip.style.opacity=1;
        }


            if (_landname=='Oesterreich'){
                _landname = 'Österreich';
            }

            if (_landname=='Rumaenien'){
                _landname = 'Rumänien';
            }

            if (_landname=='Daenemark'){
                _landname = 'Dänemark';
            }

            if (_landname=='Grossbritannien'){
                _landname = 'Großbritannien';
            }

	       toolTip.style.display='block';
           landName.innerHTML = _landname;

            var svgCont = d3.select('#d3-content');
            svgCont.html('');

            var svg = svgCont.append('svg')
                .attr('viewBox', "0 0 420 220")
                .attr('id', 'circles');
            svg.html('');

            var group = svg.append('g')
                .attr('id', 'landcircles');
            
            var textgroup = svg.append('g')
                .attr('id', 'landtext');

            generateCircle(2013, _land2013, group, 22);
            generateText(2013, _land2013, textgroup, 24);
            generateCircle(2014, _land2014, group, 111);
            generateText(2014, _land2014, textgroup, 111);
            generateCircle(2015, _land2015, group, 206);
            generateText(2015, _land2015, textgroup, 206);
            generateCircle(2016, _land2016, group, 296);
            generateText(2016, _land2016, textgroup, 296);
            generateCircle(2017, _land2017, group, 391);
            generateText(2017, _land2017, textgroup, 391);


            if (e.pageY < 200){
                toolTip.style.top="5 px";
            }
            else {
                toolTip.style.top=(e.clientY-200) +"px";

            }
            toolTip.style.left= (e.clientX)+"px";

    },
        false);



    btnLand.addEventListener('mouseout', function() {

            toolTip.style.display='none';

        },
        false);


}


//---- Start-Layer-------------------------------------------------------------------------------------------  //


function generateStartLayer() {

    var toolTip = document.getElementById('tooltip');
    var TextStart = document.getElementById('d3-content');

    toolTip.style.display='block';
    TextStart.script.text = 'Wie entwickelten sich die Zahlen der Erst- und Folgeanträge von Asylbewerbern in der europäischen Union? Fahren Sie mit der Maus über die Länder, um jeweils die Zahlen von 2013 bis 2017 anzuzeigen.';

    TweenLite.to(toolTip, 1, {opacity:0, delay:3, ease:Back.easeOut});

}


//--- Document Ready ----------------------------------------------------------------------------------------   //

$(document).ready( function()  {

    var width = window.innerWidth || (window.document.documentElement.clientWidth || window.document.body.clientWidth);

    if (width <= 699) {
        document.location = "mobile.html";
    }


    var toolTip = document.getElementById('tooltip');
    TweenLite.to(toolTip, 1, {opacity:0, delay:3, ease:Back.easeOut});

    generateAssets();


} );
    
  




    



