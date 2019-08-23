var osm = new ol.layer.Tile({
    source: new ol.source.OSM()
});


var bing_aerial_with_labels = new ol.layer.Tile({
    visible: true,
    preload: Infinity,
    source: new ol.source.BingMaps({
        key: 'AitGE28HmXz2ltcsDI2E5gzWWviO20dT4H4XS6vS7DhZ9H5txt-x48f0iT1hChBA',
        imagerySet: 'AerialWithLabels'
            // use maxZoom 19 to see stretched tiles instead of the BingMaps
            // "no photos at this zoom level" tiles
            // maxZoom: 19
    })
});

var bing_aerial = new ol.layer.Tile({
    visible: true,
    preload: Infinity,
    source: new ol.source.BingMaps({
        key: 'AitGE28HmXz2ltcsDI2E5gzWWviO20dT4H4XS6vS7DhZ9H5txt-x48f0iT1hChBA',
        imagerySet: 'Aerial'
            // use maxZoom 19 to see stretched tiles instead of the BingMaps
            // "no photos at this zoom level" tiles
            // maxZoom: 19
    })
});

var bing_road = new ol.layer.Tile({
    visible: true,
    preload: Infinity,
    source: new ol.source.BingMaps({
        key: 'AitGE28HmXz2ltcsDI2E5gzWWviO20dT4H4XS6vS7DhZ9H5txt-x48f0iT1hChBA',
        imagerySet: 'Road'
            // use maxZoom 19 to see stretched tiles instead of the BingMaps
            // "no photos at this zoom level" tiles
            // maxZoom: 19
    })
});


var roads = new ol.layer.Vector({
    title: 'roads',
    source: new ol.source.Vector({
        url: 'http://localhost:8080/geoserver/Peca/wfs?service=WFS&version=1.1.0&request=GetFeature&' +
            'typename=Peca:Roads&outputFormat=application/json&srsname=EPSG:4326',
        format: new ol.format.GeoJSON()
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(255, 51, 102, 1)',
            width: 2.0
        })
    })
});


var rails = new ol.layer.Vector({
    title: 'rails',
    source: new ol.source.Vector({
        url: 'http://localhost:8080/geoserver/Peca/wfs?service=WFS&version=1.1.0&request=GetFeature&' +
            'typename=Peca:Railroads&outputFormat=application/json&srsname=EPSG:4326',
        format: new ol.format.GeoJSON()
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(102, 102, 102, 1)',
            width: 2.0
        })
    })
});



var boundary = new ol.layer.Vector({
    title: 'boundary',
    source: new ol.source.Vector({
        url: 'http://localhost:8080/geoserver/Peca/wfs?service=WFS&version=1.1.0&request=GetFeature&' +
            'typename=Peca:National_Boundary&outputFormat=application/json&srsname=EPSG:4326',
        format: new ol.format.GeoJSON()
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 0, 1)',
            width: 6.0
        })
    })
});


var municipalities = new ol.layer.Vector({
    title: 'municipalities',
    source: new ol.source.Vector({
        url: 'http://localhost:8080/geoserver/Peca/wfs?service=WFS&version=1.1.0&request=GetFeature&' +
            'typename=Peca:Municipalities_and_Cities&outputFormat=application/json&srsname=EPSG:4326',
        format: new ol.format.GeoJSON()
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(51,102,255, 1)',
            width: 1.0
        }),
        fill: new ol.style.Fill({
            color: 'rgba(51, 102, 255, 0.3)'
        })
    })
});

source_c = new ol.source.Vector({
    url: 'http://localhost:8080/geoserver/Peca/wfs?service=WFS&version=1.1.0&request=GetFeature&' +
        'typename=Peca:First_level_Administrative_Divisions&outputFormat=application/json&srsname=EPSG:4326',
    format: new ol.format.GeoJSON()
})

var counties = new ol.layer.Vector({
    title: 'counties',
    source: source_c,
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(0,204,51, 1)',
            width: 2.0
        }),
        fill: new ol.style.Fill({
            color: 'rgba(0, 204, 51, 0.3)'
        })
    })
});

var rivers = new ol.layer.Vector({
    title: 'rivers',
    source: new ol.source.Vector({
        url: 'http://localhost:8080/geoserver/Peca/wfs?service=WFS&version=1.1.0&request=GetFeature&' +
            'typename=Peca:Rivers&outputFormat=application/json&srsname=EPSG:4326',
        format: new ol.format.GeoJSON()
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 255, 1)',
            width: 6.0
        })
    })
});


//Sloj za merenje duzine i povrsine
var source = new ol.source.Vector();

var vector = new ol.layer.Vector({
    source: source,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            })
        })
    })
});


var layers = [osm, bing_aerial_with_labels, bing_road, bing_aerial, roads, rails, rivers, municipalities, counties, boundary, vector];



var map = new ol.Map({
    layers: layers,
    target: 'map',
    view: new ol.View({
        center: ol.proj.transform([21, 44.267136], 'EPSG:4326', 'EPSG:3857'),
        zoom: 7.6
    })
});


//iskljucivanje svih slojeva
for (let i = 1; i < layers.length - 2; i++) {
    map.getLayers().getArray()[i].setVisible(false);
}


//funkcija za ukljucivanje i iskljucivanje slojeva
var putevi = document.getElementById('roads');
var pruge = document.getElementById('rails');
var okruzi = document.getElementById('counties');
var opstine = document.getElementById('municipalities');
var podloga = document.getElementById('podloga');
var zoom_opstina = document.getElementById('opstina');
var zoom_okrug = document.getElementById('okrug');
var reke = document.getElementById('rivers');

