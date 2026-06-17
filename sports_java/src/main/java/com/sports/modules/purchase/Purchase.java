// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.purchase;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 進貨記錄（批次計價）
 */
@Data
@TableName("tb_purchase")
public class Purchase {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 線材ID */
    private Long wireId;

    /** 供應商ID */
    private Long supplierId;

    /** 進貨日期 */
    private LocalDate purchaseDate;

    /** 數量（條） */
    private Integer quantity;

    /** 單價（元） */
    private BigDecimal unitPrice;

    /** 總價（元）= quantity × unitPrice */
    private BigDecimal totalPrice;

    /** 付款方式 */
    private String paymentMethod;

    /** 批次號（如 YNK-20260612-001） */
    private String batchNo;

    /** 備註 */
    private String remark;

    /** 刪除標記 0-正常 1-已刪 */
    private Integer deleted;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
