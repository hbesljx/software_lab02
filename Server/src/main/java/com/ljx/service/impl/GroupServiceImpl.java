package com.ljx.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ljx.pojo.Group;
import com.ljx.service.GroupService;
import com.ljx.mapper.GroupMapper;
import org.springframework.stereotype.Service;

/**
* @author 86191
* @description 针对表【group】的数据库操作Service实现
* @createDate 2024-06-05 19:04:47
*/
@Service
public class GroupServiceImpl extends ServiceImpl<GroupMapper, Group>
    implements GroupService{

}