putevi.checked = false;
pruge.checked = false;
okruzi.checked = false;
opstine.checked = false;
reke.checked = false;

function roads_function() {
    var index = layers.indexOf(roads);
    var layer = map.getLayers().getArray()[index];
    if (putevi.checked == true) {
        layer.setVisible(true);
    } else {
        layer.setVisible(false);
    }

};

function rivers_function() {
    var index = layers.indexOf(rivers);
    var layer = map.getLayers().getArray()[index];
    if (reke.checked == true) {
        layer.setVisible(true);
    } else {
        layer.setVisible(false);
    }
}

function rails_function() {
    var index = layers.indexOf(rails);
    var layer = map.getLayers().getArray()[index];
    if (pruge.checked == true) {
        layer.setVisible(true);
    } else {
        layer.setVisible(false);
    }

};

function municipalities_function() {
    var index = layers.indexOf(municipalities);
    var layer = map.getLayers().getArray()[index];
    if (opstine.checked == true) {
        layer.setVisible(true);
        zoom_opstina.style.visibility = 'visible';
        //iskucujem interakciju za merenje
        map.removeInteraction(draw);
        map.addInteraction(select);
    } else {
        zoom_opstina.style.visibility = 'hidden';
        layer.setVisible(false);
    }

};

function counties_function() {
    var index = layers.indexOf(counties);
    var layer = map.getLayers().getArray()[index];
    if (okruzi.checked == true) {
        layer.setVisible(true);
        //zoom_okrug.style.visibility = 'visible';
        map.removeInteraction(draw);
        map.addInteraction(select);
    } else {
        //zoom_okrug.style.visibility = 'hidden';
        layer.setVisible(false);
    }

};



var osm_btn = document.getElementById('osm');
var bawl_btn = document.getElementById('bing_aerial_with_labels');
var ba_btn = document.getElementById('bing_aerial');
var br_btn = document.getElementById('bing_road');

var osm_index = layers.indexOf(osm);
var bawl_index = layers.indexOf(bing_aerial_with_labels);
var ba_index = layers.indexOf(bing_aerial);
var br_index = layers.indexOf(bing_road);




osm_btn.checked = true;
bawl_btn.checked = false;
ba_btn.checked = false;
br_btn.checked = false;




function osm_function() {

    var layer = map.getLayers().getArray()[osm_index];
    if (osm_btn.checked == true) {
        layer.setVisible(true);

        bawl_btn.checked = false;
        ba_btn.checked = false;
        br_btn.checked = false;


        map.getLayers().getArray()[bawl_index].setVisible(false);
        map.getLayers().getArray()[ba_index].setVisible(false);
        map.getLayers().getArray()[br_index].setVisible(false);
    } else {
        layer.setVisible(false);
    }
}

function bawl_function() {

    var layer = map.getLayers().getArray()[bawl_index];
    if (bawl_btn.checked == true) {
        layer.setVisible(true);
        osm_btn.checked = false;

        ba_btn.checked = false;
        br_btn.checked = false;

        map.getLayers().getArray()[osm_index].setVisible(false);

        map.getLayers().getArray()[ba_index].setVisible(false);
        map.getLayers().getArray()[br_index].setVisible(false);
    } else {
        layer.setVisible(false);
    }
}

function ba_function() {

    var layer = map.getLayers().getArray()[ba_index];
    if (ba_btn.checked == true) {
        layer.setVisible(true);
        osm_btn.checked = false;
        bawl_btn.checked = false;

        br_btn.checked = false;

        map.getLayers().getArray()[osm_index].setVisible(false);
        map.getLayers().getArray()[bawl_index].setVisible(false);

        map.getLayers().getArray()[br_index].setVisible(false);
    } else {
        layer.setVisible(false);
    }
}

function br_function() {

    var layer = map.getLayers().getArray()[br_index];
    if (br_btn.checked == true) {
        layer.setVisible(true);
        osm_btn.checked = false;
        bawl_btn.checked = false;
        ba_btn.checked = false;


        map.getLayers().getArray()[osm_index].setVisible(false);
        map.getLayers().getArray()[bawl_index].setVisible(false);
        map.getLayers().getArray()[ba_index].setVisible(false);

    } else {
        layer.setVisible(false);
    }
}

osm_btn.addEventListener('click', osm_function);
bawl_btn.addEventListener('click', bawl_function);
ba_btn.addEventListener('click', ba_function);
br_btn.addEventListener('click', br_function);


putevi.addEventListener('click', roads_function);
pruge.addEventListener('click', rails_function);
opstine.addEventListener('click', municipalities_function);
okruzi.addEventListener('click', counties_function);
reke.addEventListener('click', rivers_function);

//selekcija elemenata


var select = new ol.interaction.Select({
    condition: ol.events.condition.click, //zadavanje akcije na koju se dobija selekcija
    layers: [counties, municipalities] //leyeri koji se mogu selektovati
});

map.addInteraction(select); //dodavanje selekcije na mapu

