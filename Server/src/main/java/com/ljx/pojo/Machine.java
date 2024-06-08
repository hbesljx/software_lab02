package com.ljx.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * @TableName machine
 */
@TableName(value ="machine")
@Data
public class Machine implements Serializable {
    private Integer mid;

    private String mname;

    private String pagesrc;

    private String info;

    private Date time;

    private String oid;

    private String type;

    private Integer status;

    private static final long serialVersionUID = 1L;
}