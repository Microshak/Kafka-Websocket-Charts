<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
<%@ include file="./shared/head.jsp" %>
    <title>Device Detail</title>


    <script src="/webjars/sockjs-client/sockjs.min.js"></script>
    <script src="/webjars/stomp-websocket/stomp.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js"></script>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet" type="text/css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>


<link href="/style/main.css"   rel="stylesheet" type="text/css" />
</head>
<body>
<%@ include file="./shared/header.jsp" %>


<div id="main-content" class="container" style="margin-top:40px;">


<div class="chartContainer" >
<div id="accelerometerChart"></div>
</div>
<div class="chartContainer" >
<canvas id="CompassChart"></canvas>

</div>
<div class="chartContainer" >
    <canvas id="GyroscopeChart"></canvas>

</div>
</div>

<script src="/app.js"></script>


</div>
<%@ include file="./shared/footer.jsp" %>
</body>
</html>