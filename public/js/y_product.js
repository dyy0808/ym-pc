$(function(){     
//动态加载商城商品信息
 
// $.ajax({
//         url:"http://localhost:4000/pro/product",
//         type:"get",
//         dataType:"json",
//         success: function(res) {
//                 var html="";
//                 for(var p of res){
//                         var {details,pic,price,href,family_id}=p;

//                                 html+=`<li>
//                         <div class="f_right_img">
//                                 <a href="${href}"><img src="${pic}"/></a>
//                                 <strong class="money">￥${price}</strong>
//                                 <a href="${href}" class="ym_f_right_02_text">${details}</a>
//                         </div>
//                                 </li>`
//                 }
//                 $(".load_02").children().first().after(html);
                
//         }
// });

//搜索详细，封装动态加载数据信息
function product_list(res){
        var html="";
        for(var p of res){
                //console.log(res)
                //console.log(p)
                var {details,pic,price,href,family_id,pid}=p;

                html+=` <li>
                <img src="${pic}">
                <p>
                        <em class="font-small">云马价：</em>
                        <span>¥${price}</span>
                        <i class="bg_pink">有货</i>
                </p>
                <p class="details_text"><a href="${href}">${details}</a></p>
                <p class="font-small">适用于重点标识 防卡纸 不溢胶 不脱墨</p>
                <p class="cart_btn clearfix">
                        <a href="#" class="cart_btn_width buy" data-pid="${pid}">立即购买</a>
                        <a href="#" class="cart_btn_width">查看详情</a>
                        <a href="#" class="cart_btn_collection"></a>
                </p>
                </li>`


        }
        var html=$(".product>ul").html(html);
}
//分页查询封装


        if(location.search.indexOf("kwords")!==-1){//地址栏有搜索内容
        var kwords = decodeURI(location.search.split("=")[1])
        $.ajax({
                url:"http://localhost:4000/pro/search",
                type:"get",
                data:{kwords},
                dataType:"json",
                success:function(res){
                        console.log(res)
                        product_list(res);
                        //分页开始
                        var pno=0;
                   function loadPage(no=0){//no:新页号
                        pno=no;
                        $.ajax({
                         url:"http://localhost:4000/pro/page",
                        type:"get",
                        data:{pno},
                        dataType:"json",
                        success:function(output){
                        //console.log(output)

                        var { products,pageCount }=output;
                        product_list(products);
                        var html="";
                        for(var i=1;i<=pageCount;i++){
                                html+=`<a href="#" class="${i==pno+1?'active':''}">${i}</a>`
                             }
                //删除中间li:
                        $(".product_page").children(":not(:first-child):not(:last-child)").remove()
                        //将html追加到上一页后
                        $(".product_page").children().first().after(html)
                        if(pno==0){//如果当前页是第一页就禁用上一页
                                $(".product_page").children().first().addClass("disabled")
                        }else{//否则就启用上一页
                                $(".product_page").children().first().removeClass("disabled")
                        }
                        if(pno==pageCount-1){
                                $(".product_page").children().last().addClass("disabled")
                        }else{
                                $(".product_page").children().last().removeClass("disabled")
                        }
                    }
                  })
                }
              
                loadPage();
                //只在页面首次加载时，在分页按钮的父元素上绑定一次
                $(".product_page").on("click","a",function(e){
                e.preventDefault();
                var $a=$(this);
                //除了禁用和当前正在激活按钮之外才能点击
                if(!$a.is(".disabled,.active")){
                if($a.is(":first-child"))//上一页
                var no=pno-1;//新页号=当前页号-1
                else if($a.is(":last-child"))
                var no=pno+1;//新页号=当前页号+1
                else//1、2、3按钮
                var no=$a.html()-1;//新页号=按钮内容-1
                loadPage(no);//重新加载新页号的页面内容
                }
                })
                       
        /*** 分页结束******/
                }
        });
        
        }else{//直接点击网页进去不需要搜索
        $.ajax({
                url:"http://localhost:4000/pro/Psearch",
                type:"get",
                dataType:"json",
                success:function(res){
                        //product_list(res);
                /******分页开始*****/
                var pno=0;
        function loadPage(no=0){//no:新页号
                pno=no;
                $.ajax({
                        url:"http://localhost:4000/pro/page",
                        type:"get",
                        data:{pno},
                        dataType:"json",
                        success:function(output){
                                var { products,pageCount }=output;
                                product_list(products);
                                var html="";
                                for(var i=1;i<=pageCount;i++){
                                        html+=`<a href="#" class="${i==pno+1?'active':''}">${i}</a>`
                                }
                        //删除中间li:
                                $(".product_page").children(":not(:first-child):not(:last-child)").remove()
                                //将html追加到上一页后
                                $(".product_page").children().first().after(html)
                                if(pno==0){//如果当前页是第一页就禁用上一页
                                $(".product_page").children().first().addClass("disabled")
                                }else{//否则就启用上一页
                                $(".product_page").children().first().removeClass("disabled")
                                }
                                if(pno==pageCount-1){
                                $(".product_page").children().last().addClass("disabled")
                                }else{
                                $(".product_page").children().last().removeClass("disabled")
                                }
                        }       
                })
        }
           
             loadPage();
             //只在页面首次加载时，在分页按钮的父元素上绑定一次
        $(".product_page").on("click","a",function(e){
             e.preventDefault();
             var $a=$(this);
             //除了禁用和当前正在激活按钮之外才能点击
             if(!$a.is(".disabled,.active")){
             if($a.is(":first-child"))//上一页
             var no=pno-1;//新页号=当前页号-1
             else if($a.is(":last-child"))
             var no=pno+1;//新页号=当前页号+1
             else//1、2、3按钮
             var no=$a.html()-1;//新页号=按钮内容-1
             loadPage(no);//重新加载新页号的页面内容
             }
        })
              
                /********分页结束***** */
                       
                }
        })
}



})

