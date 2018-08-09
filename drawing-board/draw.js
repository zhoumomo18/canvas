var canvasX = document.getElementById('canvas');
var context = canvasX.getContext('2d');
var colorX = null;

setCanvasSize(canvasX);//设置画布

listenCanvasChange(canvasX);//基本画图动作


//工具函数
function setCanvasSize(tag) { //制作画布
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    tag.height = pageHeight;
    tag.width = pageWidth;
    window.onresize = function () {//当视口改变更新宽高
        setCanvasSize(canvasX);
    }
}

function listenCanvasChange(canvas) {//画图的配置
    var onOff = false;
    var switcher = true;
    var eraser = document.getElementsByClassName('eraser');
    var pen = document.getElementsByClassName('pen');
    var reset = document.getElementsByClassName('reset');
    var download = document.getElementsByClassName('download');
    var li = document.getElementsByTagName('li');
    var jiacu = document.getElementsByClassName('jiacu')
    var lastPoint = { x: undefined, y: undefined };
    var lineWidth = 2.5;

    li[0].onclick = function () {
        colorX = "red";
        for (var index = 0;  index < li.length; index++) {
            li[index].classList.remove('active');
        }
        this.classList.add('active');
        context.fillStyle = 'red'
        context.strokeStyle = 'red'
    }
    li[1].onclick = function () {
        colorX = "black";
        for (var index = 0;  index < li.length; index++) {
            li[index].classList.remove('active');
        }
        this.classList.add('active');
        context.fillStyle = 'black'
        context.strokeStyle = 'black'
    }
    li[2].onclick = function () {
        colorX = "green";
        for (var index = 0;  index < li.length; index++) {
            li[index].classList.remove('active');
        }
        this.classList.add('active');
        context.fillStyle = 'green'
        context.strokeStyle = 'green'
        
    }
    li[3].onclick = function () {
        colorX = "blue";
        for (var index = 0;  index < li.length; index++) {
            li[index].classList.remove('active');
        }
        this.classList.add('active')
        context.fillStyle = 'blue'
        context.strokeStyle = 'blue'
    }

    reset[0].onclick = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);  
    };

    download[0].onclick = function () {
        var url = canvas.toDataURL("image/png")
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download = '图片'
        a.target = '_blank'
        a.click()
    };
   
    
    pen[0].onclick = function () {
        switcher = true; 
        pen[0].classList.add('active')
        eraser[0].classList.remove('active')
    };
    
    eraser[0].onclick = function () {
        switcher = false;
        eraser[0].classList.add('active');
        pen[0].classList.remove('active')
    }
    jiacu[0].onclick = function () {
        if (lineWidth === 2.5) {
            jiacu[0].classList.add('active');
            lineWidth = 5
        }else{
            jiacu[0].classList.remove('active');
            lineWidth = 2.5;
        }
    }



    if (canvas.ontouchstart === null) {
        canvas.ontouchstart = function (event) {
            var x = event.touches[0].clientX;
            var y = event.touches[0].clientY;
            lastPoint = { x: x, y: y };
            onOff = true;
            if (switcher === false) {
                context.clearRect(x, y, 20, 20)
            } else {
                drawArc(x, y, colorX, lineWidth)
            }
        }
        canvas.ontouchmove = function (event) {
            var x = event.touches[0].clientX;
            var y = event.touches[0].clientY;
            var newPoint = { x: x, y: y }
            if (switcher === false) {
                if (onOff) context.clearRect(x - 10, y - 10, 20, 20);
            } else {
                if (onOff) {
                    drawArc(x, y, colorX, lineWidth)
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y,lineWidth*2)
                }
            }
            lastPoint = newPoint;
        }
        canvas.ontouchend = function () { onOff = false; }

    } else {
        canvas.onmousedown = function (event) {
            var x = event.clientX;
            var y = event.clientY;
            onOff = true;
            lastPoint = { x: x, y: y };
            if (switcher === false) {
                context.clearRect(x, y, 20, 20)
            } else {
                drawArc(x, y, colorX, lineWidth)
            }
        }

        canvas.onmousemove = function (event) {
            var x = event.clientX;
            var y = event.clientY;
            var newPoint = { x: x, y: y }
            if (switcher === false) {
                if (onOff) context.clearRect(x - 10, y - 10, 20, 20);
            } else {
                if (onOff) {
                    drawArc(x, y, colorX, lineWidth)
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y,lineWidth*2)
                }
            }
            lastPoint = newPoint;
        }
        canvas.onmouseup = function () { onOff = false; }
    }

}

function drawArc(x, y, color, size) {//画圆
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, size, 0, 2 * Math.PI);
    context.fill();
}

function drawLine(x1, y1, x2, y2,width) {//画直线
    context.beginPath();
    context.moveTo(x1, y1);//起点
    context.lineWidth = width;
    context.lineTo(x2, y2);//终点
    context.stroke();
    context.closePath();
}
