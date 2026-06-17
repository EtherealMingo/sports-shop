package com.sports.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 线材字典
 */
@Data
@TableName("tb_wire")
public class Wire {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 品牌（李宁/Yonex/王子…） */
    private String brand;

    /** 型号（N90/AB/66U…） */
    private String model;

    /** 规格粗细（如 0.65mm） */
    private String spec;

    /** 颜色 */
    private String color;

    /** 类型：tennis-网球 badminton-羽毛球 */
    private String type;

    /** 最低库存预警线（条） */
    private Integer minStock;

    /** 删除标记 0-正常 1-已删 */
    private Integer deleted;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}

/**
 * 供应商
 */
@Data
@TableName("tb_supplier")
public class Supplier {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 供应商名称 */
    private String name;

    /** 联络人 */
    private String contact;

    /** 电话 */
    private String phone;

    /** 支付方式 cash/transfer/monthly */
    private String paymentMethod;

    /** 备注 */
    private String remark;

    private Integer deleted;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}

/**
 * 进货记录（批次计价）
 */
@Data
@TableName("tb_purchase")
public class Purchase {

    @TableId(type = IdType.AUTO)
    private Long id;

    private Long wireId;
    private Long supplierId;

    /** 进货日期 */
    private LocalDate purchaseDate;

    /** 数量（条） */
    private Integer quantity;

    /** 单价（元） */
    private BigDecimal unitPrice;

    /** 总价（元）= quantity × unitPrice */
    private BigDecimal totalPrice;

    /** 付款方式 */
    private String paymentMethod;

    /** 批次号（如 YNK-20260612-001） */
    private String batchNo;

    private String remark;
    private Integer deleted;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}

/**
 * 正常消耗记录
 */
@Data
@TableName("tb_usage")
public class Usage {

    @TableId(type = IdType.AUTO)
    private Long id;

    private Long wireId;

    /** 消耗日期 */
    private LocalDate usageDate;

    /** 消耗数量（条） */
    private Integer quantity;

    /** 用途类型 service-服务消耗 */
    private String usageType;

    /** 关联服务单号 */
    private String relatedOrder;

    /** 操作人 */
    private String operator;

    private String remark;
    private Integer deleted;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}

/**
 * 报废消耗记录
 */
@Data
@TableName("tb_waste")
public class Waste {

    @TableId(type = IdType.AUTO)
    private Long id;

    private Long wireId;

    /** 报废日期 */
    private LocalDate wasteDate;

    /** 报废数量（条） */
    private Integer quantity;

    /** 原因 break-断裂 knot-打结 human-人为损坏 other-其他 */
    private String reason;

    /** 操作人 */
    private String operator;

    private String remark;
    private Integer deleted;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
