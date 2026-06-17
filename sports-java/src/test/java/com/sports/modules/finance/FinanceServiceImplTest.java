// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.finance;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.finance.mapper.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FinanceServiceImplTest {

    @Mock
    private ProfitAnalysisMapper profitMapper;
    @Mock
    private PayableMapper payableMapper;
    @Mock
    private PayableRecordMapper payableRecordMapper;
    @Mock
    private PriceTrendMapper priceTrendMapper;
    @Mock
    private BreakEvenMapper breakEvenMapper;
    @Mock
    private WastageAttributionMapper wastageMapper;

    private FinanceServiceImpl financeService;

    private Payable testPayable;

    @BeforeEach
    void setUp() {
        financeService = new FinanceServiceImpl(
            profitMapper, payableMapper, payableRecordMapper,
            priceTrendMapper, breakEvenMapper, wastageMapper
        );
        testPayable = new Payable();
        testPayable.setId(1L);
        testPayable.setSupplierId(1L);
        testPayable.setSupplierName("上海羽毛球用品批发");
        testPayable.setTotalPayable(new BigDecimal("5000.00"));
        testPayable.setPaidAmount(new BigDecimal("2000.00"));
        testPayable.setRemainingAmount(new BigDecimal("3000.00"));
        testPayable.setDueDate(LocalDate.of(2026, 7, 15));
        testPayable.setStatus("unpaid");
        testPayable.setDeleted(0);
    }

    @Test
    @DisplayName("查询利润分析")
    void getProfitAnalysis() {
        Page<ProfitAnalysis> mockPage = new Page<>(1, 10);
        when(profitMapper.selectPage(any(Page.class), any(LambdaQueryWrapper.class))).thenReturn(mockPage);

        assertNotNull(financeService.getProfitAnalysis(new Page<>(1, 10), null, null, null));
    }

    @Test
    @DisplayName("查询应付账款列表")
    void getPayableList() {
        Page<Payable> mockPage = new Page<>(1, 10);
        mockPage.setRecords(java.util.List.of(testPayable));
        mockPage.setTotal(1);
        when(payableMapper.selectPage(any(Page.class), any(LambdaQueryWrapper.class))).thenReturn(mockPage);

        Page<Payable> result = financeService.getPayableList(new Page<>(1, 10), null);

        assertNotNull(result);
        assertEquals(1, result.getTotal());
    }

    @Test
    @DisplayName("记录付款 - 部分付款")
    void recordPayment_Partial() {
        when(payableMapper.selectById(1L)).thenReturn(testPayable);
        when(payableMapper.updateById(any(Payable.class))).thenReturn(1);
        when(payableRecordMapper.insert(any(PayableRecord.class))).thenReturn(1);

        financeService.recordPayment(1L, new BigDecimal("1000.00"), "transfer", 1L);

        assertEquals(new BigDecimal("3000.00"), testPayable.getPaidAmount());
        assertEquals("partial", testPayable.getStatus());
    }

    @Test
    @DisplayName("记录付款 - 全额付款")
    void recordPayment_Full() {
        when(payableMapper.selectById(1L)).thenReturn(testPayable);
        when(payableMapper.updateById(any(Payable.class))).thenReturn(1);
        when(payableRecordMapper.insert(any(PayableRecord.class))).thenReturn(1);

        financeService.recordPayment(1L, new BigDecimal("3000.00"), "transfer", 1L);

        assertEquals("paid", testPayable.getStatus());
    }
}
