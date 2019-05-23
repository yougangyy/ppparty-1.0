$(function () {
        // 阻止双击放大
        var lastTouchEnd = 0;
        document.addEventListener('touchstart', function(event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        });
        document.addEventListener('touchend', function(event) {
            var now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    
        // 阻止双指放大
        document.addEventListener('gesturestart', function(event) {
            event.preventDefault();
        });


    var ua = navigator.userAgent.toLowerCase();
    var isShow = true
    $(".downloadApp").on("touchend", function (e) {
        if (/(Android)/i.test(ua)) {
            function is_weixin() {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    return true;
                } else {
                    return false;
                }
            }
            var isWeixin = is_weixin();
            if (isWeixin) {
                $(".weixin-tip").css("display", "block");
            } else {
                    $(".downloadApp").on('touchend', function () {
                        window.location.href = "https://ppparty-client.oss-cn-shanghai.aliyuncs.com/download/party.apk";
                        isShow=false
                    })
            }
        }
        if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
            function myBrowser() {
                var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
                var isOpera = userAgent.indexOf("Opera") > -1;
                if (isOpera) {
                    return "Opera"
                }; //判断是否Opera浏览器
                if (userAgent.indexOf("Firefox") > -1) {
                    return "FF";
                } //判断是否Firefox浏览器
                if (userAgent.indexOf("Chrome") > -1) {
                    return "Chrome";
                }
                if (userAgent.indexOf("Safari") > -1) {
                    return "Safari";
                } //判断是否Safari浏览器
                if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
                    return "IE";
                }; //判断是否IE浏览器
            }

            var mb = myBrowser();

            function is_weixin() {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    return true;
                } else {
                    return false;
                }
            }
            var isWeixin = is_weixin();
            if (isWeixin) {
                $(".weixin-tip").css("display", "block");
            } else {
                $(".kuangbox").css({
                    "display": "block"
                });
                $(".confirmBtn").on('click', function (e) {
                    if(isShow){  
                        if ("Safari" == mb) {
                            $(".mask").css("display","block")
                            // isShow = false;
                            window.location.href = "itms-services://?action=download-manifest&url=https://h5.ppparty.cn/download/hry.plist";
                            setTimeout(()=>{
                                $(".mask").css("display","none")
                                // isShow = true
                            },5000)
                            
                        } else {
                            alert("请使用Safari浏览器下载");
                        }
                        
                        e.preventDefault();
                    }else{
                        // alert("操作频繁，请5秒后重试！")
                    }
                    })
            }
            //         if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
            //             $(".kuangbox").css({"display":"block"});
            //             $(".confirmBtn").on('click',function(){
            //                 if ("Safari" == mb) {
            //                     window.location.href = "itms-services://?action=download-manifest&url=http://h5-test.ppparty.cn/download/hry.plist";                    
            //                 }else{
            //                     alert("请使用Safari浏览器下载");
            //                 }
            //             })
            // 		} else {
            // 			alert('请使用iPhone手机下载');
            //         }

            //         // 2微信浏览器点击的效果
            // $(window).on("load", function () {
            //     var winHeight = $(window).height();
            //         function is_weixin() {
            //             var ua = navigator.userAgent.toLowerCase();
            //             if (ua.match(/MicroMessenger/i) == "micromessenger") {
            //             return true;
            //             } else {
            //             return false;
            //             }
            //         }
            //         var isWeixin = is_weixin();
            //         $('.btn_center').on('click',function(){
            //             if (isWeixin) {
            //             $(".weixin-tip").css("height", winHeight);
            //             $(".weixin-tip").show();
            //             } 
            //         })
            //     })
        }
        e.preventDefault();
    });

})