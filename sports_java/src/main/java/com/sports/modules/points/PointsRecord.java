// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.points;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * 积分记录
 */
@Data
@TableName("tb_points_record")
public class PointsRecord {

    @TableId(type = IdType.AUTO)
    private Long id;

    private String memberId;
    private String memberName;
    private String memberPhone;
    private Integer points;
    private String type;
    private String reason;
    private Integer balanceAfter;
    private String relatedId;
    private String relatedType;
    private Long operatorId;
    private String operatorName;
    private Integer deleted;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
