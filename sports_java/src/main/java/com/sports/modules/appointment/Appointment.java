package com.sports.modules.appointment;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("tb_appointment")
public class Appointment {

    @TableId(type = IdType.AUTO)
    private Long id;

    private String memberId;
    private String serviceType;
    private String appointmentDate;
    private String timeSlot;
    private Integer racketCount;
    private String requirements;
    private String status;
    private Integer deleted;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
