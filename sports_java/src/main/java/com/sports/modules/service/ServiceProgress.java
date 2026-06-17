// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.service;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * 服务进度
 */
@Data
@TableName("tb_service_progress")
public class ServiceProgress {
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long appointmentId;
    private String status;
    private Long technicianId;
    private String technicianName;
    private Long wireId;
    private String wireName;
    private Long qrCodeId;
    private LocalDateTime startTime;
    private LocalDateTime estimatedEnd;
    private LocalDateTime actualEnd;
    private String pauseReason;
    private String progressNote;
    private Integer deleted;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private Long createdBy;
    private Long updatedBy;
}
