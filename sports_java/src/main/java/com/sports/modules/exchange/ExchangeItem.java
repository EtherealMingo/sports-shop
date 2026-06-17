package com.sports.modules.exchange;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("tb_exchange_item")
public class ExchangeItem {

    @TableId(type = IdType.AUTO)
    private Long id;

    private String name;
    private String description;
    private Integer points;
    private Integer stock;
    private String image;
    private String type;
    private String status;
    private Integer deleted;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
