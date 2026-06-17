// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.exchange;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.common.exception.BusinessException;
import com.sports.modules.exchange.mapper.ExchangeItemMapper;
import com.sports.modules.exchange.mapper.ExchangeRecordMapper;
import com.sports.modules.member.Member;
import com.sports.modules.member.MemberService;
import com.sports.modules.points.PointsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * 兑换服务实现
 */
@Service
@RequiredArgsConstructor
public class ExchangeServiceImpl implements ExchangeService {

    private final ExchangeItemMapper exchangeItemMapper;
    private final ExchangeRecordMapper exchangeRecordMapper;
    private final MemberService memberService;
    private final PointsService pointsService;

    @Override
    public Page<ExchangeItem> getItemList(Page<ExchangeItem> page, String type) {
        LambdaQueryWrapper<ExchangeItem> wrapper = new LambdaQueryWrapper<ExchangeItem>()
            .eq(ExchangeItem::getDeleted, 0)
            .eq(ExchangeItem::getStatus, "active");
        if (type != null) {
            wrapper.eq(ExchangeItem::getType, type);
        }
        wrapper.orderByDesc(ExchangeItem::getCreateTime);
        return exchangeItemMapper.selectPage(page, wrapper);
    }

    @Override
    public ExchangeItem getItemById(Long id) {
        return exchangeItemMapper.selectById(id);
    }

    @Override
    public void createItem(ExchangeItem item) {
        item.setDeleted(0);
        item.setStatus("active");
        item.setCreateTime(LocalDateTime.now());
        item.setUpdateTime(LocalDateTime.now());
        exchangeItemMapper.insert(item);
    }

    @Override
    public void updateItem(ExchangeItem item) {
        item.setUpdateTime(LocalDateTime.now());
        exchangeItemMapper.updateById(item);
    }

    @Override
    public void deleteItem(Long id) {
        exchangeItemMapper.update(null,
            new com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper<ExchangeItem>()
                .set("deleted", 1).eq("id", id));
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ExchangeRecord redeemItem(String memberId, Long itemId, Long operatorId, String operatorName) {
        ExchangeItem item = getItemById(itemId);
        if (item == null) {
            throw new BusinessException("兑换商品不存在");
        }
        // 使用数据库原子扣减库存，防止超卖
        int stockAffected = exchangeItemMapper.decrementStock(itemId);
        if (stockAffected == 0) {
            throw new BusinessException("库存不足");
        }
        Member member = memberService.getMemberById(memberId);
        if (member == null) {
            throw new BusinessException("会员不存在");
        }
        if (member.getPoints() < item.getPoints()) {
            throw new BusinessException(1001, "积分不足");
        }
        // 扣减积分（原子操作）
        pointsService.deductPointsAtomic(memberId, item.getPoints());
        // 查询最新库存
        item = getItemById(itemId);
        // 创建兑换记录
        ExchangeRecord record = new ExchangeRecord();
        record.setMemberId(memberId);
        record.setMemberName(member.getName());
        record.setItemId(itemId);
        record.setItemName(item.getName());
        record.setPoints(item.getPoints());
        record.setStatus("pending");
        record.setCode(generateCode());
        record.setDeleted(0);
        record.setCreateTime(LocalDateTime.now());
        record.setUpdateTime(LocalDateTime.now());
        exchangeRecordMapper.insert(record);
        return record;
    }

    @Override
    public Page<ExchangeRecord> getRecordList(Page<ExchangeRecord> page, String status) {
        LambdaQueryWrapper<ExchangeRecord> wrapper = new LambdaQueryWrapper<ExchangeRecord>()
            .eq(ExchangeRecord::getDeleted, 0);
        if (status != null) {
            wrapper.eq(ExchangeRecord::getStatus, status);
        }
        wrapper.orderByDesc(ExchangeRecord::getCreateTime);
        return exchangeRecordMapper.selectPage(page, wrapper);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void redeemRecord(Long recordId, Long operatorId, String operatorName) {
        ExchangeRecord record = exchangeRecordMapper.selectById(recordId);
        if (record == null) {
            throw new BusinessException("兑换记录不存在");
        }
        if (!"pending".equals(record.getStatus())) {
            throw new BusinessException("兑换记录状态异常");
        }
        record.setStatus("redeemed");
        record.setRedeemTime(LocalDateTime.now());
        record.setOperatorId(operatorId);
        record.setOperatorName(operatorName);
        record.setUpdateTime(LocalDateTime.now());
        exchangeRecordMapper.updateById(record);
    }

    private String generateCode() {
        return "EX" + System.currentTimeMillis() + UUID.randomUUID().toString().substring(0, 4).toUpperCase();
    }
}
