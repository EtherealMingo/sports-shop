package com.sports.modules.points;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("tb_points_rule")
public class PointsRule {

    @TableId(type = IdType.AUTO)
    private Long id;

    private Integer earnRate;
    private Integer deductRate;
    private Integer validMonths;
    private String description;
    private Integer deleted;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
