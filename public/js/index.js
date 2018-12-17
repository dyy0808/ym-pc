$(function(){
    //大banner轮播
    (function(){
        var w =  $(".banner img").width()*$(".banner").children().length
    var bannerWidth = $(".banner").width(w)
    var imgWidth = $(".banner img").width();
    var i=1

    //定时器
    var timer = setInterval(function(){
        move()
      
    },2000)

    //鼠标移入移除
    $(".aa").hover(function(){
        clearInterval(timer)
        //$(".btn").show()
    },function(){
        timer = setInterval(move,3000);
        //$(".btn").hide()
    })


    //鼠标点击
    $(".btn").on("click","span",function(){
        var btn_left = $(this)[0]==$(".btn").children().first()[0];
        var btn_right = $(this)[0]==$(".btn").children().last()[0];
        if( btn_left){
           // i--
            move()
            console.log("btnleft--"+i)
        }
        if( btn_right){
            console.log(i)
            move()
          //  i++
            console.log("btnright--"+i)
        } 
    })

    //轮播
    function move(){
        if(i>=4) {
            i=1 //会停顿-7500~0 0~2500
            $(".banner").css({"left":0})
        }
        $(".banner").stop().animate({"left":-imgWidth*i})
      
        //圆点移动
        if(i==3){
            $(".cire").children().first().addClass("on").siblings().removeClass("on")
        }
        $(".cire li").eq(i).addClass("on").siblings().removeClass("on")
        console.log("move"+i)
        i++
        
    }
    })();

   //首页云马商场滚
   (function(){
    var len = $('.animation>li').size();
    var $width = $('.animation>li').outerWidth(true);
    var animation = $('.shop_main .animation').width(len * $width+'px')
    var i = 0;
    function move(){
        if(len-4 > i) {
            i++;
             $('.animation').stop().animate({"left":-$width * i })
             
        } 
        else {
         i = 1;
         $('.animation').css({"left":0})
         $('.animation').stop().animate({"left":-$width * i })
        }
        
    } 
    $(".animation").hover(function(){
        clearInterval(timer)
    },function(){
        timer=setInterval(move,2000)
    })
     var timer = setInterval(move,2000)
   })();

   //应用场景
   (function(){
       var len = $(".application_con ul").size();
       var ul = $(".application_con ul").width();
       var len = $(".application_con ul").size();
       var Xlen = $(".application_con").width(len * ul);
       var i=1;
       $(".left_btn").click(function(e){
            e.preventDefault();
            if(len > i){
                $(".application_con").animate({"left":-ul*i})
                i++;
            }
       })
       $(".right_btn").click(function(e){
            e.preventDefault();
            if(i >1 ){
                i--;
                $(".application_con").animate({"left": ul-ul*i})
            }
           
       })
   })();
})