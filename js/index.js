var banner = document.getElementsByClassName("section-banner")[0];

var bannerInner = document.getElementsByClassName("banner-inner")[0];

var box_100 = document.getElementsByClassName("box_100")[0];
var box_100_img = box_100.getElementsByTagName("img")[0];
var nav = document.getElementsByClassName("nav")[0];
var nav_as = nav.getElementsByTagName("a");
var bannerNavHeight = banner.offsetHeight + nav.offsetHeight;//

var h1 = document.getElementsByTagName("h1")[0];
var font_box = document.getElementsByClassName("font_box")[0];
var section_works = document.getElementsByClassName("section-works")[0];
var list_works = document.getElementsByClassName("list_works")[0];

var section_introduction = document.getElementsByClassName("section-introduction")[0];
var nav_inner = document.getElementsByClassName("nav_inner")[0];
var i = 1;//计数

var aImg = section_works.getElementsByTagName("img");
var len = aImg.length;
var n = 0;//存储图片加载到的位置，避免每次都从第一张图片开始遍历

var liCK=section_works.getElementsByTagName("li");
var view_layer=document.getElementById("view_layer");
var view_t=document.getElementsByClassName("view_t")[0];
var view_m=document.getElementsByClassName("view_m")[0];
var view_m_Img=document.getElementsByClassName("view_m")[0].getElementsByTagName("img")[0];
var view_t_p=view_t.getElementsByTagName("p")[0];
var view_t_span=view_t.getElementsByTagName("span")[0];
var view_b=document.getElementsByClassName("view_b")[0];

var icon_wx=document.getElementsByClassName("icon-wx")[0];
var QR=document.getElementsByClassName("QR")[0];

function bannerStyle() {
    //大字居中
    bannerInner.style.top = bannerNavHeight / 2 + "px";
    bannerInner.style.marginTop = -bannerInner.offsetHeight / 2 + "px";
    bannerInner.style.opacity = "1";
    //设置小字宽度
    font_box.style.width = 0.7 * h1.offsetWidth + "px";
}


/*function bannerFonts() {
    document.fonts.ready.then(function() {
        bannerStyle();
    });
}

f1(bannerStyle,bannerFonts);*/

if (cache===0){
    bannerStyle();
    console.log("有缓存")
}else {
    //var z=document.getElementById("z");
    var z_i = document.createElement("div");
    z_i.innerHTML = "<div id='z_i'></div>";
    document.body.insertBefore(z_i,banner);
    document.body.style.position="fixed";
    var t1 = window.setTimeout(function () {
        document.fonts.ready.then(function() {
            var z_div=document.getElementById("z_i");
            z_div.style.backgroundSize="0";
            var t2 = window.setTimeout(function () {
                document.body.removeChild(document.body.firstElementChild);
                bannerStyle();
                document.body.style.position="static";
                console.log("无缓存");
                window.clearTimeout(t2);//去掉定时器
            },200);
        });
        window.clearTimeout(t1);//去掉定时器
    }, 650);

}


//界面高度
function getViewPortHeight() {
    return document.documentElement.clientHeight || document.body.clientHeight;
}
//计算头像上边距
var imgTHeight = (getViewPortHeight()) - bannerNavHeight;
imgTHeight = imgTHeight > 50 ? imgTHeight : 50;

//定义头像上边距
box_100_img.style.marginTop = imgTHeight + "px";

//列表下外距
var badyH = document.body.offsetWidth;
if (badyH > 756) {
    var arr = document.getElementsByClassName("list_works");
    for (var j = 0; j < arr.length; j++) {
        arr[j].style.marginBottom = (bannerInner.offsetWidth - list_works.offsetWidth * 3) / 2 + "px";
    }
} else if (badyH < 500) {
    font_box.style.width = 0.9 * h1.offsetWidth + "px";
}


//获取卷曲距离
function getScroll() {
    return {
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    };
}

