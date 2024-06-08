package com.ljx.Result;

import lombok.Data;

@Data
public class Result {
    private int code; // 返回编码，200->成功，400->失败
    private String msg; // 成功，失败
    private Long total; // 数据总数
    private Object machineData; // 数据
    private static Result result(int code,String msg,Long total,Object machineData){
        Result res = new Result();
        res.setMachineData(machineData);
        res.setCode(code);
        res.setMsg(msg);
        res.setTotal(total);
        return res;
    }
    public static Result fail(){
        return result(400,"失败",0L,null);
    }
    public static Result fail(Object data,Long total){
        return result(400,"失败",total,data);
    }
    public static Result success(){
        return result(200,"成功",0L,null);
    }
    public static Result success(Object data){
        return result(200,"成功",0L,data);
    }
    public static Result success(Object data,Long total){
        return result(200,"成功",total,data);
    }
}
