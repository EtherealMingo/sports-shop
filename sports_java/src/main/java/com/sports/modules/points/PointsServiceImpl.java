// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.points;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.common.exception.BusinessException;
import com.sports.modules.member.Member;
import com.sports.modules.member.MemberService;
import com.sports.modules.points.mapper.PointsRecordMapper;
import com.sports.modules.points.mapper.PointsRuleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * 积分服务实现
 */
@Service
@RequiredArgsConstructor
public class PointsServiceImpl implements PointsService {

    private final PointsRecordMapper pointsRecordMapper;
    private final MemberService memberService;
    private final PointsRuleMapper pointsRuleMapper;

    @Override
    public Page<PointsRecord> getPointsList(Page<PointsRecord> page, String memberId, String type) {
        LambdaQueryWrapper<PointsRecord> wrapper = new LambdaQueryWrapper<PointsRecord>()
            .eq(PointsRecord::getDeleted, 0);
        if (memberId != null) {
            wrapper.eq(PointsRecord::getMemberId, memberId);
        }
        if (type != null) {
            wrapper.eq(PointsRecord::getType, type);
        }
        wrapper.orderByDesc(PointsRecord::getCreateTime);
        return pointsRecordMapper.selectPage(page, wrapper);
    }

    @Override
    public Integer getPointsBalance(String memberId) {
        Member member = memberService.getMemberById(memberId);
        if (member == null) {
            throw new BusinessException("会员不存在: " + memberId);
        }
        return member.getPoints();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void addPoints(String memberId, Integer points, String reason, Long operatorId, String operatorName) {
        int affected = memberService.addPointsAtomic(memberId, points);
        if (affected == 0) {
            throw new BusinessException("会员不存在或更新失败: " + memberId);
        }
        Member member = memberService.getMemberById(memberId);
        int newBalance = member.getPoints();
        PointsRecord record = new PointsRecord();
        record.setMemberId(memberId);
        record.setMemberName(member.getName());
        record.setPoints(points);
        record.setType("earn");
        record.setReason(reason);
        record.setBalanceAfter(newBalance);
        record.setOperatorId(operatorId);
        record.setOperatorName(operatorName);
        record.setDeleted(0);
        record.setCreateTime(LocalDateTime.now());
        record.setUpdateTime(LocalDateTime.now());
        pointsRecordMapper.insert(record);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deductPoints(String memberId, Integer points, String reason, Long operatorId, String operatorName) {
        int affected = memberService.deductPointsAtomic(memberId, points);
        if (affected == 0) {
            throw new BusinessException(1001, "积分不足或会员不存在: " + memberId);
        }
        Member member = memberService.getMemberById(memberId);
        int newBalance = member.getPoints();
        PointsRecord record = new PointsRecord();
        record.setMemberId(memberId);
        record.setMemberName(member.getName());
        record.setPoints(-points);
        record.setType("deduct");
        record.setReason(reason);
        record.setBalanceAfter(newBalance);
        record.setOperatorId(operatorId);
        record.setOperatorName(operatorName);
        record.setDeleted(0);
        record.setCreateTime(LocalDateTime.now());
        record.setUpdateTime(LocalDateTime.now());
        pointsRecordMapper.insert(record);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void redeemPoints(String memberId, Integer points, String orderId, Long operatorId, String operatorName) {
        deductPoints(memberId, points, "积分核销-" + orderId, operatorId, operatorName);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void earnPoints(String memberId, Integer amount, String orderId, Long operatorId, String operatorName) {
        // 从 tb_points_rule 读取 earn_rate
        PointsRule rule = pointsRuleMapper.selectOne(
            new LambdaQueryWrapper<PointsRule>()
                .eq(PointsRule::getStatus, 1)
                .eq(PointsRule::getDeleted, 0)
                .orderByDesc(PointsRule::getCreateTime)
                .last("LIMIT 1")
        );
        Integer earnRate = (rule != null && rule.getEarnRate() != null) ? rule.getEarnRate() : 1;
        Integer points = amount * earnRate;
        addPoints(memberId, points, "消费获得积分-" + orderId, operatorId, operatorName);
    }
}
