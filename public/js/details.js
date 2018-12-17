$(function(){
    var pid=decodeURI(location.search.split("=")[1]);
    $.ajax({
        url:"http://localhost:4000/details/details",
        dataType:"json",
        type:"get",
        data:{pid},
        success: function(res) {
            //console.log(res);
            html=``;
            for(var pic of res){
                var {md,sm,lg}=pic;
                //console.log(md)
                html+=`<li class="s_img">
                <img src="${sm}" data-md="${md}" data-lg="${lg}">
                </li>`;
            }
            //var $after=$(".d_img").children().first();
            var $d_img=$(".d_img");
            $d_img.html(html);
            //var $img=$d_img.find("img");
            //console.log($img);
            $(".pro_main_left").on("click","img",function(){
                var $md_href=$(this).attr("data-md");
                var $lg_href=$(this).attr("data-md");
                var $md=$(this).parent().parent().prev().children().first();
               $md.attr("src",$md_href);
            })
            $(".boli").hover(function(){
                $(this).prev().toggleClass("display_none");
                $(this).parent().children().last().toggleClass("display_none");
            })
            .mousemove(function(e){
                var MSIZE=176,//mask的大小
                MAX=510-MSIZE;//top和left的最大值
                HEI=360-MSIZE;
                var left=e.offsetX-MSIZE/2;
                var top=e.offsetY-MSIZE/2;
                if(left<0) left=0; 
                else if(left>MAX) left=MAX;
                else if(top>HEI) top=HEI;
                if(top<0) top=0;
                else if(top>MAX) top=MAX;
                $(".mask").css({left,top});
                $(".lg_img").find("img")
                .css({"position":"absolute","left":`-${350/334*left}px`,"top":`-${368/184*top}px`});//left大图的left/中图的left
                 
            })
        }
    })

    //请求详细信息
    
    $.ajax({
        url:"http://localhost:4000/details//app-details",
        type:"get",
        data:{pid},
        dataType:"json",
        success:function(res){
            var html = `
            <div class="pro_right_title">
                <h4>${res[0].details}</h4>
                <h5>${res[0].xtitle}</h5>
            </div>
            <div class="pro_info">
                <ul>
                    <li>云 马 价： <strong>￥${res[0].price}</strong></li>
                    <li>商品编码： ${res[0].sid}</li>
                    <li>商品评分：
                        <img src="image/ymg_x.jpg">
                        <img src="image/ymg_x.jpg">
                        <img src="image/ymg_x.jpg">
                        <img src="image/ymg_x.jpg">
                        <img src="image/ymg_x.jpg">
                        (共<i class="blue">34</i>条评论)
                    </li>
                    <li>服务： 由云马商城负责发货，并提供售后服务<li/>
                    <li>购买可获得积分：<span class="blue">760</span></li>
                </ul>
            </div>`
            $(".pro_main_right").children().first().before(html);
        }
    });
  
    
})