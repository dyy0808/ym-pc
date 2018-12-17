window.onload=function(){
 //购物车加载
    $.ajax({
        url:"http://localhost:4000/cart/shopping_cart",
        dataType:"json",
        type:"get",
        success:function(result){
            var html = "";
           for(p of result){
                var {pid,sid,details,pic,price,href,count}=p;
                html+=`<tr>
                        <td><input type="checkbox"></td>
                        <td>${sid}</td>
                        <td>
                            <a href="${href}" class="a_link" >
                                <img src="image/small_img.png">
                                <span class="details">${details}</span>
                            </a>
                        </td>
                        <td>¥${price.toFixed(2)}</td>
                        <td class="number">
                            <input type="text" value="${count}">
                            <div class="triangle" data-pid=${pid}>
                                <span class="cart_icon_01">+</span>
                                <span class="cart_icon_02">-</span>
                            </div>
                        </td>
                        <td class="a_link">21</td>
                        <td class="price">¥${parseFloat((count*price).toFixed(2))}</td>
                        <td>
                            <a href="#" class="a_link cart_del">删除</a>
                            <a href="#" class="a_link">收藏</a>
                        </td>
                    </tr>`;
           }
           $(".cart_box table tbody").html(html);
            //点击全选
            var checkAll = $(".cart_box table thead tr input[type='checkbox']");
            var checkBox=$(".cart_box table tbody tr input[type='checkbox']");
            var td = $(".cart_box table tbody tr td");
            checkAll.click(function(){
                var tue=checkAll.prop("checked");
                checkBox.prop("checked",tue)
            })
           //加总合计
            var money_sum=0;
            $(".cart_box table").on("click", "input[type='checkbox']",function(){
                var header_true = $(this).parent().is($("thead>tr").children().first())
                var tbody_true = $(this).parent().is($("tbody>tr").children());
                if(tbody_true && $(this).prop("checked")==true){
                    var num= parseFloat($(this).parent().parent().find(".price").html().slice(1))
                    money_sum += num
                    $(".cart_details>ul").find("span:first").html(`¥${money_sum.toFixed(2)}`)
                    $(".cart_details>ul").find("span:last").html(`¥${money_sum.toFixed(2)}`)
                }
                else if(header_true && $(this).prop("checked")==true){
                    var sum =0;
                    var $price = $(this).parent().parent().parent().next().find(".price");
                    for(var i=0; i < $price.length; i++){
                        var num =parseFloat($price.eq(i).html().slice(1))
                        money_sum += num
                    }
                    $(".cart_details>ul").find("span:first").html(`¥${money_sum.toFixed(2)}`)
                    $(".cart_details>ul").find("span:last").html(`¥${money_sum.toFixed(2)}`)
                }
                else if(tbody_true && $(this).prop("checked")==false){
                var num = parseFloat($(this).parent().parent().find(".price").html().slice(1))
                console.log("a"+money_sum)
                    money_sum -= num;
                    $(".cart_details>ul").find("span:first").html(`¥${money_sum.toFixed(2)}`)
                    $(".cart_details>ul").find("span:last").html(`¥${money_sum.toFixed(2)}`)
                }
                else {
                   money_sum = 0
                   $(".cart_details>ul").find("span:first").html(`¥${money_sum.toFixed(2)}`)
                   $(".cart_details>ul").find("span:last").html(`¥${money_sum.toFixed(2)}`)
                } 
            })
            //加总合计 end

            //点击单选
            td.on("click","input[type='checkbox']",function(){
            for(var i=0;i<checkBox.length;i++){
                if(checkBox.eq(i).prop("checked")==false){
                    checkAll.prop("checked",false);
                    return;
                }
            }
            if(i==checkBox.length){
                checkAll.prop("checked",true);
            }
            
            })
            //点击加减号
           function cart_ajax(pid,count){
               
                $.ajax({
                    url:"http://localhost:4000/cart/cart_serve",
                    dataType:"json",
                    type:"post",
                    data:{pid,count},
                    success: function(res) {
                        
                    }
                })  
           }
            $(".triangle").on("click","span",function(){
                var price = $(this).parent().parent().prev().html().slice(1,)
                var money =$(this).parent().parent().next().next()
                var number=parseInt($(this).parent().prev().val());
                if($(this).html()=="+"){
                    number++
                    $(this).parent().prev().val(number)
                    var num = $(this).parent().prev().val();
                    //console.log(num)
                    //console.log(number)
                    money.html(`¥${(price*num).toFixed(2)}`)
                    var pid = $(this).parent().data("pid");
                    console.log(pid)
                    var count = 1;
                    console.log(count)
                    cart_ajax(pid,count);
                }
                else if($(this).html()=="-"){
                    if(number > 1){
                        number--
                        $(this).parent().prev().val(number)
                        var pir = money.html().slice(1,);
                        money.html(`¥${(pir-price).toFixed(2)}`)
                        var pid = $(this).parent().data("pid");
                        var count = -1;
                        cart_ajax(pid,count);
                    }
                }
            });
         //删除单个数据
        
         $(".cart_del").click(function(){
            var product_id = $(this).parent().prev().prev().prev().find(".triangle").data("pid")
            $(this).parent().parent().empty();
            $.ajax({
                url:"http://localhost:4000/cart/del",
                type:"post",
                dataType:"json",
                data:{product_id},
                success:function(){}
            })
         })
         //删除多个数据
         $(".del_all").click(function(){
            $(this).parent().prev().children().last().empty();
            $.ajax({
                url:"http://localhost:4000/cart/del",
                type:"post",
                dataType:"json",
                success:function(){}
            })
         })
         

        }
    })
}