select.on('select', function(e) { //funkcionalnost za selekciju

    e.selected.forEach(function(e) {


        // get Feature
        console.log(e);
        // get Properties
        console.log(e.getProperties());
        // get one specific Property
        console.log(e.get('geometry'));
        var extent = e.getProperties()['geometry']['extent_']; //uzimanje extenta za pojedinacni ojekat
        console.log(extent);
        map.getView() .fit(extent, map.getSize()); //zumiranje na objekat


        var table = document.getElementById("tabla_opstina");
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        let name;
        if (e.getProperties()['laa'] === undefined) {
            name = e.getProperties()['name_1'] + ' okrug';
        } else {
            name = 'Opstina ' + e.getProperties()['laa'];
        }
        cell1.innerHTML = name;
        cell2.innerHTML = e.getProperties()['pop'];
        cell3.innerHTML = e.getProperties()['area'];
        try {
            table.deleteRow(2)
        } catch (error) {

        }


        let njive;
        if (e.getProperties()['njiv'] === undefined) {
            njive = parseFloat(e.getProperties()['nkz_njiva']);
        } else {
            njive = parseFloat(e.getProperties()['njiv']);
        }

        let vocnjak;
        if (e.getProperties()['voc'] === undefined) {
            vocnjak = parseFloat(e.getProperties()['nkz_voc']);
        } else {
            vocnjak = parseFloat(e.getProperties()['voc'])
        }

        let vinograd;
        if (e.getProperties()['vin'] === undefined) {
            vinograd = parseFloat(e.getProperties()['nkz_vin']);
        } else {
            vinograd = parseFloat(e.getProperties()['vin'])
        }

        let livada;
        if (e.getProperties()['liv'] === undefined) {
            livada = parseFloat(e.getProperties()['nkz_livada']);
        } else {
            livada = parseFloat(e.getProperties()['liv'])
        }

        let ostalo;
        if (e.getProperties()['ostalo'] === undefined) {
            ostalo = parseFloat(e.getProperties()['nkz_ostalo']);
        } else {
            ostalo = parseFloat(e.getProperties()['ostalo'])
        }


        // Build the chart
        Highcharts.chart('container', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                width: 390
            },
            title: {
                text: 'Upotreba zemljista, ' + name
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Koriscenje zemljista',
                colorByPoint: true,
                data: [{
                    name: 'Njive',
                    y: njive,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Vocnjaci',
                    y: vocnjak
                }, {
                    name: 'Livade',
                    y: livada
                }, {
                    name: 'Vinogradi',
                    y: vinograd
                }, {
                    name: 'Ostalo',
                    y: ostalo
                }]
            }]
        });


    });
});

//zoom na opstinu ili okrug
var opstina_features;
var opstina_nazivi = [];
var opstina_extent = [];

var opstina_source = municipalities.getSource();
opstina_source.on('change', function(evt) {
    var source = evt.target;
    if (source.getState() === 'ready') {
        var opstina_features = opstina_source.getFeatures();
        var size = opstina_features.length;

        for (let i = 0; i < size; i++) {
            opstina_extent.push(opstina_features[i].getProperties()['geometry']['extent_']);
            opstina_nazivi.push(opstina_features[i].getProperties()['laa']);
        }
    }
});

var okrug_features;
var okrug_nazivi = [];
var okrug_extent = [];

