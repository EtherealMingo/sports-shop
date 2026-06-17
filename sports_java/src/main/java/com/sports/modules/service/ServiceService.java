// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.service.ServiceProgress;
import com.sports.modules.service.ServiceHistory;
import com.sports.modules.service.Recommendation;

public interface ServiceService {
    Page<ServiceProgress> getProgressList(Page<ServiceProgress> page, String status);
    Page<ServiceHistory> getHistoryList(Page<ServiceHistory> page, String memberId);
    ServiceProgress getProgressByAppointmentId(Long appointmentId);
    void updateProgressStatus(Long id, String status, String note);
    Page<Recommendation> getRecommendations(Long memberId);
}
