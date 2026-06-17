// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.finance;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@Tag(name = "财务管理", description = "利润分析、应付账款、价格趋势接口")
@RestController
@RequestMapping("/api/finance")
@RequiredArgsConstructor
public class FinanceController {

    private final FinanceService financeService;

    @Operation(summary = "profitAnalysis")
    @GetMapping("/profit")
    public Result<Page<ProfitAnalysis>> profitAnalysis(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        Page<ProfitAnalysis> page = new Page<>(current, pageSize);
        LocalDate start = startDate != null ? LocalDate.parse(startDate) : null;
        LocalDate end = endDate != null ? LocalDate.parse(endDate) : null;
        return Result.success(financeService.getProfitAnalysis(page, type, start, end));
    }

    @Operation(summary = "payableList")
    @GetMapping("/payable")
    public Result<Page<Payable>> payableList(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String status) {
        Page<Payable> page = new Page<>(current, pageSize);
        return Result.success(financeService.getPayableList(page, status));
    }

    @Operation(summary = "记录付款")
    @PostMapping("/payable/{id}/pay")
    public Result<Void> recordPayment(
            @PathVariable Long id,
            @RequestParam java.math.BigDecimal amount,
            @RequestParam(required = false) String method,
            @RequestParam(required = false) Long operatorId) {
        financeService.recordPayment(id, amount, method, operatorId);
        return Result.success();
    }

    @Operation(summary = "priceTrend")
    @GetMapping("/price-trend")
    public Result<Page<PriceTrend>> priceTrend(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam Long wireId) {
        Page<PriceTrend> page = new Page<>(current, pageSize);
        return Result.success(financeService.getPriceTrend(page, wireId));
    }

    @Operation(summary = "breakEven")
    @GetMapping("/break-even/{period}")
    public Result<BreakEven> breakEven(@PathVariable String period) {
        return Result.success(financeService.getBreakEven(period));
    }

    @Operation(summary = "wastageAttribution")
    @GetMapping("/wastage")
    public Result<Page<WastageAttribution>> wastageAttribution(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        Page<WastageAttribution> page = new Page<>(current, pageSize);
        LocalDate start = startDate != null ? LocalDate.parse(startDate) : null;
        LocalDate end = endDate != null ? LocalDate.parse(endDate) : null;
        return Result.success(financeService.getWastageAttribution(page, start, end));
    }
}
