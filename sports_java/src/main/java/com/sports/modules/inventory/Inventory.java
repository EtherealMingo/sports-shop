// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.inventory;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

/**
 * 线材库存
 */
@Data
@TableName("tb_inventory")
public class Inventory {
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long wireId;
    private String wireName;
    private String wireBrand;
    private String wireModel;
    private Integer totalPurchased;
    private Integer totalUsed;
    private Integer totalWasted;
    private Integer currentStock;
    private java.math.BigDecimal avgCost;
    private Integer minStock;
    private Integer status;
    private Integer deleted;
    private java.time.LocalDateTime createTime;
    private java.time.LocalDateTime updateTime;
    private Long createdBy;
    private Long updatedBy;
}
