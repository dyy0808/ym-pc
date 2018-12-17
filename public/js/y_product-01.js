$(function(){  
        //封装具体产品   
        function product_list(res){
                var html="";
                //console.log(res)
                for(var p of res.products){
                        var {details,pic,price,href,family_id,pid}=p;
                        html+=` <li>
                        <img src="${pic}">
                        <p>
                                <em class="font-small">云马价：</em>
                                <span>¥${price}</span>
                                <i class="bg_pink">有货</i>
                        </p>
                        <p class="details_text"><a href="${href}?pid=${pid}">${details}</a></p>
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
        //封装页码数字
        function page(res){
                var html="";
                for(var i=1;i<=res.pageCount;i++){
                         html+=`<a href="#" class="${i==pno+1?'active':''}">${i}</a>`
                }
                $(".product_page").children().first().after(html)
        }
       
        //封装的重新加载页码
        function loadPage(no=0){//no:新页号
                pno=no;
                $.ajax({
                       url:"http://localhost:4000/pro/page",
                       type:"get",
                       data:{pno},
                       dataType:"json",
                       success:function(res){
                               //var { products,pageCount }=output;
                               product_list(res);
                               var html="";
                                for(var i=1;i <= res.pageCount;i++){
                                        html+=`<a href="#" class="${i==pno+1?'active':''}">${i}</a>`
                                }
                        //删除中间li:
                               $(".product_page").children(":not(:first-child):not(:last-child)").remove()
                               //将html追加到上一页后
                               $(".product_page").children().first().after(html)
                               if(pno == 0){//如果当前页是第一页就禁用上一页
                               $(".product_page").children().first().addClass("disabled")
                               }else{//否则就启用上一页
                               $(".product_page").children().first().removeClass("disabled")
                               }
                               if(pno == res.pageCount-1){
                               $(".product_page").children().last().addClass("disabled")
                               }else{
                               $(".product_page").children().last().removeClass("disabled")
                               }
                       }       
               })
       }
        if(location.search.indexOf("kwords")!==-1){//地址栏有搜索内容
                var kwords = decodeURI(location.search.split("=")[1])
                var pno=0;
                $.ajax({
                        url:"http://localhost:4000/pro/search",
                        type:"get",
                        data:{kwords,pno},
                        dataType:"json",
                        success:function(res){
                               // console.log(res);
                                product_list(res)
                                page(res);
                        }  
                })
               
        }
        else{//直接点击网页进去不需要搜索
                var pno=0;
                $.ajax({
                        url:"http://localhost:4000/pro/page",
                        type:"get",
                        data:{kwords,pno},
                        dataType:"json",
                        success:function(res){
                                console.log(res)
                                product_list(res)
                                page(res)
                        }  
                })
        }
        
        //页码添加点击事件
        $(".product_page").on("click","a",function(e){
                console.log(11)
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
           
        
})
        
        