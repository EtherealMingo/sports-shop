// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.usage;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.usage.Usage;

public interface UsageService {

    Page<Usage> getUsageList(Page<Usage> page, Long wireId, String startDate, String endDate);

    void createUsage(Usage usage);

    void deleteUsage(Long id);
}
