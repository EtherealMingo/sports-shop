// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.waste;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 報廢消耗記錄
 */
@Data
@TableName("tb_waste")
public class Waste {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 線材ID */
    private Long wireId;

    /** 報廢日期 */
    private LocalDate wasteDate;

    /** 報廢數量（條） */
    private Integer quantity;

    /** 原因 break-斷裂 knot-打結 human-人為損壞 other-其他 */
    private String reason;

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
