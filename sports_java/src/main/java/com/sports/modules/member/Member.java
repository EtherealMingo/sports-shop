package com.sports.modules.member;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("tb_member")
public class Member {

    @TableId(type = IdType.AUTO)
    private Long id;

    private String memberId;
    private String name;
    private String phone;
    private String avatar;
    private Integer level;
    private Integer points;
    private LocalDateTime registerTime;
    private LocalDateTime lastConsumeTime;
    private Integer deleted;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
