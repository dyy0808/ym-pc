window.onload=function(){
/********引入头部********/
    $("<link rel='stylesheet' href='css/header.css'>").appendTo("head");
    //Promise.all([])
    $.ajax({
        url:"http://localhost:4000/header.html",
        type:"get",
        success: function(res) {
            $(".ym_header").replaceWith(res);
        /********头部搜索框搜索--因为是异步加载所以搜索框的信息都要写在success里面********/
            //1. 查找触发事件的元素
            var $btnSeach= $(".header .search input[type='button']");
            var $input=$(".header .search input[type='text']");
             //2. 绑定事件
                //按搜索按钮
            $btnSeach.click(function(){
                var kw=$input.val().trim();
                if(kw!==""){
                    location.href=`product_category.html?kwords=${kw}`;
                }
            })
                //按键盘搜索
            $input.keyup(function(e){
                if(e.keyCode==13) $btnSeach.click();
            })
           if(location.search.indexOf("kwords")!==-1){
               var kwords = decodeURI(location.search.split("=")[1])
               $input.val(kwords)//把文字保留在输入框里面
           }

            //点击事件弹出登录窗口
            $(".login_a").click(function (e) {
                e.preventDefault();
                var height=$("body").height();
                $(".bg_lg").show().height(height);
            });
            $(".close").click(function (e) {
                e.preventDefault();
                $(".bg_lg").hide();
            });
        //判断用户是否登录
        $.ajax({
            url:"http://localhost:4000/user/islogin",
            type:"get",
            dataType:"json",
            success:function(res){
              if(res.ok==0){
                $(".ym_login").show().next().hide();
              }else{
                $(".dname").children().first().html(res.uname);
                $(".ym_login").hide().next().show();
                 //购物车数量
                $.ajax({
                    url:"http://localhost:4000/cart/count",
                    type:"get",
                    //dataType:"JSON",
                    success:function(result){
                        var count = result[0].count
                        var sum=0;
                        for(var p of result){
                            sum += p.count
                        }
                        $(".header_search .shopping").children().last().html(`(${sum})`)
                    }
                })

                //
              }
            }
          })
        //登录
            $(".login_bg button").click(function(){
                var uname=$(".login_bg input[name='uname']").val();
                var upwd=$(".login_bg input[name='upwd']").val();
               //console.log(uname)
                $.ajax({
                    url:"http://localhost:4000/user/isignn",
                    type:"post",
                    data:{uname,upwd},
                    dataType:"json",
                    success:function(res){
                        //console.log(res)
                        //console.log(111)
                        if(res.ok==1){
                            $(".bg_lg").hide();
                            $(".ym_login").hide();
                            $(".dname").show().children().first().html(uname);
                        }else{
                            alert(res.msg);
                        }
                    }
                });
                location.reload(true)//强制刷新
            })
        /****注销开始 ***********************/
            $(".signout").click(function(){
            
                $.ajax({
                    url:"http://localhost:4000/user/signout",
                    type:"get",
                    success:function(){
                        location.reload();//刷新页面
                    }
                })
            })
        /**注销结束 ******************************/
        //头部移入移除
            $(".top_nav_li").hover(function(){
                $(this).children().last().show().siblings("li.top_nav_li").children().last().hide()
            },function(){
                $(this).children().last().hide()
            })
        //nav 移入移出
            //console.log($(".nav"))
            $(".nav>ul>li").hover(function(){
                $(this).children().last().show().siblings().children().last().hide()
                //$(this).parent().addClass("active").children().last().show().parent().siblings("li").removeClass("active").children().last().hide()
            },function(){
                $(this).children().last().hide();
            })
        }
    })
   
   


    
}