$(function(){
    //查看用户名有没有注册
    var suc=false;
    $(".reg").on("blur","input",function(){
        //用户
        var uname=$(this).val();
        //密码
        var upwd = /^\w{6,18}$/;
        if(upwd.test($("#upwd").val())) {
            var upwd=$("#upwd").val();
            $("#upwd").next().html(" ")
            
        }else{
            $("#upwd").next().html("密码由6-18位的数字、字母、下划线组成")
            return;
        }
        //确认密码
        var cpwd = $("#cpwd").val();
        //console.log(11)
        //console.log(upwd,cpwd)
        if(upwd == cpwd){
            var cpwd = $("#cpwd").val();
            $("#cpwd").next().hide();
            $("#cpwd").next().html(" ")
            
        }else{
            $("#cpwd").next().html("两次输入的密码不一致")
            return;
        }

        //邮箱
       
        if($(this)==$("#email")){
        var email=/^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;    
        if(email.test($("#email").val())) {
            var email=$("#email").val();
            $("#email").next().html(" ")
            
        }else{
            $("#email").next().html("Email格式不正确，例如web@sohu.com")
            return;
        }}
        console.log($(this))
        console.log($("#email"))
        //电话
        var tel = /^1\d{10}$/;
        //console.log(tel.test($("#tel").val()))
        //console.log(11)
        if(tel.test($("#tel").val())) {
           var tel=$("#tel").val();
            $("#tel").next().html(" ")
            ++suc
        }else{
            $("#tel").next().html("手机号码不正确，请重新输入")
            return;
        }
        //console.log(22)
        //console.log(suc)
        $.ajax({
           url:"http://localhost:4000/user/isRegister",
            type:"get",
            data:{uname},
            dataType:"json",
            success: function(res) {
                if(res.ok==1){
                 $(".showUname").show();
                 suc=false;
                }
                else if(res.ok==0){
                $(".showUname").hide();
                suc=true;
                } 
            }
        })
    })
    //注册
        $(".reg button").click(function(){
             uname=$("#uname").val();
            upwd=$("#upwd").val();
            var cpwd=$("#cpwd").val();
            var email=$("#email").val();
            var tel=$("#tel").val();
            $.ajax({
                url:"http://localhost:4000/user/register",
                data:{uname,upwd,cpwd,email,tel},
                type:"post",
                dataType:"JSON",
                success: function(res){
                    if(res.ok == 1) alert("注册成功")
                    else if(res.ok == 0) alter("注册失败")
                }
            })  
        })
  
})







