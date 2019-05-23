
$(function(){

    // var newurl = updateQueryStringParameter(window.location.href, 'uid', '1XxCigeL2X4dFtpI7u9n+w==');
    // //向当前url添加参数，没有历史记录
    // window.history.replaceState({
    //     path: newurl
    // }, '', newurl);
    
    // function updateQueryStringParameter(uri, key, value) {
    //     if(!value) {
    //         return uri;
    //     }
    //     var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    //     var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    //     if (uri.match(re)) {
    //         return uri.replace(re, '$1' + key + "=" + value + '$2');
    //     }
    //     else {
    //         return uri + separator + key + "=" + value;
    //     }
    // }

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
    

    // var uid=GetRequest().uid
    var imgs = [ //定义数组用来存储图片的路径
        './image/no-password.png',
        './image/password-eye.png'
    ];
    var index = 0; //设置第一张图片的索引值为0
    var len = imgs.length; //获取存储图片数组的长度
    $('.password-right').on('touchend', function () { //绑定点击事件
        if (index === 1) {
            index = 0; //如果index的值小于0，使index为0
            $(".password-val").attr('type', "password");
        } else {
            index = 1; //如果index大于了数组长度 ，使index等于1
            $(".password-val").attr('type', "");
        }
        $('.password-right').attr('src', imgs[index]); //动态改变图片的路径
    });
    
    
    
    
    
    
    $(".tel-val").on("blur", function () {
            if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test($(".tel-val").val()))) {
                $(".error").css("display", "block")
                $(".errorImg").attr('src', "http://h5-test.ppparty.cn/register/image/warning.png");
                $(".carrier").html("请正确填写手机号!")
                styleCss()
                // 3秒后提示框消失
                setTimeout(function () {
                    $(".error").css("display", "none")
                }, 3000)
                return false;
            }
    })
    
       
    
    
    
    
    // 设置开关，规定60秒内用户只能点击一次
    var show = true;
    var encryptKey = "abcdefgabcdefg12";
    // 点击按钮获取验证码
    $(".obtain").on("touchend", function () {
            if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test($(".tel-val").val()))) {
                $(".error").css("display", "block")
                $(".errorImg").attr('src', "http://h5-test.ppparty.cn/register/image/warning.png");
                $(".carrier").html("请正确填写手机号!")
                styleCss()
                // 3秒后提示框消失
                setTimeout(function () {
                    $(".error").css("display", "none")
                }, 3000)
                return false;
            }else{
    
            
        // 规定时长
        var showTime = 60;
        // 判断用户是否可以点击获取验证码
        if (show === true) {
            var phoneId = $(".tel-val").val()
            var after = encrypt(phoneId);
            var data_ = {
                "phone": phoneId,
                "type": 1,
            }
            var encryptData = encrypt(JSON.stringify(data_));
            $.ajax({
                type: "POST",
                url: "http://test.ppparty.cn/h5user/sendPhone",
                data: encryptData,
                cache: false,
                async: false,
                dataType: "text",
                success: function (data) {
                    var decryptData = decrypt(data)
                    var newData = JSON.parse(decryptData)
                    console.log(newData)
                    $(".carrier").html(newData.msg)
                    if(newData.code == 0){
                        $(".errorImg").attr('src', "http://h5-test.ppparty.cn/register/image/success-index.png");
                        // 关闭开关，让用户无法点击
                        show = false;
                        $(".obtain").html(showTime+"秒后重试")
                        // 改变按钮内容成倒计时
                        var timer = setInterval(function () {
                            if (showTime != 0) {
                                showTime--
                                $(".obtain").html(showTime+"秒后重试")
                            } else {
                                show = true
                                $(".obtain").html("获取验证码")
                                clearInterval(timer);
                            }
                        }, 1000)
                    }else{
                        $(".errorImg").attr('src', "http://h5-test.ppparty.cn/register/image/error-index.png");
                    }
                    $(".error").css("display", "block")
                    styleCss()
                    setTimeout(function () {
                        $(".error").css("display", "none")
                    }, 3000)
                    
                }
    
            });
    
            
    
            
    
        }
    }
    
    
    })



    //点击按钮发送数据
    $('.register-button').on('touchend',function(){
        


        var tel = $(".tel-val").val();
        var verification = $(".verification-val").val();
        var _password = $(".password-val").val();
        var uid = decrypt(getUrlParam("uid"))
        // 600002
        var _data={
            account:tel,
            type:0,
            code:verification,
            from_uid:uid,
            password:_password
        }
        var after = encrypt(JSON.stringify(_data));
        $.ajax({
            type: "POST",
            url: "http://test.ppparty.cn/h5user/userRegister",
            data: after,
            dataType: "text",
            success: function (response) {
             var data = JSON.parse(decrypt(response))
             if($(".verification-val").val() == ""){
                $(".error").css("display", "block")
                    $(".errorImg").attr('src', "http://h5-test.ppparty.cn/register/image/warning.png");
                    $(".carrier").html("请填写验证码!")
            }else{
                $(".carrier").html(data.msg)
            }
                
                $(".error").css("display", "block")
                styleCss()
                setTimeout(function () {
                    $(".error").css("display", "none")
                }, 3000)
                if(data.code == 0){
                    $(".errorImg").attr('src', "http://h5-test.ppparty.cn/register/image/success-index.png");
                window.location.href="http://h5-test.ppparty.cn/successful/successful.html" 
            }else if (data.code == 100122){
                $(".errorImg").attr('src', "http://h5-test.ppparty.cn/register/image/warning.png");
            }else{
                $(".errorImg").attr('src', "http://h5-test.ppparty.cn/register/image/error-index.png");
            }
            }
        });


        
    })

    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }


     function styleCss() {
        var styleLeft = ($(window).width() - $(".error").width()) / 2;
        $(".error").css("left", styleLeft)
    }

     // 加密
    function encrypt(word) {
        var key = CryptoJS.enc.Utf8.parse(encryptKey);
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    }
    //解密
    function decrypt(word) {
        if (!word) {
            return null;
        }
        var key = CryptoJS.enc.Utf8.parse(encryptKey);
        var decrypt = CryptoJS.AES.decrypt(word, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }
})




$(".clicks").on("touchend",function(){
    window.location.href="http://h5-test.ppparty.cn/download/download.html"
})






  


