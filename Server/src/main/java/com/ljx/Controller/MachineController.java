package com.ljx.Controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ljx.Result.Result;
import com.ljx.mapper.MachineMapper;
import com.ljx.mapper.UserMapper;
import com.ljx.pojo.Machine;
import com.ljx.pojo.Query;
import com.ljx.pojo.QueryAll;
import com.ljx.pojo.User;
import com.ljx.service.MachineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@EnableAutoConfiguration
public class MachineController {
    private String mname1;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private MachineMapper machineMapper;
    @Autowired
    private MachineService machineService;
    @RequestMapping("/test")
    @ResponseBody
    public String test(){
        return "test!";
    }
    @GetMapping("/getMname")
    @ResponseBody
    public void getMname(String mname){
        System.out.println(mname);
        mname1=mname;
        System.out.println(mname1);
    }
    @PostMapping("/queryAllMachines")
    @ResponseBody
    public Result queryAllMachines(@RequestBody Query query){
        int pageNum=query.getPageNum();
        int pageSize= query.getPageSize();
        Page<Machine> machinePage=new Page<>(pageNum,pageSize);
        LambdaQueryWrapper<Machine> machineLambdaQueryWrapper = Wrappers.lambdaQuery();
        IPage<Machine> machineIPage=machineMapper.selectPage(machinePage,machineLambdaQueryWrapper);
        return Result.success(machineIPage.getRecords(),machineIPage.getTotal());
    }
    @GetMapping("/queryAll")
    @ResponseBody
    public Result queryAll(String username){
        System.out.println(username);
        LambdaQueryWrapper<User> userLambdaQueryWrapper=new LambdaQueryWrapper<>();
        userLambdaQueryWrapper.eq(User::getUsername,username);
        List<User> users = userMapper.selectList(userLambdaQueryWrapper);
        String oid=users.get(0).getOid();
        String level = users.get(0).getLevel();
        int status = users.get(0).getStatus();//0表示禁用
        LambdaQueryWrapper<Machine> machineLambdaQueryWrapper=new LambdaQueryWrapper<>();
        List<Machine> machines = machineMapper.selectList(machineLambdaQueryWrapper);
        QueryAll queryAll=new QueryAll();
        queryAll.setUsername(username);
        queryAll.setOid(oid);
        queryAll.setLevel(level);
        queryAll.setStatus(status);
        queryAll.setMachines(machines);
        return Result.success(queryAll,0L);
    }
    @PostMapping("/addMachine")
    @ResponseBody
    public Result addMachine(@RequestBody Machine machine){
        System.out.println(machine);
        LambdaQueryWrapper<Machine> machineLambdaQueryWrapper=new LambdaQueryWrapper<>();
        machineLambdaQueryWrapper.eq(Machine::getMname,machine.getMname());
        List<Machine> machines = machineMapper.selectList(machineLambdaQueryWrapper);
        if(machines.size()!=0){
            return Result.fail();
        }
        else{
            machineMapper.insert(machine);
            return Result.success();
        }
    }
    @GetMapping("/deleteMachine")
    @ResponseBody
    public Result deleteMachine(String username,Integer mid){
        System.out.println(username+mid);
        LambdaQueryWrapper<User> userLambdaQueryWrapper=new LambdaQueryWrapper<>();
        userLambdaQueryWrapper.eq(User::getUsername,username);
        List<User> users = userMapper.selectList(userLambdaQueryWrapper);
        LambdaQueryWrapper<Machine> machineLambdaQueryWrapper=new LambdaQueryWrapper<>();
        machineLambdaQueryWrapper.eq(Machine::getMid,mid);
        List<Machine> machines = machineMapper.selectList(machineLambdaQueryWrapper);
        if(users.size()==0){
            return Result.fail();
        }
        else{
            if(users.get(0).getStatus()==0){
                return Result.fail("用户已被禁用!",1L);
            }else{
                if (users.get(0).getLevel().equals("1")&&users.get(0).getOid().equals(machines.get(0).getOid())){
                    machineMapper.delete(machineLambdaQueryWrapper);
                    return Result.success("删除成功!",1L);
                }else{
                    return Result.fail("你不是该单位管理员!",1L);
                }
            }
        }
    }
    @PostMapping("/updateMachine")
    @ResponseBody
    public Result updateMachine(String username,@RequestBody Machine machine){
        System.out.println(mname1);
        System.out.println(username);
        System.out.println(machine);
        LambdaQueryWrapper<User> userLambdaQueryWrapper=new LambdaQueryWrapper<>();
        userLambdaQueryWrapper.eq(User::getUsername,username);
        List<User> users = userMapper.selectList(userLambdaQueryWrapper);
        LambdaQueryWrapper<Machine> machineLambdaQueryWrapper=new LambdaQueryWrapper<>();
        machineLambdaQueryWrapper.eq(Machine::getMname,mname1);
        List<Machine> machines = machineMapper.selectList(machineLambdaQueryWrapper);
        if(machines.size()==0){
            return Result.fail("设备不存在!",1L);
        }else{
            if(users.get(0).getStatus()==0){
                return Result.fail("用户已被禁用!",1L);
            }else{
                if (users.get(0).getLevel().equals("1")&&users.get(0).getOid().equals(machines.get(0).getOid())){
                    machineMapper.update(machine,machineLambdaQueryWrapper);
                    return Result.success("修改成功!",1L);
                }else{
                    return Result.fail("你不是该单位管理员!",1L);
                }
            }
        }
    }
}
