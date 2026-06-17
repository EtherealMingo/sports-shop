// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.wire;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * 線材字典
 */
@Data
@TableName("tb_wire")
public class Wire {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 品牌（李寧/Yonex/王子…） */
    private String brand;

    /** 型號（N90/AB/66U…） */
    private String model;

    /** 規格粗細（如 0.65mm） */
    private String spec;

    /** 顏色 */
    private String color;

    /** 類型：tennis-網球 badminton-羽毛球 */
    private String type;

    /** 最低庫存預警線（條） */
    private Integer minStock;

    /** 刪除標記 0-正常 1-已刪 */
    private Integer deleted;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
