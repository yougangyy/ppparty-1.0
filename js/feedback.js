
    var imgs = [ //定义数组用来存储图片的路径
        './image/contactNo.png',
        './image/contactYes.png'
    ];
    var index = 0; //设置第一张图片的索引值为0
    var indexTwo = 0;
    var len = imgs.length; //获取存储图片数组的长度
    $('.selectionOne').on('click', function () { //绑定点击事件
        if (index === 0) {
            index = 1; //如果index的值小于0，使index为0
        }
        $('.selectionOne').attr('src', imgs[index]); //动态改变图片的路径
        $('.selectionTwo').attr('src', imgs[0]);
    });

    $('.selectionTwo').on('click', function () { //绑定点击事件
        if (indexTwo === 0) {
            indexTwo = 1; //如果index的值小于0，使index为0
        }
        $('.selectionOne').attr('src', imgs[0]); //动态改变图片的路径
        $('.selectionTwo').attr('src', imgs[indexTwo]);
    });



    


    $(".footButton").on("click",function(){
        var content = $(".textarea").val();
    console.log(content)
    })