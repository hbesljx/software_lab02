package com.ljx.Controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.ljx.Result.Result;
import com.ljx.mapper.UserMapper;
import com.ljx.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@EnableAutoConfiguration
public class UserController {
    @Autowired
    private UserMapper userMapper;
    @PostMapping("/register")
    @ResponseBody
    public Result register(@RequestBody User user){
        String username=user.getUsername();
        String password=user.getPassword();
        String oid=user.getOid();
        System.out.println(username+password+oid);

        LambdaQueryWrapper<User> userLambdaQueryWrapper=new LambdaQueryWrapper<>();
        userLambdaQueryWrapper.eq(User::getUsername,username);
        List<User> users = userMapper.selectList(userLambdaQueryWrapper);
        if(users.size()!=0){
            return Result.fail("用户已存在!",0L);
        }
        else{
            User regUser=new User();
            regUser.setUsername(username);
            regUser.setPassword(password);
            regUser.setOid(oid);
            regUser.setLevel("0");//权限默认为0，最低权限
            regUser.setStatus(1);//status默认为0，存活状态
            userMapper.insert(regUser);
            return Result.success(username,0L);
        }
//        return username+password+oid;
    }
    @PostMapping("/login")
    @ResponseBody
    public Result login(@RequestBody User user){
        String username=user.getUsername();
        String password=user.getPassword();
        LambdaQueryWrapper<User> userLambdaQueryWrapper=new LambdaQueryWrapper<>();
        userLambdaQueryWrapper.eq(User::getUsername,username);
        List<User> users = userMapper.selectList(userLambdaQueryWrapper);
        if(users.size()==0){
            return Result.fail();
        }
        else{
            User user1 = users.get(0);
            if(password.equals(user1.getPassword())){
                return  Result.success();
            }
            else{
                return Result.fail();
            }
        }
    }
}
