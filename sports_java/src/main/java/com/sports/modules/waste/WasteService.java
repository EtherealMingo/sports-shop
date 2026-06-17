// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.waste;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.waste.Waste;

public interface WasteService {

    Page<Waste> getWasteList(Page<Waste> page, Long wireId, String startDate, String endDate, String reason);

    void createWaste(Waste waste);

    void deleteWaste(Long id);
}
