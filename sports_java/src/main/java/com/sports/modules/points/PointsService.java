// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.points;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.member.Member;

/**
 * 积分服务接口
 */
public interface PointsService {

    /**
     * 获取积分记录列表
     */
    Page<PointsRecord> getPointsList(Page<PointsRecord> page, String memberId, String type);

    /**
     * 获取会员积分余额
     */
    Integer getPointsBalance(String memberId);

    /**
     * 补赠积分
     */
    void addPoints(String memberId, Integer points, String reason, Long operatorId, String operatorName);

    /**
     * 扣除积分
     */
    void deductPoints(String memberId, Integer points, String reason, Long operatorId, String operatorName);

    /**
     * 积分核销（抵扣消费）
     */
    void redeemPoints(String memberId, Integer points, String orderId, Long operatorId, String operatorName);

    /**
     * 消费后自动发放积分
     */
    void earnPoints(String memberId, Integer amount, String orderId, Long operatorId, String operatorName);
}
