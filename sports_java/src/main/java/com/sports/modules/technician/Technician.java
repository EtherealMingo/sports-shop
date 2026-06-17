// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.technician;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 技师
 */
@Data
@TableName("tb_technician")
public class Technician {
    @TableId(type = IdType.AUTO)
    private Long id;
    // TODO: 补全业务字段
    private Integer deleted;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private Long createdBy;
    private Long updatedBy;
}
