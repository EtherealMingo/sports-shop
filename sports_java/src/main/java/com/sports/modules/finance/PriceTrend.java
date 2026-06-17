// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.finance;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 价格趋势
 */
@Data
@TableName("tb_price_trend")
public class PriceTrend {
    @TableId(type = IdType.AUTO)
    private Long id;
    // TODO: 补全业务字段
    private Integer deleted;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private Long createdBy;
    private Long updatedBy;
}
