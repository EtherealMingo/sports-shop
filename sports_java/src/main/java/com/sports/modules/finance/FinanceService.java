// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.finance;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.finance.*;

import java.time.LocalDate;

public interface FinanceService {
    Page<ProfitAnalysis> getProfitAnalysis(Page<ProfitAnalysis> page, String type, LocalDate start, LocalDate end);
    Page<Payable> getPayableList(Page<Payable> page, String status);
    void addPayable(Payable payable);
    void recordPayment(Long payableId, java.math.BigDecimal amount, String method, Long operatorId);
    Page<PriceTrend> getPriceTrend(Page<PriceTrend> page, Long wireId);
    BreakEven getBreakEven(String period);
    Page<WastageAttribution> getWastageAttribution(Page<WastageAttribution> page, LocalDate start, LocalDate end);
}
