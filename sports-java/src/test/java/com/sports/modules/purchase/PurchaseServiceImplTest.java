// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.purchase;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.purchase.mapper.PurchaseMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PurchaseServiceImplTest {

    @Mock
    private PurchaseMapper purchaseMapper;

    private PurchaseServiceImpl purchaseService;

    private Purchase testPurchase;

    @BeforeEach
    void setUp() {
        purchaseService = new PurchaseServiceImpl(purchaseMapper);
        testPurchase = new Purchase();
        testPurchase.setId(1L);
        testPurchase.setWireId(1L);
        testPurchase.setSupplierId(1L);
        testPurchase.setQuantity(20);
        testPurchase.setUnitPrice(new BigDecimal("15.00"));
        testPurchase.setTotalPrice(new BigDecimal("300.00"));
        testPurchase.setBatchNo("YNX-20260601-001");
        testPurchase.setPaymentMethod("transfer");
        testPurchase.setDeleted(0);
    }

    @Test
    @DisplayName("查询进货列表")
    void getPurchaseList() {
        Page<Purchase> mockPage = new Page<>(1, 10);
        mockPage.setRecords(java.util.List.of(testPurchase));
        mockPage.setTotal(1);
        when(purchaseMapper.selectPage(any(Page.class), any(LambdaQueryWrapper.class))).thenReturn(mockPage);

        Page<Purchase> result = purchaseService.getPurchaseList(new Page<>(1, 10), null, null, null, null);

        assertNotNull(result);
        assertEquals(1, result.getTotal());
    }

    @Test
    @DisplayName("新增进货 - 自动计算总价")
    void createPurchase_AutoCalculateTotal() {
        when(purchaseMapper.insert(any(Purchase.class))).thenReturn(1);

        Purchase newPurchase = new Purchase();
        newPurchase.setWireId(1L);
        newPurchase.setSupplierId(1L);
        newPurchase.setQuantity(10);
        newPurchase.setUnitPrice(new BigDecimal("15.00"));

        purchaseService.createPurchase(newPurchase);

        assertEquals(new BigDecimal("150.00"), newPurchase.getTotalPrice());
        verify(purchaseMapper, times(1)).insert(any(Purchase.class));
    }

    @Test
    @DisplayName("删除进货 - 软删除")
    void deletePurchase() {
        when(purchaseMapper.update(null, any())).thenReturn(1);

        purchaseService.deletePurchase(1L);

        verify(purchaseMapper, times(1)).update(null, any());
    }
}
