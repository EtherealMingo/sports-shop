// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.log;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.log.OperationLog;

public interface OperationLogService {
    Page<OperationLog> getLogList(Page<OperationLog> page, String module, String action);
    void recordLog(OperationLog log);
}