var opstina_extent = [
    [
        2453048.043326855,
        5294702.57158065,
        2492483.2512390995,
        5324174.813731911
    ],
    [
        2492102.9838585495,
        5307915.335578904,
        2550304.988126178,
        5373542.543563522
    ],
    [
        2462075.664411972,
        5328043.681554993,
        2499358.7882684553,
        5370853.702777574
    ],
    [
        2444589.988416382,
        5343832.349785893,
        2468589.8583742124,
        5367064.849056424
    ],
    [
        2448380.5840571295,
        5361625.816494113,
        2523448.6043748464,
        5424101.241567512
    ],
    [
        2470327.9452437134,
        5470076.636910084,
        2525351.833708939,
        5540327.158654045
    ],
    [
        2454943.0350186294,
        5417137.48596443,
        2509143.2149117296,
        5494673.842724415
    ],
    [
        2479022.3314331407,
        5530991.968256896,
        2534070.9328253223,
        5576802.154383085
    ],
    [
        2440524.7119321027,
        5205747.15661649,
        2484278.893448144,
        5233620.632473008
    ],
    [
        2472214.866272405,
        5207703.814176076,
        2511273.7029862767,
        5253139.010624074
    ],
    [
        2456043.817803338,
        5245487.725068346,
        2504799.083103013,
        5285476.548253778
    ],
    [
        2466913.2755233753,
        5278585.066630164,
        2471094.8252157886,
        5282468.8209496355
    ],
    [
        2468950.978802346,
        5273734.810386095,
        2506557.5414393293,
        5304233.4094842775
    ],
    [
        2507179.427774646,
        5291706.996841678,
        2560997.8931338163,
        5345631.537763892
    ],
    [
        2470805.561518962,
        5291121.209566601,
        2520584.1312377537,
        5336287.456666898
    ],
    [
        2469846.711085014,
        5276988.962989908,
        2473286.705989508,
        5281333.254120065
    ],
    [
        2391137.2632442126,
        5366496.283001123,
        2440339.5876189135,
        5421146.020305814
    ],
    [
        2412770.2025290513,
        5392666.405426185,
        2459326.518267341,
        5431197.915085355
    ],
    [
        2424528.323744091,
        5449375.1549790185,
        2476667.868543118,
        5510479.178627772
    ],
    [
        2410395.034213741,
        5420507.134248739,
        2463806.793813298,
        5469457.103756768
    ],
    [
        2392910.638392295,
        5478219.454460915,
        2445706.1889505666,
        5521358.50599604
    ],
    [
        2426806.198824448,
        5496542.27122789,
        2488784.1602197844,
        5560048.882166196
    ],
    [
        2390312.051858962,
        5514373.099442025,
        2443406.439590268,
        5562091.146518292
    ],
    [
        2392832.603429249,
        5549329.03370575,
        2450398.862084957,
        5580714.151360651
    ],
    [
        2406787.2808366218,
        5322642.38992202,
        2429074.444768852,
        5352899.264085074
    ],
    [
        2423889.7951449007,
        5334865.725157165,
        2440158.8604256106,
        5355768.795118983
    ],
    [
        2418668.6327279694,
        5346359.086374554,
        2446678.175084428,
        5366880.120601461
    ],
    [
        2402899.4476206666,
        5345334.424019499,
        2431159.792789882,
        5371657.753300775
    ],
    [
        2434131.1326381364,
        5358033.378567256,
        2461597.60285876,
        5380173.41291649
    ],
    [
        2416620.743715591,
        5360274.798458788,
        2442579.0018152017,
        5385720.519220976
    ],
    [
        2438353.6479031616,
        5361763.461664375,
        2487610.574488096,
        5402660.834793165
    ],
    [
        2436032.803499358,
        5358429.333909375,
        2446554.276491175,
        5362127.209739836
    ],
    [
        2396063.09505207,
        5195821.755606124,
        2430245.024874289,
        5222556.474317437
    ],
    [
        2407002.5727318153,
        5206055.540992352,
        2444212.949301066,
        5259240.964951701
    ],
    [
        2421572.6242842935,
        5221158.639755305,
        2475578.2177074878,
        5281059.26390982
    ],
    [
        2439605.8251953498,
        5248188.919191053,
        2469846.711085014,
        5286490.039958038
    ],
    [
        2398919.274887098,
        5265043.744080461,
        2437083.9934509187,
        5310985.957361573
    ],
    [
        2415987.5584519585,
        5264873.212325616,
        2474515.227889903,
        5337994.675436025
    ],
    [
        2391763.157081198,
        5304966.104573061,
        2431474.2703513736,
        5329530.175720442
    ],
    [
        2437935.9215139598,
        5321395.361878193,
        2481293.3047050685,
        5351839.564093674
    ],
    [
        2365979.614922387,
        5458617.434963418,
        2429267.3614463964,
        5499203.0416100975
    ],
    [
        2351222.602285122,
        5475465.622359053,
        2383271.7619832326,
        5514797.380238557
    ],
    [
        2367796.571651115,
        5496615.795807701,
        2408353.6017318284,
        5545819.88674757
    ],
    [
        2350968.0702694235,
        5505796.648605077,
        2372917.323887351,
        5545349.745475958
    ],
    [
        2352133.4740185384,
        5590021.627092805,
        2400063.8618914345,
        5624731.4158173865
    ],
    [
        2361222.7661015545,
        5535879.656263406,
        2394779.970941441,
        5565658.685166987
    ],
    [
        2344031.0848811497,
        5603373.633675033,
        2396588.3004096323,
        5661438.695041973
    ],
    [
        2367958.485850474,
        5550663.3738870835,
        2404897.688140151,
        5593652.204946342
    ],
    [
        2353379.6400582236,
        5343550.107834681,
        2383425.1045818003,
        5374080.359223106
    ],
    [
        2389046.2935888977,
        5403890.529634842,
        2416989.712167825,
        5437455.24562013
    ],
    [
        2367298.4169298154,
        5424990.203496874,
        2420933.817386376,
        5463316.1328242
    ],
    [
        2378795.6609181804,
        5402227.406328872,
        2396250.278775839,
        5429337.567472756
    ],
    [
        2351333.14253948,
        5409514.163085604,
        2385031.1665352206,
        5442912.739708038
    ],
    [
        2353371.9033536133,
        5368969.841063706,
        2402284.073475561,
        5419206.783130012
    ],
    [
        2343011.1757065016,
        5440814.039005589,
        2378992.0841596853,
        5484905.505973518
    ],
    [
        2367131.994291079,
        5446299.778089558,
        2402731.9674467677,
        5475744.485179567
    ],
    [
        2350272.379111711,
        5174583.812294887,
        2379705.64209567,
        5211447.643355669
    ],
    [
        2383479.706792034,
        5229790.765562963,
        2425648.6430994347,
        5272134.7562105665
    ],
    [
        2364909.055379428,
        5196116.2859056415,
        2394800.6207069834,
        5227947.655550483
    ],
    [
        2367950.0255691735,
        5198083.964814855,
        2409676.689539652,
        5248161.782475046
    ],
    [
        2373284.733866714,
        5241917.954743971,
        2393638.8348413194,
        5256594.781085518
    ],
    [
        2347838.545424752,
        5245452.434788065,
        2393464.5641784826,
        5284087.482010162
    ],
    [
        2380985.704920302,
        5261197.005522237,
        2415989.2282443205,
        5311821.6166879395
    ],
    [
        2372918.4927420043,
        5311806.700340171,
        2413436.6166606853,
        5373323.902060795
    ],
    [
        2298252.5584250325,
        5647892.170354087,
        2339558.4347203122,
        5699877.116128126
    ],
    [
        2283706.38490333,
        5714320.707330294,
        2318009.986928986,
        5747926.728726118
    ],
    [
        2279511.97780973,
        5578821.556827064,
        2291540.9393458697,
        5592423.56890109
    ],
    [
        2273680.1166663067,
        5582966.19177218,
        2279136.2188685574,
        5592493.164659234
    ],
    [
        2312351.6728717093,
        5611587.564062164,
        2349759.2519188994,
        5662112.113949002
    ],
    [
        2275771.1419813675,
        5591276.139900227,
        2280063.3989073746,
        5595404.739873653
    ],
    [
        2279421.753362442,
        5617141.4431524845,
        2319628.683644611,
        5659054.342540174
    ],
    [
        2277904.4130431847,
        5588568.23505461,
        2281784.2312558023,
        5591717.67689686
    ],
    [
        2271848.7997232666,
        5619720.986885921,
        2294010.506589373,
        5650703.940498386
    ],
    [
        2318363.8715902176,
        5640691.191105527,
        2363742.594095151,
        5673934.543807239
    ],
    [
        2272476.252033123,
        5530201.531666611,
        2301312.7312269397,
        5561422.40860177
    ],
    [
        2309141.8310144306,
        5537747.102462251,
        2354590.462159582,
        5577569.316082059
    ],
    [
        2340175.4786577793,
        5542821.718407903,
        2381312.483285526,
        5591981.605175004
    ],
    [
        2285721.657304906,
        5549551.592352584,
        2317700.3517653444,
        5590084.458421741
    ],
    [
        2274878.971922405,
        5554911.356472479,
        2294578.569950891,
        5588881.247590632
    ],
    [
        2314712.9262506706,
        5567645.012983311,
        2369534.8254998517,
        5624768.425004034
    ],
    [
        2282020.339895775,
        5567919.900293097,
        2332365.3588434686,
        5629826.253744681
    ],
    [
        2272359.0882690633,
        5572603.497512764,
        2280977.109287806,
        5585983.295427696
    ],
    [
        2229623.7583925067,
        5696690.863296598,
        2274780.8437912706,
        5746560.4851241745
    ],
    [
        2200442.355756467,
        5700501.574963972,
        2241300.1711013042,
        5742613.247653416
    ],
    [
        2244874.8069299124,
        5716693.808802267,
        2300160.7414764655,
        5777355.921919428
    ],
    [
        2210377.7872890034,
        5734218.081410237,
        2245430.7921266793,
        5756917.3976786025
    ],
    [
        2205248.2408129945,
        5768683.112381001,
        2236354.246125359,
        5808722.129298808
    ],
    [
        2202877.0799993523,
        5750080.654863995,
        2241749.623545382,
        5778437.635456655
    ],
    [
        2232787.84793907,
        5745821.132671113,
        2271521.186461862,
        5787019.921434773
    ],
    [
        2229956.71498947,
        5777594.537993916,
        2264891.5541876685,
        5808799.296875717
    ],
    [
        2242241.488715452,
        5591550.80350613,
        2276718.1925492915,
        5612502.921011574
    ],
    [
        2228105.0265796143,
        5599003.087731966,
        2266800.1825170647,
        5638000.519857901
    ],
    [
        2232238.653231241,
        5642847.305606753,
        2261338.013402566,
        5678191.596621904
    ],
    [
        2217507.2440768583,
        5668179.272649057,
        2254316.0912428168,
        5704333.613327244
    ],
    [
        2219788.792700412,
        5621619.014315409,
        2259746.256003713,
        5653877.36750299
    ],
    [
        2242787.9560957565,
        5633243.434378809,
        2306495.9336975105,
        5719528.850984592
    ],
    [
        2214217.2521862085,
        5644466.585079493,
        2228520.6378984908,
        5657229.172548318
    ],
    [
        2270301.7370999674,
        5684921.792395959,
        2319063.347610617,
        5730608.003689425
    ],
    [
        2236175.3557036542,
        5568399.271100728,
        2265461.343001294,
        5603068.288880291
    ],
    [
        2223662.9336189996,
        5543845.191302928,
        2263361.0781684974,
        5576721.400174253
    ],
    [
        2258403.5203057644,
        5563430.49076925,
        2279971.393348234,
        5589586.526224187
    ],
    [
        2210268.137590572,
        5519632.571294612,
        2253224.6036355887,
        5556529.890011181
    ],
    [
        2256199.8953257664,
        5537664.510932965,
        2281950.542575048,
        5567992.751129706
    ],
    [
        2212194.298739768,
        5563435.73091346,
        2242654.706665277,
        5614049.039972684
    ],
    [
        2262653.7541239965,
        5585196.683618959,
        2276291.950219044,
        5595707.863733085
    ],
    [
        2258411.1456908835,
        5587089.434420118,
        2296536.958092672,
        5636788.777659366
    ],
    [
        2118448.7046385375,
        5688056.118967726,
        2161622.4106698376,
        5725079.726309746
    ],
    [
        2178713.6260498012,
        5718420.61792131,
        2202174.598352702,
        5742709.230418422
    ],
    [
        2146421.1776045626,
        5756197.000861685,
        2214774.461897374,
        5810857.10626134
    ],
    [
        2094482.7871253993,
        5711316.13973748,
        2162047.484145432,
        5786758.6803552685
    ],
    [
        2193580.0100867706,
        5695590.935185183,
        2222568.996982974,
        5731517.816788762
    ],
    [
        2152207.1194580337,
        5736615.220967495,
        2212860.935510384,
        5771370.912999475
    ],
    [
        2145074.545724436,
        5704471.211557336,
        2184948.964687605,
        5747564.2925089765
    ],
    [
        2102544.3220096664,
        5705105.128220617,
        2134240.4876024714,
        5743155.168907555
    ],
    [
        2194547.2094825283,
        5624262.357225332,
        2227159.3118455797,
        5646964.292012832
    ],
    [
        2168227.7752950382,
        5644074.146805086,
        2203910.7371311137,
        5661407.780815468
    ],
    [
        2135868.535155323,
        5644105.159301413,
        2179464.364695711,
        5700890.057370618
    ],
    [
        2177006.4859987414,
        5645126.185093262,
        2238021.032861007,
        5689704.673260744
    ],
    [
        2160990.2829413684,
        5685073.520168132,
        2201800.7875026176,
        5724135.775672776
    ],
    [
        2168343.380586227,
        5658936.093991797,
        2190345.177003809,
        5688918.941103773
    ],
    [
        2111623.2057202933,
        5663701.415173368,
        2156764.0384734017,
        5700115.094598536
    ],
    [
        2195970.484832065,
        5674645.878600299,
        2223855.627657563,
        5699917.533112941
    ],
    [
        2128766.7969206753,
        5526900.799044266,
        2178818.266371147,
        5575962.220460067
    ],
    [
        2178271.2980531347,
        5528381.364624319,
        2214678.2261975836,
        5554097.35368403
    ],
    [
        2148581.6106221327,
        5539398.154344028,
        2209900.727611209,
        5609932.121007065
    ],
    [
        2186116.5391667904,
        5543217.593280528,
        2226441.3567897086,
        5577123.533498477
    ],
    [
        2190629.9879210037,
        5573631.819136065,
        2229170.743724724,
        5638591.586237765
    ],
    [
        2147829.5361423334,
        5579192.914525132,
        2190207.2521547163,
        5612300.67111528
    ],
    [
        2113901.9713565772,
        5598787.399306565,
        2171942.5067028096,
        5654313.2108045025
    ],
    [
        2136650.276279419,
        5604051.524993485,
        2206807.5485802814,
        5648793.142303124
    ],
    [
        2339059.1111443588,
        5487855.622901893,
        2354029.9685234376,
        5500471.6565737
    ],
    [
        2334703.51342809,
        5497637.514776532,
        2357311.5557925324,
        5545530.758307427
    ],
    [
        2334018.954219457,
        5275247.3515685275,
        2386351.860973992,
        5333055.036556472
    ],
    [
        2329192.1967584062,
        5291683.834995721,
        2391763.157081198,
        5353779.662030878
    ],
    [
        2317583.5776195023,
        5334237.17743029,
        2362639.8632193524,
        5381730.292228396
    ],
    [
        2312563.2912237076,
        5370529.973003985,
        2363747.8817709633,
        5396357.219219616
    ],
    [
        2325642.9974334445,
        5388974.222673432,
        2358786.8173442706,
        5427782.285844269
    ],
    [
        2329322.8858405976,
        5423191.0302212825,
        2367361.702060331,
        5454823.726431637
    ],
    [
        2331944.960786488,
        5475528.365754368,
        2357994.890486767,
        5495706.7567423275
    ],
    [
        2315969.9459407083,
        5482946.808860944,
        2343990.174968283,
        5509676.055473605
    ],
    [
        2322617.1110347016,
        5181884.790129591,
        2354191.3817850878,
        5210789.8761642575
    ],
    [
        2311083.799531319,
        5237684.607920598,
        2336205.1576991463,
        5269978.918480464
    ],
    [
        2333469.5925323926,
        5203878.026228667,
        2372080.312636076,
        5231067.869271324
    ],
    [
        2333902.7366710687,
        5246692.132282952,
        2352870.6873463164,
        5261384.804988104
    ],
    [
        2326905.36045904,
        5216874.535458769,
        2353044.2900922084,
        5235468.926172995
    ],
    [
        2321242.2596636596,
        5227872.680498864,
        2375460.6402935046,
        5254959.741426214
    ],
    [
        2333302.2236779844,
        5258501.08450485,
        2352427.9140716866,
        5282587.627582015
    ],
    [
        2320654.5484120166,
        5264224.659531164,
        2350889.6456881594,
        5303876.474291366
    ],
    [
        2286846.9860373354,
        5434080.788736894,
        2327547.2843026994,
        5476842.667446326
    ],
    [
        2287658.9504031814,
        5438719.365494635,
        2350376.407175857,
        5494509.515659451
    ],
    [
        2241861.221334902,
        5483950.56653037,
        2275047.0643535033,
        5515380.934680859
    ],
    [
        2286976.283625892,
        5516063.883120609,
        2321428.274532775,
        5554112.589196462
    ],
    [
        2279268.689062602,
        5485328.964615924,
        2320947.096033821,
        5521406.695490264
    ],
    [
        2270956.128726595,
        5495848.74689999,
        2300784.1306249076,
        5534330.045416078
    ],
    [
        2247682.8410851727,
        5506198.846960017,
        2277152.060264658,
        5553215.378244615
    ],
    [
        2309617.053920627,
        5506882.430473987,
        2342695.9745683204,
        5548433.622080844
    ],
    [
        2280449.454901446,
        5283011.656617709,
        2315145.4581321483,
        5317352.960089227
    ],
    [
        2308532.2454828466,
        5283817.963993754,
        2347103.4471672988,
        5323216.895564532
    ],
    [
        2300509.7280801022,
        5295645.4946640665,
        2325313.992678405,
        5320988.483385218
    ],
    [
        2251603.791849639,
        5306065.216728744,
        2303561.3292812183,
        5359535.375373931
    ],
    [
        2266031.744072119,
        5343016.498420263,
        2321429.944325137,
        5382254.089910435
    ],
    [
        2292494.0011662967,
        5309533.529137713,
        2338198.166202564,
        5352846.444385879
    ],
    [
        2262466.6817197185,
        5371256.791607208,
        2333443.4881118014,
        5447103.700469695
    ],
    [
        2308190.8286045836,
        5390370.793031828,
        2334062.5358001026,
        5420489.42440582
    ],
    [
        2282627.9773362703,
        5205439.835757249,
        2312848.2134603923,
        5242030.131713694
    ],
    [
        2306717.181185462,
        5196698.457423786,
        2336137.5311084897,
        5238810.7673705
    ],
    [
        2279556.728245029,
        5168982.913892027,
        2336143.3197220108,
        5213182.6331413165
    ],
    [
        2245003.380941779,
        5198702.801935197,
        2294307.673970046,
        5245185.003744673
    ],
    [
        2288480.098627018,
        5138954.888439437,
        2312834.0758850616,
        5179107.367478334
    ],
    [
        2278006.4373564967,
        5235111.421782656,
        2316317.930668928,
        5268643.048825822
    ],
    [
        2295549.6655288264,
        5251700.494893084,
        2331612.5607869793,
        5291120.678015822
    ],
    [
        2262020.9584785826,
        5263471.516032085,
        2299175.452663454,
        5295379.442787452
    ],
    [
        2191641.5481338417,
        5457307.285974624,
        2228895.617603228,
        5489593.410401521
    ],
    [
        2181194.714860602,
        5476299.602356973,
        2236086.467090256,
        5536964.18982928
    ],
    [
        2219356.873076134,
        5480146.91620314,
        2249351.186293692,
        5515686.769137788
    ],
    [
        2138602.820147933,
        5506663.398375243,
        2179521.1932957615,
        5540911.179500655
    ],
    [
        2126496.9925034004,
        5506027.861921464,
        2147450.0479982193,
        5541365.5652119275
    ],
    [
        2163611.634310568,
        5498084.237250472,
        2192280.2993720137,
        5537645.559441271
    ],
    [
        2142089.9588567773,
        5480801.739437156,
        2186761.858254919,
        5518919.936147415
    ],
    [
        2231760.6473377747,
        5507304.497904578,
        2254012.3560121874,
        5542546.7308995435
    ],
    [
        2168363.7520530424,
        5399265.80439085,
        2217827.677231107,
        5441762.342731516
    ],
    [
        2213078.8434136114,
        5399289.08167496,
        2248552.747245977,
        5433925.639096706
    ],
    [
        2238425.8461892763,
        5406731.058021715,
        2276585.833674738,
        5450839.37459848
    ],
    [
        2216765.0213719946,
        5424334.874650484,
        2245355.039213195,
        5484069.191949635
    ],
    [
        2158620.7362603424,
        5418625.076010651,
        2223796.6283274423,
        5462213.22527485
    ],
    [
        2141221.4998493535,
        5435981.660986271,
        2203809.659033473,
        5491653.164574183
    ],
    [
        2238317.58798448,
        5423694.150248276,
        2297117.0439591957,
        5466547.490800883
    ],
    [
        2233922.750147707,
        5456957.011642845,
        2299132.5389997535,
        5507055.45244399
    ],
    [
        2227979.3468745085,
        5242612.340282391,
        2285166.618323811,
        5287084.115083593
    ],
    [
        2185545.859797239,
        5364340.381073531,
        2233369.770577192,
        5409615.681942151
    ],
    [
        2164302.4830704313,
        5336212.221694047,
        2215124.0607582107,
        5387858.453004286
    ],
    [
        2199847.0747794504,
        5313011.043695889,
        2259626.6432108553,
        5378711.3834556
    ],
    [
        2217048.4964552997,
        5354084.766836458,
        2275896.487728001,
        5415078.194719418
    ],
    [
        2233507.5284470483,
        5286478.199824292,
        2286371.4848324116,
        5340067.307529642
    ],
    [
        2234494.2644134397,
        5227265.887204286,
        2277160.910164176,
        5260113.579479024
    ],
    [
        2139723.362142258,
        5371474.158949283,
        2193601.8287069662,
        5409740.890067651
    ]
]


