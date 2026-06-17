package com.sports.modules.member;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@TableName("tb_sign_record")
public class SignRecord {

    @TableId(type = IdType.AUTO)
    private Long id;

    private String memberId;
    private LocalDate signDate;
    private Integer consecutiveDays;
    private Integer points;
    private Integer deleted;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
