<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
<%@ include file="./shared/head.jsp" %>
    <title>Spring boot tutorial</title>

<link href="/style/index.css"   rel="stylesheet" type="text/css" />
</head>
<body>
<%@ include file="./shared/header.jsp" %>


<div class="container">


<div class="card hovercard">
   <div class="cardTop">
   <h2>Device 1</h2>

   </div>
   <div class="avatar device-icon">
      <img src="/images/Raspberry_Pi_3_illustration.svg" alt="" />
   </div>
   <div class="info">
      <div class="title">
         Geo Device
      </div>
      <div class="desc">TODO Add a chart</div>
   </div>
   <div class="bottom">
      <button class="btn btn-default" onclick="window.location.href='/device?device=device1'">View Device</button>
   </div>
</div>


<div class="card hovercard">
   <div class="cardTop">
   <h2>Device 2</h2>

   </div>
   <div class="avatar device-icon">
      <img src="/images/Raspberry_Pi_3_illustration.svg" alt="" />
   </div>
   <div class="info">
      <div class="title">
         Geo Device
      </div>
      <div class="desc">TODO Add a chart</div>
   </div>
   <div class="bottom">
      <button class="btn btn-default" onclick="window.location.href='/device?device=device2'">View Device</button>
   </div>
</div>

<div class="card hovercard">
   <div class="cardTop">
   <h2>Device 3</h2>

   </div>
   <div class="avatar device-icon">
      <img src="/images/Raspberry_Pi_3_illustration.svg" alt="" />
   </div>
   <div class="info">
      <div class="title">
         Geo Device
      </div>
      <div class="desc">TODO Add a chart</div>
   </div>
   <div class="bottom">
      <button class="btn btn-default" onclick="window.location.href='/device?device=device3'">View Device</button>
   </div>
</div>


</div>

<%@ include file="./shared/footer.jsp" %>
</body>
</html>