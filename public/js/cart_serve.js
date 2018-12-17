$(function(){
    //点击购物按钮往购物车数据库增加
    $("div.product").on("click","a",function(e){
        e.preventDefault();
    })
    $("div.product").on("click",".buy",function(e){
        var pid = $(this).data("pid");
        //console.log(pid)
        //判断用户是否登录
        $.ajax({
            url:"http://localhost:4000/user/islogin",
            type:"get",
            dataType:"json",
            success:function(res){
              if(res.ok==0){//没登录的情况下请先登录
                console.log(222)
                $(".product .buy").click(function(){
                    alert("请先登录")  
                })
              }else if(res.ok==1){
                  console.log(111)
                e.preventDefault();
                var count = 1;
                var uname=$(".uname").html()
                $.ajax({
                    url:"http://localhost:4000/cart/cart_serve",
                    dataType:"json",
                    type:"post",
                    data:{pid,count,uname},
                    success: function(res) {
                        console.log(res)
                        console.log(444)
                    }
                })
                location.href="http://localhost:4000/cart.html";
              }
            }
          })
    })

})