var okrug_extent = [
    [
        2340013.8828321644,
        5475579.668481647,
        2451967.5885943593,
        5590942.4705291595
    ],
    [
        2378820.5374847883,
        5259509.86085813,
        2512202.940209284,
        5335674.991432658
    ],
    [
        2388279.408050848,
        5320299.54998813,
        2488162.644578372,
        5434997.22272629
    ],
    [
        2394712.432293182,
        5195136.336750682,
        2508956.4887110684,
        5284842.659303082
    ],
    [
        2409621.262451991,
        5361606.863089794,
        2520871.748519311,
        5491570.90983898
    ],
    [
        2423698.8399167834,
        5446216.85707874,
        2534249.5015336983,
        5576854.169560304
    ],
    [
        2461675.0912431064,
        5288376.118133965,
        2558008.678714926,
        5371512.873541217
    ],
    [
        2307763.1903279214,
        5494249.591508773,
        2358033.91242107,
        5573857.7679983685
    ],
    [
        2222070.0619120435,
        5502729.555510949,
        2319794.802381137,
        5634491.796054167
    ],
    [
        2228719.0214762287,
        5632037.772793132,
        2340356.788052019,
        5748641.748508907
    ],
    [
        2113994.049273387,
        5560786.749741247,
        2262401.210274404,
        5656786.6225072965
    ],
    [
        2111358.2452946976,
        5640411.62356556,
        2258450.690826793,
        5744395.911425407
    ],
    [
        2148165.434913438,
        5719489.070938146,
        2213074.0611282866,
        5810752.78051121
    ],
    [
        2093755.0103508553,
        5690118.4495921945,
        2183202.8950974196,
        5786494.995044713
    ],
    [
        2269998.8389919084,
        5563499.574883525,
        2400235.85718388,
        5673991.260077113
    ],
    [
        2200220.9624399827,
        5716225.077236361,
        2300244.5461287196,
        5809289.916754994
    ],
    [
        2325895.539056648,
        5289239.1284942925,
        2428421.161884352,
        5371010.3393483395
    ],
    [
        2311025.352345873,
        5331132.136915072,
        2400853.2985319295,
        5440862.320801927
    ],
    [
        2230143.9354486703,
        5284437.398054821,
        2332921.5889431154,
        5443673.476120546
    ],
    [
        2134102.0829663733,
        5309710.543173436,
        2257794.8186509376,
        5487910.601502367
    ],
    [
        2214552.4808139782,
        5351607.022563523,
        2297289.4066059603,
        5502940.573277594
    ],
    [
        2269702.4330365527,
        5430706.560300266,
        2353193.1131194504,
        5530497.767079895
    ],
    [
        2327508.147709321,
        5417140.641787952,
        2428741.560529558,
        5510210.040140999
    ],
    [
        2162461.070562771,
        5473530.9491196675,
        2273596.2630334767,
        5553267.6256192345
    ],
    [
        2126391.710981788,
        5479406.508457411,
        2223170.3304007053,
        5612380.403585554
    ]
]



