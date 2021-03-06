var stompClient = null;
var x = 0;
var compass = {}
var compassChart = {}
var gyroscopeConfig = {}
var gyroscopeChart = {}
var accelerometerConfig = [];
var accelerometerConfig2 = 0;
$(function()
{

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
});
function setConnected(connected) {
   /* $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected)
    {
        $("#conversation").show();
    }
    else
    {
        $("#conversation").hide();
    }
    $("#greetings").html("");
    */
}

function connect() {


    var socket = new SockJS('/microsocket');
    stompClient = Stomp.over(socket);
    var topic = getUrlVars()['device']
    stompClient.connect({}, function (frame) {
    setConnected(true);

    console.log('subscribing to /topic/' + topic)
     stompClient.subscribe('/topic/' + topic, function (greeting) {
                    showTopicResponse(greeting.body);
                });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function showTopicResponse(message)
{

    mess = JSON.parse(message)
    //console.log(mess)
    if(mess.hasOwnProperty('compass'))
    {

    if(x++ == 0)
    {
        var temp  =  MakeXYZChart(mess['compass'], 'CompassChart', 'Compass x,y,z')
        compass = temp.config;
        compassChart = temp.chart;

        var temp  =  MakeXYZChart(mess['gyroscope'], 'GyroscopeChart','Gyroscope')
        gyroscopeConfig = temp.config;
        gyroscopeChart= temp.chart;

//        accelerometerConfig  =  MakeMeshChart(mess['accelerometer'], 'accelerometerChart',accelerometerConfig)

    accelerometerConfig2  =  MakeGageChart(mess['accelerometer'], 'gd',accelerometerConfig2)


    }
    AddXYZChart(mess['compass'], compass,compassChart)
    AddXYZChart(mess['gyroscope'], gyroscopeConfig,gyroscopeChart)
   // AddMeshChart(mess['accelerometer'],'accelerometerChart',accelerometerConfig)
    AddGageChart(mess['accelerometer'],'gd',accelerometerConfig2)

    if(x > 15)
    {
    $("#greetings  tr:first-child").remove();

     RemoveXYZChart(mess['compass'],compass,compassChart)
    RemoveXYZChart(mess['gyroscope'], gyroscopeConfig,gyroscopeChart)
    // RemoveMeshChart('accelerometerChart',accelerometerConfig)


    }


}else if(mess.hasOwnProperty('button'))
              {
             var action = 'success'
              if(mess['button'] == 'held')
                action = 'error'
              toastr[action](mess['direction'])

              }

}

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};
function MakeGageChart(rawData, chartName, config)
{
var config = [{
  "domain": {"x": [20000, 8], "y": [0, 1]}, "value": 0, "title": {"text": "Speed"},
  "type": "indicator", "mode": "gauge+number", "delta": {"reference": 100},
  "gauge": {"axis": {"range": [null, 100]}}}];

var layout = {width: 600, height: 400};
Plotly.newPlot(chartName,config,layout);

return config
}

function AddGageChart(data,webChart,config)
{
config[0].value =  data['x'] * 100
Plotly.redraw(webChart);
}


function MakeMeshChart(rawData, chartName,config)
{

a=[]; b=[]; c=[];

config = [
      {
      opacity:0.8,
      color:'rgb(300,100,200)',
      type: 'mesh3d',
      x: a,
      y: b,
      z: c,
    }]
Plotly.newPlot(chartName, config,{},{displayModeBar: false});

return config;
}

function AddMeshChart(data,webChart,config)
{
config[0].x.push(data['x'])
config[0].y.push(data['y'])
config[0].z.push(data['z'])
Plotly.redraw(webChart);
}
function AddXYZChart(data,objConfig,objChart)
{
objConfig.data.datasets[0].data.push(data['x'])
objConfig.data.datasets[1].data.push(data['y'])
//objChart.data.datasets[2].push(data['z'])

//console.log(objConfig.data.datasets[0].data)

//objConfig.data.labels.push(month)
objChart.update()
}
function RemoveMeshChart(data,config)
{
config[0].x.shift()
config[0].y.shift()
config[0].z.shift()
}
function RemoveXYZChart(data,objConfig,objChart)
{
objConfig.data.datasets[0].data.shift()
objConfig.data.datasets[1].data.shift()
//objConfig.data.labels.splice(-1, 1)
//objChart.data.datasets[2].pop()
objChart.update()
}

function MakeXYZChart(data,chart, chartText ){

var objConfig = {
			type: 'line',
			data: {
				labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11', '12', '13', '4', '15'],
				datasets: [{
					label: 'X',
					backgroundColor: window.chartColors.red,
					borderColor: window.chartColors.red,
					data: [

					],
					fill: false,
				}, {
					label: 'Y',
					fill: false,
					backgroundColor: window.chartColors.blue,
					borderColor: window.chartColors.blue,
					data: [

					],
				}]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: chartText
				},

				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Month'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Value'
						}
					}]
				}
			}
		};

			var ctx = document.getElementById(chart).getContext('2d');
			objChart = new Chart(ctx, objConfig);

            objConfig.data.datasets[0].data.push(data['x'])
            objConfig.data.datasets[1].data.push(data['y'])
            //objChart.data.datasets[2].push(data['z'])
            objChart.update();


return {'config':objConfig, 'chart':objChart};
}

$(function () {


   connect();
});






function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}









