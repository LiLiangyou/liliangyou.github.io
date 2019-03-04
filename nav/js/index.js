var clk = document.getElementsByClassName("clk")[0];
var frame = document.getElementsByClassName("frame")[0];
var secondHand = document.getElementsByClassName("odd-even")[0];
var minuteHand = document.getElementsByClassName("minute")[0];
var hoursHand = document.getElementsByClassName("hours")[0];
var main = document.getElementsByClassName("main")[0];
var boss = document.getElementById("boss");
var text = document.getElementsByClassName("text")[0];
var text_p = text.firstElementChild;
var text_s = text.getElementsByTagName("span");
var a = document.getElementsByTagName("a");
var photo_a = document.getElementsByClassName("photo")[0].firstElementChild;
var wx = document.getElementById("wx");

var i = 0;
var j = 0;

wx.style.display = "none";
boss.style.display = "block";

function clkHeight() {
    clk.style.height = frame.offsetWidth + "px";
    main.style.marginTop = -main.offsetHeight / 2 + "px";
    main.style.marginLeft = -main.offsetWidth / 2 + "px";
    if (window.innerWidth > 768) {

        h = document.body.offsetWidth / 1.5;
        document.body.style.backgroundPositionY = -(h - window.innerHeight) / 2 + "px";
        if (h < window.innerHeight) {
            boss.style.height = h + "px";
            boss.style.top = "50%";
            boss.style.marginTop = -h / 2 + "px";
        } else {
            boss.style.height = window.innerHeight + "px";
        }
    }

}

clkHeight();
function setClkSeconds() {
    window.time = new Date();
    s = time.getSeconds();
    if (s % 2 == 0) {
        secondHand.style.backgroundImage = "url(./images/even.png)"
    } else {
        secondHand.style.backgroundImage = "url(./images/odd.png)"
    }
    frame.style.transform = "rotate(" + s * 6 + "deg)";
    text_p.innerText = time.toLocaleString();

//            文字闪烁1
    i++;
    if (i % 2 == 0) {
        a[0].className = "f";
        a[1].className = "";
        a[2].className = "f";
    } else {
        a[0].className = "";
        a[1].className = "f";
        a[2].className = "";
    }

}

function setClkMinutes() {
    m = time.getMinutes();
    minuteHand.style.transform = "rotate(" + (m * 6 + (s * 0.1)) + "deg)";
}

function setClkHours() {
    h = time.getHours();
    hoursHand.style.transform = "rotate(" + (h * 30 + (m * 0.5)) + "deg)";
}


setClkSeconds();
setClkMinutes();
setClkHours();
setInterval(setClkSeconds, 1000);
setInterval(setClkMinutes, 1000);
setInterval(setClkHours, 1000);


setInterval(function () {

    if (j >= 1) {
        text_s[j - 1].className = "";
    }
    j = j > text_s.length - 1 ? 0 : j;
    text_s[j].className = "s";
//    console.log(window.innerWidth + "====" + window.innerHeight);
    j++;
    if (j % 2 == 0) {
        photo_a.className = "c"
    } else {
        photo_a.className = ""
    }

}, 600);


window.onresize = function () {

//        var url = window.location.href;
//        var parm = parseInt(Math.random() * 10);
//        if (url.lastIndexOf('?') > -1) {
//            url = url + parm;
//        } else {
//            url = url + "?" + parm;
//        }
//        window.location.href = url;
    console.log(window.innerWidth + "====" + window.innerHeight);
    window.location.reload();
    clkHeight();
//        h = document.body.offsetWidth / 1.5;
//        document.body.style.backgroundPositionY = -(h - window.innerHeight) / 2 + "px";
//
//        boss.style.height = h + "px";
//        boss.style.marginTop = -h / 2 + "px";
//        console.log(boss.offsetHeight);
};
//console.log(window.onresize);
