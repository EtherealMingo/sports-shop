// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.supplier;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * 供應商
 */
@Data
@TableName("tb_supplier")
public class Supplier {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 供應商名稱 */
    private String name;

    /** 聯絡人 */
    private String contact;

    /** 電話 */
    private String phone;

    /** 支付方式 cash/transfer/monthly */
    private String paymentMethod;

    /** 備註 */
    private String remark;

    /** 刪除標記 0-正常 1-已刪 */
    private Integer deleted;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
