$(function(){
    $("<link rel='stylesheet' href='css/right-bar.css'>").appendTo("head");
    $.ajax({
        url:"http://localhost:4000/right-bar.html",
        success:function(res){
            $(".right-bar").replaceWith(res);
            //$(".right-bar li p").
            $(".right-bar ul").on("mouseenter","li",function(){
                $(this).removeClass("bar-bg").addClass("bg_blue").find("p").show()
                .parents("li").siblings().find("p").hide();
                //console.log($(this).find("p"))
            })
            $(".right-bar ul").on("mouseleave","li",function(){
                console.log(22)
               // $(this).removeClass("bg_blue").addClass("bar-bg").siblings().find("p").hide();
                //console.log($(this).find("p"))
                $(this).removeClass("bg_blue").addClass("bar-bg").find("p").hide()
                .parents("li").siblings().find("p").hide();
            })
        }
    })
})