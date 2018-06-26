var stompClient = null;
var x = 0;
var compass = {}
var compassChart = {}
var gyroscopeConfig = {}
var gyroscopeChart = {}


function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {


    var socket = new SockJS('/microsocket');
    stompClient = Stomp.over(socket);
 var topic = $('#topic').val()
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);


        console.log('subscribing to /topic/' + topic)
        stompClient.subscribe('/topic/' + topic, function (greeting) {
                    showGreeting(greeting.body);
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

function sendName() {
 var topic = $('#topic').val()
 alert(topic    )
    stompClient.send("/app/hello/"+ topic, {}, JSON.stringify({'name': $("#name").val()}));
 //    stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));

}

function showGreeting(message) {

//message2 = message.replace('\\{','').replace('\\"','"').replace('"}','}').replace(String.fromCharCode(92),'')
mess = JSON.parse(message)
console.log(mess)


   // $("#greetings").append("<tr><td>" + mess+ "</td></tr>");
    if(x++ == 0)
    {
    var temp  =  MakeXYZChart(mess['compass'], 'CompassChart',compass)
    compass = temp.config;
    compassChart = temp.chart;


    var temp  =  MakeXYZChart(mess['gyroscope'], 'GyroscopeChart',gyroscopeConfig)
        gyroscopeConfig = temp.config;
        gyroscopeChart= temp.chart;




    }
    AddXYZChart(mess['compass'], compass,compassChart)
    AddXYZChart(mess['gyroscope'], gyroscopeConfig,gyroscopeChart)


    if(x > 10)
    {
    $("#greetings  tr:first-child").remove();

     RemoveXYZChart(mess['compass'],compass,compassChart)
    RemoveXYZChart(mess['gyroscope'], gyroscopeConfig,gyroscopeChart)
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

function AddXYZChart(data,objConfig,objChart)
{
objConfig.data.datasets[0].data.push(data['x'])
objConfig.data.datasets[1].data.push(data['y'])
//objChart.data.datasets[2].push(data['z'])
var month = MONTHS[objConfig.data.labels.length % MONTHS.length];



objConfig.data.labels.push(month)
console.log('adding' + data['x'])
objChart.update()
}

function RemoveXYZChart(data,objConfig,objChart)
{
objConfig.data.datasets[0].data.shift()
objConfig.data.datasets[1].data.shift()
objConfig.data.labels.splice(-1, 1)
//objChart.data.datasets[2].pop()
objChart.update()
}

function MakeXYZChart(data,chart, objConfig,objChart ){

var objConfig = {
			type: 'line',
			data: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [{
					label: 'My First dataset',
					backgroundColor: window.chartColors.red,
					borderColor: window.chartColors.red,
					data: [

					],
					fill: false,
				}, {
					label: 'My Second dataset',
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
					text: 'Chart.js Line Chart'
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
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});
















