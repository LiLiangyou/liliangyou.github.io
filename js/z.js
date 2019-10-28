//判断是否已有本地缓存
var url = "img/bg/time.gif";
var img = new Image();
img.src = url;
var cache = 0;
if (img.complete || img.width) {

} else {
    cache = 1;
}