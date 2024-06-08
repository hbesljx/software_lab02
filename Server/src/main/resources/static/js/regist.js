$('#submit').click(function() {
    let username = document.getElementById('username');
    let pwd = document.getElementById('pwd');
    let conpwd = document.getElementById('conpwd');
    let department = document.getElementById('department');
    if (username.value.trim() === '') {
        alert('用户名不能为空！');
        event.preventDefault(); // 阻止表单提交
        return;
    }
    if (pwd.value.trim() === '') {
        alert('密码不能为空！');
        event.preventDefault(); // 阻止表单提交
        return;
    }
    // 检查密码是否匹配
    if (pwd.value !== conpwd.value) {
        event.preventDefault(); // 阻止表单提交
        alert('两次输入密码不一致，请重新输入！');
        return;
    }
    if (department.value === '00') {
        event.preventDefault(); // 阻止表单提交
        alert('请选择所在部门！');
        return;
    }
    let formData = {
        username: username.value,
        password: pwd.value,
        // department: department.value
        oid:department.value
    };
    let formDataJSON=JSON.stringify(formData);
    $.ajax({
        type:"post",
        url: "/register",
        data:formDataJSON,
        dataType:"json",
        contentType : "application/json;charset=UTF-8",
        success: function(data){             //此处的data就是一个json对象
            let code=data.code;
            console.log(data);
            console.log(code);
            if(code==200){
                alert("注册成功!");
                location.href="login.html";
            }
            else{
                alert("注册失败!");
            }
        }
    });
    // 使用fetch发送AJAX请求
    // fetch('http://localhost:3000/register', {
    // fetch('http://localhost:8080/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData), // 将JavaScript对象转换为JSON字符串
    // })
    //         .then(response => response.json()) // 解析JSON响应
    //         .then(data => {
    //           console.log('成功:', data);
    //           window.location = 'login.html'; // 跳转到成功页面
    //         })
    //         .catch((error) => {
    //           console.error('错误:', error);
    //           alert('注册失败，请稍后重试！');
    //         });
});