var imgT = imgTHeight + nav.offsetHeight;
var newHeight = section_introduction.offsetHeight + banner.offsetHeight + nav.offsetHeight;
//滚动事件
window.onscroll = function () {
    //判断二维码
    if (QR.style.display === "block"){
        QR.style.display = "none";
        icon_wx.style.backgroundImage = "url(./img/bg/nav2.png)";
    }
    // window.scrollTo(0, 200);
    var seeHeight = document.documentElement.clientHeight;
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    for (var l = n; l < len; l++) {
        if (aImg[l].offsetTop < seeHeight + scrollTop+10) {
            if (aImg[l].getAttribute('src') == 'img/works/load.png') {
                aImg[l].src = aImg[l].getAttribute('lazy-src');
            }
            n = l + 1;
            // console.log('n = ' + n);
        }
    }
    if (getScroll().top >= banner.offsetHeight && getScroll().top < newHeight) {
        //
        //     var a = getScroll().top - banner.offsetHeight;

        if (i === 1) {
            //移动页面
            // window.scrollBy(0, -a);

            //头像上边距

            box_100_img.style.marginTop = imgT + "px";
            nav.className = "nav fixed";

            //nav a
            for (var k = 0; k < nav_as.length; k++) {
                nav_as[k].style.opacity = 1;
                nav_as[k].style.pointerEvents = "auto"
            }
            i=2;

            /*//定时器
            var t1 = window.setTimeout(function () {
                i = 2;
                section_works.style.opacity = 1;
                window.clearTimeout(t1);//去掉定时器
            }, 100);*/
        }

        nav_inner.style.padding = "0.8rem 0";
        nav_as[0].style.borderWidth = "0.1rem";
        nav_as[0].style.padding = "0.4rem 0";

    } else if (getScroll().top >= newHeight) {
        // nav.style.top = -nav.offsetHeight+"px";
        nav.className = "nav fixed";
        //nav a
        for (var k = 0; k < nav_as.length; k++) {
            nav_as[k].style.opacity = "1";
            nav_as[k].style.pointerEvents = "auto"
        }

        nav_inner.style.padding = "0";
        nav_as[0].style.borderWidth = "0.05rem";
        nav_as[0].style.padding = "0.45rem 0";

    } else {
        box_100_img.style.marginTop = imgTHeight + "px";
        nav.className = "nav";
        for (var k = 0; k < nav_as.length; k++) {
            nav_as[k].style.opacity = "0";
            nav_as[k].style.pointerEvents = "none"
        }
        i = 1;
    }
};

var i_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var Idescribe='I-describe';
if (i_width<412){
    Idescribe='I-describe2';
    if (i_width<321){
        list_works.getElementsByTagName("img")[0].setAttribute("I-title", "C大调音乐平台");
    }
}


for (var ck = 0; ck < liCK.length; ck++ ){
    liCK[ck].onclick=function () {
        view_layer.style.display="block";
        document.body.style.overflow="hidden";
        var t2 = window.setTimeout(function () {
            view_m.style.display="block";
            view_b.style.display="block";
            window.clearTimeout(t2);//去掉定时器
        }, 20);
        var t3 = window.setTimeout(function () {
            view_m.style.opacity="1";
            view_t.style.opacity="1";
            window.clearTimeout(t3);//去掉定时器
        }, 100);
        view_m_Img.src = this.getElementsByTagName("img")[0].getAttribute('src');
        view_t_p.innerText = this.getElementsByTagName("img")[0].getAttribute('I-title');
        view_t_span.innerText = this.getElementsByTagName("img")[0].getAttribute(Idescribe);
        view_t_span.style.backgroundColor = this.getElementsByTagName("img")[0].getAttribute('I-color');
    };
}

view_layer.onclick=function () {
    view_m.style.opacity="0";
    view_t.style.opacity="0";
    view_m.style.display="none";
    view_b.style.display="none";
    view_layer.style.display="none";
    document.body.style.overflow="auto";
};

icon_wx.onclick=function () {
    if (QR.style.display === "block"){
        QR.style.display = "none";
        icon_wx.style.backgroundImage = "url(./img/bg/nav2.png)";
    }else {
        QR.style.display = "block";
        icon_wx.style.backgroundImage = "url(./img/bg/nav2-1.png)";
    }
}
