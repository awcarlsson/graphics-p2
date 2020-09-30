window.onload = function() {

    var canvas = document.getElementById('p2Canvas')

    var xSlider = document.getElementById('x')
    var ySlider = document.getElementById('y')

    var context = canvas.getContext('2d')

    var radarAngle = 0
    var plane1Angle = 0
    var plane2Angle = 0
    var plane3Angle = 0

    function draw() {

        radarAngle = (radarAngle + 0.005) % (2*Math.PI)
        plane1Angle = (plane1Angle + 0.008) % (2*Math.PI)
        plane2Angle = (plane2Angle + 0.01) % (2*Math.PI)
        plane3Angle = (plane3Angle + 0.02) % (2*Math.PI)

        // clear old frame
        canvas.width = canvas.width
        context.fillStyle = "#79b0fc";
        var grd = context.createLinearGradient(0, 0, 1000, 200);
        grd.addColorStop(0, "#6eabff");
        grd.addColorStop(0.4, "#4f9bff");
        //grd.addColorStop(0.7, "#8fbfff");
        grd.addColorStop(0.8, "#c2dcff");
        grd.addColorStop(1, "#549dff");
        context.fillStyle = grd
        context.fillRect(0, 0, canvas.width, canvas.height);

        x = parseInt(xSlider.value)
        y = parseInt(ySlider.value)
        //x = 500
        //y = 500

        // draws battleship
        drawBoat()

        // draw circling planes
        drawPlanes()

        window.requestAnimationFrame(draw);
    }

    function drawBoat() {

        // battleship shadow
        context.lineWidth = 10
        context.strokeStyle = "#404f63"
        shadowOffset = 10
        context.beginPath()
        context.moveTo(x+shadowOffset, y+shadowOffset)
        context.lineTo(x+100+shadowOffset, y-5+shadowOffset)
        context.lineTo(x+110+shadowOffset, y-15+shadowOffset)
        context.lineTo(x+220+shadowOffset, y-5+shadowOffset)
        context.lineTo(x+220+shadowOffset, y+50+shadowOffset)
        context.lineTo(x+110+shadowOffset, y+65+shadowOffset)
        context.lineTo(x+100+shadowOffset, y+55+shadowOffset)
        context.lineTo(x+shadowOffset,y+50+shadowOffset)
        context.closePath()
        context.fillStyle="#404f63";
        context.fill()

        // battleship body
        context.lineWidth = 10
        context.strokeStyle = "#7a8187"
        context.beginPath()
        context.moveTo(x, y)
        context.lineTo(x+100, y-5)
        context.lineTo(x+110, y-15)
        context.lineTo(x+220, y-5)
        context.lineTo(x+220, y+50)
        context.lineTo(x+110, y+65)
        context.lineTo(x+100, y+55)
        context.lineTo(x,y+50)
        context.closePath()
        context.fillStyle="#989b9e";
        context.fill()
        context.stroke()

        // runway
        context.lineWidth = 4
        context.strokeStyle = "white"
        context.beginPath()
        context.moveTo(x+5, y+10)
        context.lineTo(x+120, y+10)
        context.moveTo(x+5, y+40)
        context.lineTo(x+120, y+40)
        context.moveTo(x+5, y+25)
        for (i = 5; i < 120; i+=10) {
            context.lineTo(x+i, y+25)
            context.moveTo(x+i+5, y+25)
        }
        context.closePath()
        context.stroke()

        // bridge
        context.strokeStyle = "#545557"
        context.beginPath()
        context.moveTo(x+160, y-10)
        context.lineTo(x+210, y-6)
        context.lineTo(x+209, y+15)
        context.lineTo(x+158, y+11)
        context.closePath()
        context.fillStyle="#696969";
        context.fill()
        context.stroke()

        // rotating radar
        context.save()
        context.translate(x+184,y+2)
        context.rotate(radarAngle)
        drawRadar()
        context.restore()
    }

    function drawRadar() {
        context.strokeStyle = "#4e5052"
        context.lineWidth = 10
        context.beginPath()
        context.moveTo(-20,0)
        context.lineTo(20,0)
        context.stroke()
    }

    function drawPlanes() {
        
        distanceFromShip1 = -290
        distanceFromPlane2 = -140
        distanceFromShip3 = -100

        context.lineWidth = 5

        // canvas transformation + rotation
        context.save() // saves initial canvas
        context.translate(x+110, y+25) // centers canvas on center of ship
        context.save() // saves centered on ship
        context.rotate(plane1Angle) // rotates plane 1 around ship
        drawPlane1(distanceFromShip1)
        context.translate(0, distanceFromShip1) // centers canvas on plane 1
        context.rotate(plane2Angle) // rotates plane 2 around plane 1
        drawPlane2(distanceFromPlane2)
        context.restore() // restores centered on ship
        context.save() // saves centered on ship
        context.scale(-1,1) // reverses canvas
        context.rotate(plane3Angle) // rotates plane 3 around ship
        drawPlane2(distanceFromShip3)
        context.restore() // restores centered on ship
        context.restore() // restores initial canvas
    }

    function drawPlane1(distanceFromShip1) {

        // main wings
        context.strokeStyle = "#363d35"
        context.beginPath()
        context.moveTo(10,distanceFromShip1-5)
        context.lineTo(-8,distanceFromShip1-55)
        context.lineTo(2,distanceFromShip1-55)
        context.lineTo(30,distanceFromShip1-5)
        context.lineTo(30,distanceFromShip1+7)
        context.lineTo(2,distanceFromShip1+57)
        context.lineTo(-8,distanceFromShip1+57)
        context.lineTo(10,distanceFromShip1+7)
        context.closePath()
        context.fillStyle="#363d35"
        context.fill()

        // tail fins
        context.beginPath()
        context.moveTo(-32,distanceFromShip1)
        context.lineTo(-42, distanceFromShip1-20)
        context.lineTo(-38,distanceFromShip1-20)
        context.lineTo(-26, distanceFromShip1)
        context.lineTo(-26, distanceFromShip1+2)
        context.lineTo(-38,distanceFromShip1+22)
        context.lineTo(-42, distanceFromShip1+22)
        context.lineTo(-32,distanceFromShip1+2)
        context.closePath()
        context.fillStyle="#363d35"
        context.fill()
        context.stroke()

        // plane body
        context.strokeStyle = "#4f5c4d"
        context.beginPath()
        context.moveTo(-40,distanceFromShip1)
        context.lineTo(-20,distanceFromShip1-5)
        context.lineTo(50,distanceFromShip1-5)
        context.arc(50, distanceFromShip1+1, 6, 3 * Math.PI/2, Math.PI/2)
        context.lineTo(-20, distanceFromShip1+7)
        context.lineTo(-40,distanceFromShip1+2)
        context.closePath()
        context.fillStyle="#4f5c4d"
        context.fill()
    }

    function drawPlane2(distanceFromObject) {

        context.lineWidth = 2
        context.strokeStyle="#4d637a"
        context.beginPath()
        context.moveTo(-20,distanceFromObject)
        context.lineTo(-18, distanceFromObject-8)
        context.lineTo(-12, distanceFromObject-8)
        context.lineTo(-6, distanceFromObject)
        context.lineTo(-2, distanceFromObject-20)
        context.lineTo(4, distanceFromObject-20)
        context.lineTo(16, distanceFromObject)
        context.lineTo(32, distanceFromObject+2)
        context.lineTo(36, distanceFromObject+6)
        context.lineTo(50, distanceFromObject+10) // point
        context.lineTo(36, distanceFromObject+14)
        context.lineTo(32, distanceFromObject+18)
        context.lineTo(16, distanceFromObject+20)
        context.lineTo(4, distanceFromObject+40)
        context.lineTo(-2, distanceFromObject+40)
        context.lineTo(-6, distanceFromObject+20)
        context.lineTo(-12, distanceFromObject+28)
        context.lineTo(-18, distanceFromObject+28)
        context.lineTo(-20,distanceFromObject+20)
        context.lineTo(-14,distanceFromObject+14)
        context.lineTo(-14,distanceFromObject+6)
        context.closePath()
        context.fillStyle="#697f96"
        context.fill()
        context.stroke()

        context.beginPath()
        context.strokeStyle="#091e33"
        context.fillStyle="#091e33"
        context.ellipse(24, distanceFromObject+10, 8, 4, 0, 0, 2*Math.PI)
        context.closePath()
        context.fill()
    }

    window.requestAnimationFrame(draw);
    draw()
}