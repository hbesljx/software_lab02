/*获取到Url里面的参数*/
(function ($) {
    $.getUrlParam = function (name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery);
$(document).ready(function () {
    // 显示设备数据
    function displayMachines(containerId, machines, includeButtons) {
        let html = machines.length ? '' : '<div class="no-results">未搜索到该设备。</div>';
        machines.forEach(function (machine, index) {
            html += '<div class="machine-item" data-index="' + index + '">';
            html += '<img src="' + machine.pagesrc + '" alt="' + machine.mname + '">';
            html += '<div class="machine-info">';
            html += '<h3>' + machine.mname + '</h3>';
            html += '<p>型号规格: ' + machine.info + '</p>';
            html += '<p>购置日期: ' + machine.time + '</p>';
            html += '<p>设备类别: ' + machine.type + '</p>';
            html += '<p>状态: ' + (machine.status === 1 ? '正常' : '废置') + '</p>';
            html += '</div>';
            if (includeButtons) {
                html += '<button class="edit-button">修改</button>';
                html += '<button class="delete-button">删除</button>';
            }
            html += '</div>';
        });
        $('#' + containerId).html(html);
    }
    let username=$.getUrlParam('username');//name就是您参数里面的名字  然后将取出来的参数赋值给一个变量，就可以在当前页面获取到了
    let username1 =document.getElementById('username1');
    username1.innerText=username;
    let userlevel=document.getElementById("userroot");
    // API URLs
    let machineApiUrl = 'http://localhost:8080/queryAllMachines';
    let userApiUrl = 'http://localhost:3000/api/users';

    let total_machines;
    // 当前分页信息
    let currentPage = 1;
    let pageSize = 2;

    $.ajax({
        url: "/queryAll?username="+username,
        type: 'GET',
        data: {},
        dataType:"json",
        success: function(data){
            displayMachines('machine-list-manage', data.machineData.machines, true);
            total_machines=data.machineData.machines;
            let level=data.machineData.level;
            switch (level){
                case "0":
                    userlevel.innerText="普通用户";
                    break;
                case "1":
                    userlevel.innerText="单位管理员";
                    break;
                case "2":
                    userlevel.innerText="系统管理员";
                    break;
            }
            console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('AJAX error:', textStatus, errorThrown);
        }
    })
    // AJAX请求获取数据
    function fetchData(apiUrl, successCallback) {
        $.ajax({
            url: apiUrl,
            type: 'GET',
            data: { pageNum: currentPage, pageSize: pageSize },
            success: successCallback,
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('AJAX error:', textStatus, errorThrown);
            }
        });
    }

    // 显示用户数据
    function displayUsers(users) {
        let html = users.length ? '' : '<div class="no-results">当前无用户。</div>';
        users.forEach(function (user, index) {
            html += '<div class="user-item" data-index="' + index + '">';
            html += '<div class="user-info">';
            html += '<h3>' + user.username + '</h3>';
            html += '<p>ID: ' + user.id + '</p>';
            html += '<p>所属单位编号: ' + user.departmentid + '</p>';
            html += '<p>权限等级: ' + user.root + '</p>';
            html += '<p>状态: <span class="user-status">' + (user.status === 1 ? '正常' : '禁用') + '</span></p>';
            html += '<div class="user-actions">';
            html += '<button class="edit-user-authority-button">修改用户权限</button>';
            html += '<button class="edit-user-status-button">修改用户状态</button>';
            html += '<div class="user-status-dropdown" style="display:none;">';
            html += '<select class="edit-user-status-dropdown">';
            html += '<option value="0">正常</option>';
            html += '<option value="1">禁用</option>';
            html += '</select>';
            html += '<button class="edit-user-status-confirm">确认</button>';
            html += '</div>';
            html += '<div class="user-authority-dropdown" style="display:none;">';
            html += '<select class="edit-user-authority-dropdown">';
            html += '<option value="1">权限等级 1</option>';
            html += '<option value="2">权限等级 2</option>';
            html += '<option value="3">权限等级 3</option>';
            html += '</select>';
            html += '<button class="edit-user-authority-confirm">确认</button>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        });
        $('#user-manage').html(html);
    }

    // 获取设备和用户数据
    fetchData(machineApiUrl, function(data) {
        displayMachines('machine-list-manage', data.machineData, true);
        displayMachines('information', data.machineData, false);
    });

    fetchData(userApiUrl, function(data) {
        displayUsers(data.userData);
    });

    // 处理侧边栏导航
    $("#sidebar .nav a").click(function () {
        let target = $(this).data('target');
        $('.page').hide();
        $('#' + target).show();
    });

    $('#information').show(); // 显示默认页面

    // 添加设备表单提交事件
    $('#add-machine').submit(function(e) {
        e.preventDefault();
        let newMachine = {
            mname: $('#new-mname').val(),
            pagesrc: $('#new-pagesrc').val(),
            info: $('#new-info').val(),
            time: $('#new-time').val(),
            oid: $('#new-oid').val(),
            type: $('#new-type').val(),
            status: parseInt($('#new-status').val(), 10)
        };
        $.ajax({
            url: "/addMachine",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newMachine),
            success: function(data) {
                $.ajax({
                    url: "/queryAll?username="+username,
                    type: 'GET',
                    data: {},
                    dataType:"json",
                    success: function(data1){
                        displayMachines('machine-list-manage', data1.machineData.machines, true);
                        total_machines=data1.machineData.machines;
                        data=data1;
                        displayMachines('machine-list-manage', data.machineData.machines, true);
                        displayMachines('information', data.machineData.machines, false);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.error('AJAX error:', textStatus, errorThrown);
                    }
                })
            },
            error: function() {
                alert('Error adding machine');
            }
        });
    });

    // 绑定删除按钮事件
    $('body').on('click', '.delete-button', function() {
        let index = $(this).closest('.machine-item').data('index');
        let mid = total_machines[index].mid;
        $.ajax({
            url: "/deleteMachine?username="+username+"&mid="+mid,
            type: 'GET',
            data: {},
            success: function(data) {
                alert(data.machineData);
                $.ajax({
                    url: "/queryAll?username="+username,
                    type: 'GET',
                    data: {},
                    dataType:"json",
                    success: function(data1){
                        displayMachines('machine-list-manage', data1.machineData.machines, true);
                        total_machines=data1.machineData.machines;
                        data=data1;
                        displayMachines('machine-list-manage', data.machineData.machines, true);
                        displayMachines('information', data.machineData.machines, false);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.error('AJAX error:', textStatus, errorThrown);
                    }
                })
            },
            error: function() {
                alert('Error deleting machine');
            }
        });
    });

    // 绑定修改按钮事件
    $('body').on('click', '.edit-button', function() {
        console.log("test01");
        console.log(total_machines);
        let update_form=document.getElementById("update-machine-div");
        update_form.style.display="block";
        let parentDiv = $(this).closest('.machine-item');
        let index = parentDiv.data('index');
        console.log(index);
        let machine = total_machines[index];
        console.log(machine);
        let mname1=document.getElementById("new-mname1");
        let pagesrc1=document.getElementById("new-pagesrc1");
        let info1=document.getElementById("new-info1");
        let type1=document.getElementById("new-type1");
        let status1=document.getElementById("new-status1");
        mname1.value=machine.mname;
        pagesrc1.value=machine.pagesrc;
        info1.value=machine.info;
        type1.value=machine.type;
        status1.value=machine.status;
        $.ajax({
            url:"/getMname?mname="+machine.mname,
            type:'GET',
            data:{},
            success:function (){

            }
        })
        // 添加设备表单提交事件
        $('#update-machine').submit(function(e) {
            e.preventDefault();
            let newMachine = {
                mname: $('#new-mname1').val(),
                pagesrc: $('#new-pagesrc1').val(),
                info: $('#new-info1').val(),
                time: $('#new-time1').val(),
                oid: $('#new-oid1').val(),
                type: $('#new-type1').val(),
                status: parseInt($('#new-status1').val(), 10)
            };
            $.ajax({
                url: "/updateMachine?username="+username,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(newMachine),
                success: function(data) {
                    let update_form=document.getElementById("update-machine-div");
                    update_form.style.display="none";
                    alert(data.machineData);
                    console.log(data);
                    $.ajax({
                        url: "/queryAll?username="+username,
                        type: 'GET',
                        data: {},
                        dataType:"json",
                        success: function(data1){
                            displayMachines('machine-list-manage', data1.machineData.machines, true);
                            total_machines=data1.machineData.machines;
                            data=data1;
                            displayMachines('machine-list-manage', data.machineData.machines, true);
                            displayMachines('information', data.machineData.machines, false);
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            console.error('AJAX error:', textStatus, errorThrown);
                        }
                    })
                },
                error: function() {
                    alert('Error adding machine');
                }
            });
        });
        $
        // let formHtml = '<form class="edit-form">' +
        //     '<input type="text" class="edit-mname" value="' + machine.mname + '">' +
        //     '<input type="text" class="edit-pagesrc" value="' + machine.pagesrc + '">' +
        //     '<input type="text" class="edit-info" value="' + machine.info + '">' +
        //     '<input type="text" class="edit-time" value="' + machine.time + '">' +
        //     '<input type="text" class="edit-oid" value="' + machine.oid + '">' +
        //     '<input type="text" class="edit-type" value="' + machine.type + '">' +
        //     '<select class="edit-status"><option value="0"' + (machine.status === 0 ? ' selected' : '') + '>正常</option>' +
        //     '<option value="1"' + (machine.status === 1 ? ' selected' : '') + '>废置</option></select>' +
        //     '<button type="submit">修改完成</button>' +
        //     '</form>';
        // parentDiv.append(formHtml);
        // $(this).prop('disabled', true); // 禁用修改按钮，防止重复点击
    });

    // 绑定表单提交事件更新数据
    $('body').on('submit', '.edit-form', function(e) {
        e.preventDefault();
        let parentDiv = $(this).closest('.machine-item');
        let index = parentDiv.data('index');
        let updatedMachine = {
            mname: $('.edit-mname').val(),
            pagesrc: $('.edit-pagesrc').val(),
            info: $('.edit-info').val(),
            time: $('.edit-time').val(),
            oid: $('.edit-oid').val(),
            type: $('.edit-type').val(),
            status: parseInt($('.edit-status').val(), 10)
        };
        $.ajax({
            url: machineApiUrl + '/' + machineData[index].mid,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedMachine),
            success: function() {
                fetchData(machineApiUrl, function(data) {
                    displayMachines('machine-list-manage', data.machineData, true);
                    displayMachines('information', data.machineData, false);
                });
            },
            error: function() {
                alert('Error updating machine');
            }
        });
    });

    // 添加用户表单提交事件（类似设备管理）
    $('#add-user').submit(function(e) {
        e.preventDefault();
        let newUser = {
            username: $('#new-username').val(),
            departmentid: $('#new-departmentid').val(),
            root: $('#new-root').val(),
            status: parseInt($('#new-status').val(), 10)
        };
        $.ajax({
            url: userApiUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newUser),
            success: function() {
                fetchData(userApiUrl, function(data) {
                    displayUsers(data.userData);
                });
            },
            error: function() {
                alert('Error adding user');
            }
        });
    });

    // 点击修改用户状态按钮
$('body').on('click', '.edit-user-status-button', function() {
    $(this).siblings('.user-status-dropdown').toggle();
});

// 点击修改用户状态确认按钮
$('body').on('click', '.edit-user-status-confirm', function() {
    let selectedStatus = $(this).siblings('.edit-user-status-dropdown').val();
    // 在这里添加更新用户状态的 AJAX 请求
});

// 点击修改用户权限按钮
$('body').on('click', '.edit-user-authority-button', function() {
    $(this).siblings('.user-authority-dropdown').toggle();
});

// 点击修改用户权限确认按钮
$('body').on('click', '.edit-user-authority-confirm', function() {
    let selectedAuthority = $(this).siblings('.edit-user-authority-dropdown').val();
    // 在这里添加更新用户权限的 AJAX 请求
});

})