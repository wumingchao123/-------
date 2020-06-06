$(function(){

    //---------------------切换登录按注册按钮-----------------------------
    $('.qu-zhuce').on('click',function(){

        $('#register').show().siblings('#login').hide();


    })

    $('.qu-denglu').on('click',function(){

        $('#register').hide().siblings('#login').show();
    })

 //---------------点击注册--------------------------------
    
    $('.zhuc').on('click',function(e){

        e.preventDefault();
        
        var data = $('#f-two').serialize();
        var password = $('.password').val().trim();
        var repassword = $('.repassword').val().trim();
        var username = $('.username').val().trim();

        if(password && repassword && username &&password===repassword){

            // 发送ajax
            $.ajax({
                type:'POST',
                url:'http://www.liulongbin.top:3007/api/reguser',
                data:data,
                success:function(res){

                    layer.msg(res.message);

                    if(res.status == 0) {

                        var timer = setInterval(function(){
                            $('#register').hide().siblings('#login').show();
                            clearInterval(timer);
                        },1000)
                    }

                }
               
            })

        } 



      
      





    })


    //---------------------表单验证-------------------------

        // 使用layui模块，必须先加载
    var form = layui.form; // 加载表单模块，得到一个对象

    form.verify({

        len:[
            /^[\S]{6,12}$/,
        '密码必须6到12位，且不能出现空格'
        ],
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
              return '用户名不能有特殊字符';
            }
            if(/(^\_)|(\__)|(\_+$)/.test(value)){
              return '用户名首尾不能出现下划线\'_\'';
            }
            if(/^\d+\d+\d$/.test(value)){
              return '用户名不能全为数字';
            }
          },
          same:function(val){

            var pass = $('.password').val().trim();
            if (v != pass){
                return '两次密码不一致'
            }
          }


    })


    //---------------------登录功能------------

    $('#login button').on('click',function(e){

        e.preventDefault();
      var lusername  = $('.l-username').val().trim();
      var lpassword = $('.l-password').val().trim();
      if(lusername && lpassword){

        $.ajax({
            type:'POST',
            url:'http://www.liulongbin.top:3007/api/login',
            data:$('#f-one').serialize(),
            success:function(res){

                // alert(res.message);
                layer.msg(res.message);
               if(res.status === 0){
                var timer =  setInterval(function(){
                    location.href = '/index.html'
                    clearInterval(timer);
                },1000)
               }

            }


        })


      }




    })
})