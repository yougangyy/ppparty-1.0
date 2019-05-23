
//获取用户id
var itemList=[]
$.post("http://pay.ppparty.cn/h5wxpay/getItemList",function(data){
    var itemData = JSON.parse(data)
    for(var i=0;i<itemData.data.length;i++){
        itemList.push(itemData.data[i])
    }
})

//需要人数的添加
var numberId=$(".number-num").attr("id");
$('.button-left').on("click", function () {
    if (numberId >= 23) {
        numberId = 23;
    } else {
        numberId++;
    }
    for(var i=0;i<itemList.length;i++){
        if(numberId == itemList[i].id){
            $(".number-num").html(itemList[i].content)
            $(".gift-val").html(itemList[i].price+"元");
        }
    }
})
//需要人数的减少
$('.button-right').on("click", function () {
    if (numberId <= 4) {
        numberId = 4;
    } else {
        numberId--;
    }
    for(var i=0;i<itemList.length;i++){
        if(numberId == itemList[i].id){
            $(".number-num").html(itemList[i].content)
            $(".gift-val").html(itemList[i].price+"元");
        }
    }
})





//点击按钮发送数据，调起微信支付页面
$('.button').on('click', function () {
    var timeStamp=Date.parse(new Date());
    var place = $(".place-val").val();
    var time = $(".time-val").val();
    var telVal = $(".tel-val").val();
    if($(".place-val").val() == "" || $(".time-val").val() == "" || $(".tel-val").val() == ""){
        $(".error").css("display","block");
    }else{
        $.ajax({
            type: "GET",
            url: "http://pay.ppparty.cn/h5wxpay/payOrder",
            data: {id:numberId,phone:telVal,party_time:time,party_place:place},
            dataType: "json",
            success: function (data) {
                if(data.code === 0){
                    window.location.href="http://pay.ppparty.cn/h5wxpay/wxPay?id="+numberId+"&phone="+telVal+"&party_time="+time+"&party_place="+place;
                    
                }else{
                    $(".error").display="block";
                }
            }
        });
    }
})






// mobShare.config( {
 
//     debug: true, // 开启调试，将在浏览器的控制台输出调试信息
 
//     appkey: '2a872d3f78e60', // appkey
 
//     params: {
//         url: 'http://t.ppparty.cn/h5pay/indexNow.html', // 分享链接
//         title: '一键下单', // 分享标题
//         description: '123', // 分享内容
//         pic: 'http://t.ppparty.cn/h5pay/img/addTo.png', // 分享图片，使用逗号,隔开
//         reason:'',//自定义评论内容，只应用与QQ,QZone与朋友网
//     },
 
//     /**
//      * 分享时触发的回调函数
//      * 分享是否成功，目前第三方平台并没有相关接口，因此无法知道分享结果
//      * 所以此函数只会提供分享时的相关信息
//      * 
//      * @param {String} plat 平台名称
//      * @param {Object} params 实际分享的参数 { url: 链接, title: 标题, description: 内容, pic: 图片连接 }
//      */
//     callback: function( plat, params ) {
//     }
 
// } );




wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
    wx.updateAppMessageShareData({ 
        title: '一键下单', // 分享标题
        desc: '啊啊啊', // 分享描述
        link: 'http://t.ppparty.cn/h5pay/indexNow.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://t.ppparty.cn/h5pay/img/addTo.png', // 分享图标
        success: function () {
          // 设置成功
        }
    })
});


wx.onMenuShareAppMessage({
    title: '一键下单', // 分享标题
    desc: '啊啊啊', // 分享描述
    link: 'http://t.ppparty.cn/h5pay/indexNow.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: 'http://t.ppparty.cn/h5pay/img/addTo.png', // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
    // 用户点击了分享后执行的回调函数
    }
    });



//微信分享详细信息
    // var imgUrl = "http://t.ppparty.cn/h5pay/img/addTo.png"; 
    // var lineLink = 'http://t.ppparty.cn/h5pay/indexNow.html'; 
    // var descContent = '123';
    // var appid = '2a872d3f78e60';

    // $.ajax({
    //     type : 'POST',
    //     url :  "http://dev.mymax.cn/running/comm/weixin/open/jsSDKConfig", //这个地址并非通用且长期有效，请去微信官方查看文档，并自行配置
    //     dataType : "json",
    //     data:{url:window.location.href},
    //     success : function(response){
    //             var appId = response.s.appId;
    //             var timestamp = response.s.timeStamp;
    //             var nonceStr = response.s.nonceStr;
    //             var signature = response.s.signature;

    //             wx.config({
    //                 debug: false,
    //                 appId: appId,
    //                 timestamp: timestamp,
    //                 nonceStr: nonceStr,
    //                 signature: signature,
    //                 jsApiList: [   
    //                     'checkJsApi',
    //                     'onMenuShareTimeline',
    //                     'onMenuShareAppMessage'
    //                 ]
    //             });
    //              wx.ready(function() {
                         
    //                     wx.onMenuShareTimeline({
    //                         title: shareTitle, // 分享标题
    //                         link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //                         imgUrl: imgUrl, // 分享图标
    //                         success: function () {
    //                             // 用户确认分享后执行的回调函数
    //                         },
    //                         cancel: function () {
    //                             // 用户取消分享后执行的回调函数
    //                         }
    //                     });
    //                     wx.onMenuShareAppMessage({
    //                         title: shareTitle, // 分享标题
    //                         desc: descContent, // 分享描述
    //                         link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //                         imgUrl: imgUrl, // 分享图标
    //                         type: '', // 分享类型,music、video或link，不填默认为link
    //                         dataUrl:'' , // 如果type是music或video，则要提供数据链接，默认为空
    //                         success: function () {
    //                             // 用户确认分享后执行的回调函数
                                
    //                         },
    //                         cancel: function () {
    //                             // 用户取消分享后执行的回调函数
    //                         }
    //                     });
    //             });
    //     },
    //     error:function(response){
    //         window.parent.growl("删除失败["+response.responseText+"]!","error");
    //     }
    // });