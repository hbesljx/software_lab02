$('#submit').click(function (){
    let username=document.getElementById("username").value;
    let password=document.getElementById("pwd").value;
    let formData={"username":username,"password":password};
    let jsonData=JSON.stringify(formData);
    $.ajax({
        type:"post",
        url: "/login",
        data:jsonData,
        dataType:"json",
        contentType : "application/json;charset=UTF-8",
        success: function(data){             //此处的data就是一个json对象
            let code=data.code;
            console.log(data);
            console.log(code);
            if(code==200){
                alert("登录成功!");
                location.href="index1.html?username="+username;
            }
            else{
                alert("账号或用户名错误!");
            }
        }
    })
})
// document.addEventListener('DOMContentLoaded', function() {
//     var loginForm = document.getElementById('login');
//     loginForm.onsubmit = function(event) {
//         event.preventDefault(); // 阻止表单默认提交行为
//
//         var username = document.getElementById('username');
//         var pwd = document.getElementById('pwd');
//
//         if (username.value.trim() === '') {
//             alert('用户名不能为空！');
//             event.preventDefault(); // 阻止表单提交
//             return;
//         }
//         if (pwd.value.trim() === '') {
//             alert('密码不能为空！');
//             event.preventDefault(); // 阻止表单提交
//             return;
//         }
//         var url = 'http://localhost:3000/login';//后端接口
//
//         // 使用fetch发送AJAX请求
//         fetch(url, {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json" , },
//         body : JSON.stringify({ username: username, password: pwd })
//     })
//     .then(response => response.json()) // 解析JSON响应
//             .then(data => {
//                 console.log(data);
//                 // 这里应根据后端返回的数据进行处理
//                 if (data.code === 200) {
//                     var root = data.data;
//                     alert('登录成功，欢迎回来，' + (username));
//                     sessionStorage.setItem('root', 'root');
//                     sessionStorage.setItem('username', 'username');
//                     if(root === 1)
//                     {
//                         window.location = 'index1.html';
//                     }
//                     if(root === 2)
//                     {
//                         window.location = 'index2.html';
//                     }
//                     if(root === 3)
//                     {
//                         window.location = 'index3.html';
//                     }
//                 } else if (data.code === 500) {
//                     // 登录失败，用户信息不匹配
//                     alert('登录失败：用户名或密码错误！');
//                 } else {
//                     // 其他错误处理
//                     alert('登录时发生未知错误，请稍后重试！');
//                 }
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//                 alert('登录请求失败，请稍后重试！');
//             });
//     };
// });