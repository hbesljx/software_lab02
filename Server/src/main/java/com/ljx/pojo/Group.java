package com.ljx.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import lombok.Data;

/**
 * @TableName group
 */
@TableName(value ="group")
@Data
public class Group implements Serializable {
    private Integer id;

    private String oname;

    private String oid;

    private static final long serialVersionUID = 1L;
}