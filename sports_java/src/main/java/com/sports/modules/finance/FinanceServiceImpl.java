// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.finance;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.finance.mapper.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class FinanceServiceImpl implements FinanceService {

    private final ProfitAnalysisMapper profitMapper;
    private final PayableMapper payableMapper;
    private final PayableRecordMapper payableRecordMapper;
    private final PriceTrendMapper priceTrendMapper;
    private final BreakEvenMapper breakEvenMapper;
    private final WastageAttributionMapper wastageMapper;

    @Override
    public Page<ProfitAnalysis> getProfitAnalysis(Page<ProfitAnalysis> page, String type, LocalDate start, LocalDate end) {
        LambdaQueryWrapper<ProfitAnalysis> wrapper = new LambdaQueryWrapper<ProfitAnalysis>()
            .eq(ProfitAnalysis::getDeleted, 0);
        if (type != null) wrapper.eq(ProfitAnalysis::getAnalysisType, type);
        if (start != null) wrapper.ge(ProfitAnalysis::getPeriodStart, start);
        if (end != null) wrapper.le(ProfitAnalysis::getPeriodEnd, end);
        wrapper.orderByDesc(ProfitAnalysis::getCreateTime);
        return profitMapper.selectPage(page, wrapper);
    }

    @Override
    public Page<Payable> getPayableList(Page<Payable> page, String status) {
        LambdaQueryWrapper<Payable> wrapper = new LambdaQueryWrapper<Payable>()
            .eq(Payable::getDeleted, 0);
        if (status != null) wrapper.eq(Payable::getStatus, status);
        wrapper.orderByDesc(Payable::getCreateTime);
        return payableMapper.selectPage(page, wrapper);
    }

    @Override
    public void addPayable(Payable payable) {
        payable.setDeleted(0);
        payable.setCreateTime(LocalDateTime.now());
        payable.setUpdateTime(LocalDateTime.now());
        payableMapper.insert(payable);
    }

    @Override
    public void recordPayment(Long payableId, java.math.BigDecimal amount, String method, Long operatorId) {
        Payable payable = payableMapper.selectById(payableId);
        if (payable == null) return;
        payable.setPaidAmount(payable.getPaidAmount().add(amount));
        payable.setRemainingAmount(payable.getTotalPayable().subtract(payable.getPaidAmount()));
        if (payable.getRemainingAmount().compareTo(java.math.BigDecimal.ZERO) <= 0) {
            payable.setStatus("paid");
        } else {
            payable.setStatus("partial");
        }
        payable.setUpdateTime(LocalDateTime.now());
        payableMapper.updateById(payable);
        PayableRecord record = new PayableRecord();
        record.setPayableId(payableId);
        record.setSupplierId(payable.getSupplierId());
        record.setPaidAmount(amount);
        record.setPaidMethod(method);
        record.setPaidBy(operatorId);
        record.setDeleted(0);
        record.setCreateTime(LocalDateTime.now());
        payableRecordMapper.insert(record);
    }

    @Override
    public Page<PriceTrend> getPriceTrend(Page<PriceTrend> page, Long wireId) {
        return priceTrendMapper.selectPage(page,
            new LambdaQueryWrapper<PriceTrend>()
                .eq(PriceTrend::getWireId, wireId)
                .eq(PriceTrend::getDeleted, 0)
                .orderByDesc(PriceTrend::getRecordedAt)
        );
    }

    @Override
    public BreakEven getBreakEven(String period) {
        return breakEvenMapper.selectOne(
            new LambdaQueryWrapper<BreakEven>()
                .eq(BreakEven::getPeriod, period)
                .eq(BreakEven::getDeleted, 0)
        );
    }

    @Override
    public Page<WastageAttribution> getWastageAttribution(Page<WastageAttribution> page, LocalDate start, LocalDate end) {
        LambdaQueryWrapper<WastageAttribution> wrapper = new LambdaQueryWrapper<WastageAttribution>()
            .eq(WastageAttribution::getDeleted, 0);
        if (start != null) wrapper.ge(WastageAttribution::getServiceDate, start);
        if (end != null) wrapper.le(WastageAttribution::getServiceDate, end);
        wrapper.orderByDesc(WastageAttribution::getCreateTime);
        return wastageMapper.selectPage(page, wrapper);
    }
}