function zoomToOpstina() {
    let izbor = zoom_opstina.value;
    let extent = opstina_extent[izbor];
    map.getView().fit(extent, map.getSize()); //zumiranje na objekat
}

zoom_opstina.addEventListener('change', zoomToOpstina);


/**
 * Currently drawn feature.
 * @type {module:ol/Feature~Feature}
 */
var sketch;


/**
 * The help tooltip element.
 * @type {Element}
 */
var helpTooltipElement;


/**
 * Overlay to show the help messages.
 * @type {module:ol/Overlay}
 */
var helpTooltip;


/**
 * The measure tooltip element.
 * @type {Element}
 */
var measureTooltipElement;


/**
 * Overlay to show the measurement.
 * @type {module:ol/Overlay}
 */
var measureTooltip;


/**
 * Message to show when the user is drawing a polygon.
 * @type {string}
 */
continuePolygonMsg = '';


/**
 * Message to show when the user is drawing a line.
 * @type {string}
 */
var continueLineMsg = continuePolygonMsg;


/**
 * Handle pointer move.
 * @param {module:ol/MapBrowserEvent~MapBrowserEvent} evt The event.
 */
var pointerMoveHandler = function(evt) {
    if (evt.dragging) {
        return;
    }
    /** @type {string} */
    var helpMsg = '';

    if (sketch) {
        var geom = (sketch.getGeometry());
        if (geom instanceof ol.geom.Polygon) {
            helpMsg = continuePolygonMsg;
        } else if (geom instanceof ol.geom.LineString) {
            helpMsg = continueLineMsg;
        }
    }

    helpTooltipElement.innerHTML = helpMsg;
    helpTooltip.setPosition(evt.coordinate);

    helpTooltipElement.classList.remove('hidden');
};


