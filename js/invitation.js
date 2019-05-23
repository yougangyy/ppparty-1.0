$(function () {


    var ua = navigator.userAgent.toLowerCase()
    //获取用户手机系统
    if (/iphone|ipad|ipod|ios/.test(ua)) { //ios操作
        function setupWebViewJavascriptBridge(callback) {
            //ios注册方法**必须**
            if (window.WebViewJavascriptBridge) {
                return callback(WebViewJavascriptBridge);
            }
            if (window.WVJBCallbacks) {
                return window.WVJBCallbacks.push(callback);
            }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'https://__bridge_loaded__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () {
                document.documentElement.removeChild(WVJBIframe)
            }, 0)
        }

        setupWebViewJavascriptBridge(function (bridge) {
            function getUid(data) {
                // 调用ios方法
                var uid = data;
                var _data = {
                    uid: uid,
                }
                var encryptKey = "abcdefgabcdefg12";
                var data_ = encrypt(JSON.stringify(_data));

                $.ajax({
                    type: "POST",
                    url: "http://test.ppparty.cn/h5user/getInviteDetail",
                    data: data_,
                    dataType: "text",
                    success: function (data) {
                        decryptData = decrypt(data)
                        var newData = JSON.parse(decryptData)
                        var noLonginList = newData.data.noLoginList;
                        var succlongList = newData.data.succLoginList;
                        $(".money").html(newData.data.info.coin);
                        if(newData.data.invite_code.invite_code != null || newData.data.invite_code.invite_code != ""){
                            $(".textCode").html(newData.data.invite_code.invite_code);

                        }
                        var initStr = "";
                        var noLoginStr = "";
                        var nullData = [{
                            msg: "暂无更多...."
                        }, {
                            msg: ""
                        }, {
                            msg: ""
                        }, {
                            msg: ""
                        }, {
                            msg: ""
                        }, {
                            msg: ""
                        }]
                        for (var i = 0; i < succlongList.length; i++) {
                            if (succlongList[i].avatar != "") {
                                initStr += `<li class="son">
                                        <img src="${succlongList[i].avatar}" alt="">
                                        <span>${succlongList[i].nick}</span>
                                        <i>消费奖励${succlongList[i].profit_coin}</i>
                                    </li>`
                            } else {
                                initStr += `<li class="son">
                                        <img src="./image/noLonginList.png" alt="">
                                        <span>${succlongList[i].nick}</span>
                                        <i>消费奖励${succlongList[i].profit_coin}</i>
                                    </li>`
                            }
                        }

                        for (var i = 0; i < noLonginList.length; i++) {
                            noLoginStr += `<li class="son">
                                                <img src="./image/succLonginList.png" alt="">
                                                <span>${noLonginList[i].nick}</span>
                                                <i>暂未登陆</i>
                                           </li>`
                        }

                        for (var i = 0; i < nullData.length; i++) {
                            noLoginStr += `<li class="son">
                                                <p>${nullData[i].msg}</p>
                                           </li>`
                        }

                        for (var i = 0; i < nullData.length; i++) {
                            initStr += `<li class="son">
                            <p>${nullData[i].msg}</p>
                                           </li>`
                        }


                        $(".friend").html(initStr)
                        $(".notLanded").html(noLoginStr)
                    }
                });

                $("#button").on("click", function () {
                    var amount = $(".money").html()
                    var uidData = {
                        uid: uid,
                        amount: amount,
                    }

                    var encryptKey = "abcdefgabcdefg12";
                    var datas_ = encrypt(JSON.stringify(uidData));
                    $.ajax({
                        type: "POST",
                        url: "http://test.ppparty.cn/h5user/withdrawCoin",
                        data: datas_,
                        dataType: "text",
                        success: function (response) {
                            var decryptData = decrypt(response)
                            var newData = JSON.parse(decryptData)
                            console.log(newData)
                            if (newData.code == 0) {
                                $(".errorImg").attr('src', "./image/success-index.png");
                            } else {
                                $(".errorImg").attr('src', "./image/error-index.png");
                            }
                            $(".error").css("display", "block")

                            $(".carrier").html(newData.msg)
                            styleCss()
                            // 3秒后提示框消失
                            setTimeout(function () {
                                $(".error").css("display", "none")
                            }, 3000)
                        }
                    });

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


                //ios点击分享
                var encryptKey = "abcdefgabcdefg12";
                var uids = encrypt(JSON.stringify(uid));
                var tiemrs = (new Date()).getTime()
                $(".footButton").on("click", function () {
                    bridge.callHandler('callObjectiveCNativeShareMethod', {
                            // 分享 URL
                            "shareURL": "http://h5-test.ppparty.cn/register/index.html?uid=" + uids + "&time=" + tiemrs,
                            // 分享的 URL 是否需要拼接 UID, 1 : 需要, 0 : 不需要
                            "needAppendUID": "0",
                            // 分享内容
                            "content": "Hi~快来加入PartyParty和我一起互动吧！",
                            // 是否需要将分享 URL 拼接到分享内容上, 1 : 需要, 0 : 不需要
                            "shareURLAppendToContent": "0",
                            // 分享标题
                            "title": "PartyParty",
                            // 分享的网络图片 URL
                            "imageURL": "",
                            // 分享内容的类型, 也就是分享到其他应用之后的类型, 下面会详细列出都有哪些类型
                            "shareContentType": "0",
                            // 需要的分享平台类型 list, value 传 json 字符串, 可支持的分享平台下面会详细列出
                            "platformsType": '["1", "2", "3"]'
                        },
                        function responseCallback(responseData) {
                            console.log("JS received response:", responseData)
                        })

                })

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
            }
            bridge.callHandler("callObjectiveCNativeGetCurrentUserID", null, function (responseData) {
                // 获取用户uid执行回掉，将uid带入函数内部
                getUid(responseData);
            });
        })

    } else if (/android/.test(ua)) {
        // 安卓获取用户uid
        var uid = PartyAndroidJSHandler.getUid();

        var _data = {
            uid: uid,
        }
        var encryptKey = "abcdefgabcdefg12";
        var data_ = encrypt(JSON.stringify(_data));
        $.ajax({
            type: "POST",
            url: "http://test.ppparty.cn/h5user/getInviteDetail",
            data: data_,
            dataType: "text",
            success: function (data) {

                decryptData = decrypt(data)
                var newData = JSON.parse(decryptData)
                var noLonginList = newData.data.noLoginList;
                var succlongList = newData.data.succLoginList;
                $(".money").html(newData.data.info.coin)
                if(newData.data.invite_code.invite_code != null || newData.data.invite_code.invite_code != ""){
                    $(".textCode").html(newData.data.invite_code.invite_code);

                }
                var initStr = "";
                var noLoginStr = "";
                var nullData = [{
                    msg: "暂无更多...."
                }, {
                    msg: ""
                }, {
                    msg: ""
                }, {
                    msg: ""
                }, {
                    msg: ""
                }, {
                    msg: ""
                }]
                for (var i = 0; i < succlongList.length; i++) {
                    if (succlongList[i].avatar != "") {
                        initStr += `<li class="son">
                                <img src="${succlongList[i].avatar}" alt="">
                                <span>${succlongList[i].nick}</span>
                                <i>消费奖励${succlongList[i].profit_coin}</i>
                            </li>`
                    } else {
                        initStr += `<li class="son">
                                <img src="./image/noLonginList.png" alt="">
                                <span>${succlongList[i].nick}</span>
                                <i>消费奖励${succlongList[i].profit_coin}</i>
                            </li>`
                    }
                }

                for (var i = 0; i < noLonginList.length; i++) {
                    noLoginStr += `<li class="son">
                                        <img src="./image/succLonginList.png" alt="">
                                        <span>${noLonginList[i].nick}</span>
                                        <i>暂未登陆</i>
                                   </li>`
                }

                for (var i = 0; i < nullData.length; i++) {
                    noLoginStr += `<li class="son">
                                        <p>${nullData[i].msg}</p>
                                   </li>`
                }

                for (var i = 0; i < nullData.length; i++) {
                    initStr += `<li class="son">
                    <p>${nullData[i].msg}</p>
                                   </li>`
                }


                $(".friend").html(initStr)
                $(".notLanded").html(noLoginStr)
            }
        });


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





        var encryptKey = "abcdefgabcdefg12";
        var uids = encrypt(JSON.stringify(uid));
        var tiemrs = (new Date()).getTime()
        $(".footButton").on("click", function () {
            PartyAndroidJSHandler.showShare("Hi~快来加入PartyParty和我一起互动吧！", "http://h5-test.ppparty.cn/register/index.html?uid=" + uids + "&time=" + tiemrs); //调取安卓分享接口
        })
    }


    $("#success").on("click", function () {
        $(".friend").css("display", "block")
        $(".notLanded").css("display", "none")
        $("#login").attr("class", "");
        $("#success").attr("class", "active");

    })

    $("#login").on("click", function () {
        $(".friend").css("display", "none")
        $(".notLanded").css("display", "block")
        $("#login").attr("class", "active");
        $("#success").attr("class", "");
    })


    $(".code").on("click", function () {
        $(".mask").css("display", "block")
        $(".fiame").css("display", "block")
    })

    $(".close").on("click", function () {
        $(".mask").css("display", "none")
        $(".fiame").css("display", "none")
    })


    var copyCode = new ClipboardJS('#buttonCodde')

    copyCode.on("success", function (e) {
        console.log("复制成功")
        $(".errorImg").attr('src', "./image/success-index.png");
        $(".error").css("display", "block")
        $(".carrier").html("复制成功")
        styleCss()
        // 3秒后提示框消失
        setTimeout(function () {
            $(".error").css("display", "none")
        }, 3000)
        e.clearSelection();
    })

    copyCode.on("error", function (e) {
        $(".errorImg").attr('src', "./image/error-index.png");
        $(".error").css("display", "block")
        $(".carrier").html("复制失败")
        styleCss()
        // 3秒后提示框消失
        setTimeout(function () {
            $(".error").css("display", "none")
        }, 3000)
    })

    function styleCss() {
        var styleLeft = ($(window).width() - $(".error").width()) / 2;
        $(".error").css("left", styleLeft)
    }

})