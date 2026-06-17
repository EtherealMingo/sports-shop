// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.technician;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

public interface TechnicianService {
    Page<Technician> getTechnicianList(Page<Technician> page, String keyword);
    Technician getTechnicianById(Long id);
    void createTechnician(Technician technician);
    void updateTechnician(Technician technician);
    void deleteTechnician(Long id);
}
