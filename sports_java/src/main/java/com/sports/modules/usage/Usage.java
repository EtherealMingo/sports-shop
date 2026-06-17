// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.usage;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 正常消耗記錄
 */
@Data
@TableName("tb_usage")
public class Usage {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 線材ID */
    private Long wireId;

    /** 消耗日期 */
    private LocalDate usageDate;

    /** 消耗數量（條） */
    private Integer quantity;

    /** 用途類型 service-服務消耗 */
    private String usageType;

    /** 關聯服務單號 */
    private String relatedOrder;

    /** 操作人 */
    private String operator;

    /** 備註 */
    private String remark;

    /** 刪除標記 0-正常 1-已刪 */
    private Integer deleted;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
