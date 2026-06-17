// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.service.mapper.ServiceProgressMapper;
import com.sports.modules.service.mapper.ServiceHistoryMapper;
import com.sports.modules.service.mapper.RecommendationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ServiceServiceImpl implements ServiceService {

    private final ServiceProgressMapper progressMapper;
    private final ServiceHistoryMapper historyMapper;
    private final RecommendationMapper recommendationMapper;

    @Override
    public Page<ServiceProgress> getProgressList(Page<ServiceProgress> page, String status) {
        LambdaQueryWrapper<ServiceProgress> wrapper = new LambdaQueryWrapper<ServiceProgress>()
            .eq(ServiceProgress::getDeleted, 0);
        if (status != null) wrapper.eq(ServiceProgress::getStatus, status);
        wrapper.orderByDesc(ServiceProgress::getCreateTime);
        return progressMapper.selectPage(page, wrapper);
    }

    @Override
    public Page<ServiceHistory> getHistoryList(Page<ServiceHistory> page, String memberId) {
        LambdaQueryWrapper<ServiceHistory> wrapper = new LambdaQueryWrapper<ServiceHistory>()
            .eq(ServiceHistory::getDeleted, 0);
        if (memberId != null) wrapper.eq(ServiceHistory::getMemberId, memberId);
        wrapper.orderByDesc(ServiceHistory::getCreateTime);
        return historyMapper.selectPage(page, wrapper);
    }

    @Override
    public ServiceProgress getProgressByAppointmentId(Long appointmentId) {
        return progressMapper.selectOne(
            new LambdaQueryWrapper<ServiceProgress>()
                .eq(ServiceProgress::getAppointmentId, appointmentId)
                .eq(ServiceProgress::getDeleted, 0)
        );
    }

    @Override
    public void updateProgressStatus(Long id, String status, String note) {
        ServiceProgress progress = new ServiceProgress();
        progress.setId(id);
        progress.setStatus(status);
        progress.setProgressNote(note);
        progress.setUpdateTime(LocalDateTime.now());
        progressMapper.updateById(progress);
    }

    @Override
    public Page<Recommendation> getRecommendations(Long memberId) {
        return recommendationMapper.selectPage(
            new Page<>(1, 10),
            new LambdaQueryWrapper<Recommendation>()
                .eq(Recommendation::getMemberId, String.valueOf(memberId))
                .eq(Recommendation::getStatus, "shown")
                .orderByDesc(Recommendation::getScore)
        );
    }
}