map.on('pointermove', pointerMoveHandler);

map.getViewport().addEventListener('mouseout', function() {
    helpTooltipElement.classList.add('hidden');
});

var typeSelect = document.getElementById('type');

var draw; // global so we can remove it later


/**
 * Format length output.
 * @param {module:ol/geom/LineString~LineString} line The line.
 * @return {string} The formatted length.
 */
var formatLength = function(line) {
    var length = ol.sphere.getLength(line);
    var output;
    if (length > 100) {
        output = (Math.round(length / 1000 * 100) / 100) +
            ' ' + 'km';
    } else {
        output = (Math.round(length * 100) / 100) +
            ' ' + 'm';
    }
    return output;
};


/**
 * Format area output.
 * @param {module:ol/geom/Polygon~Polygon} polygon The polygon.
 * @return {string} Formatted area.
 */
var formatArea = function(polygon) {
    var area = ol.sphere.getArea(polygon);
    var output;
    if (area > 10000) {
        output = (Math.round(area / 1000000 * 100) / 100) +
            ' ' + 'km<sup>2</sup>';
    } else {
        output = (Math.round(area * 100) / 100) +
            ' ' + 'm<sup>2</sup>';
    }
    return output;
};

function addInteraction() {
    var type = (typeSelect.value == 'area' ? 'Polygon' : 'LineString');
    draw = new ol.interaction.Draw({
        source: source,
        type: type,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 0, 0.5)',
                lineDash: [10, 10],
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 5,
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.7)'
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                })
            })
        })
    });
    map.addInteraction(draw);

    createMeasureTooltip();
    createHelpTooltip();

    var listener;
    draw.on('drawstart',
        function(evt) {
            // set sketch
            sketch = evt.feature;

            /** @type {module:ol/coordinate~Coordinate|undefined} */
            var tooltipCoord = evt.coordinate;

            listener = sketch.getGeometry().on('change', function(evt) {
                var geom = evt.target;
                var output;
                if (geom instanceof ol.geom.Polygon) {
                    output = formatArea(geom);
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof ol.geom.LineString) {
                    output = formatLength(geom);
                    tooltipCoord = geom.getLastCoordinate();
                }
                measureTooltipElement.innerHTML = output;
                measureTooltip.setPosition(tooltipCoord);
            });
        }, this);

    draw.on('drawend',
        function() {
            measureTooltipElement.className = 'tooltip tooltip-static';
            measureTooltip.setOffset([0, -7]);
            // unset sketch
            sketch = null;
            // unset tooltip so that a new one can be created
            measureTooltipElement = null;
            createMeasureTooltip();
            ol.Observable.unByKey(listener);
        }, this);
}


/**
 * Creates a new help tooltip
 */
function createHelpTooltip() {
    if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'tooltip hidden';
    helpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
    });
    map.addOverlay(helpTooltip);
}


/**
 * Creates a new measure tooltip
 */
function createMeasureTooltip() {
    if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'tooltip tooltip-measure';
    measureTooltip = new ol.Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center'
    });
    map.addOverlay(measureTooltip);
}


/**
 * Let user change the geometry type.
 */
typeSelect.onchange = function() {
    map.removeInteraction(draw);
    map.removeInteraction(select);
    addInteraction();
};

addInteraction();