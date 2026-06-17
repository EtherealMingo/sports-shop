// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.supplier;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.supplier.mapper.SupplierMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SupplierServiceImplTest {

    @Mock
    private SupplierMapper supplierMapper;

    private SupplierServiceImpl supplierService;

    private Supplier testSupplier;

    @BeforeEach
    void setUp() {
        supplierService = new SupplierServiceImpl(supplierMapper);
        testSupplier = new Supplier();
        testSupplier.setId(1L);
        testSupplier.setName("上海羽毛球用品批发");
        testSupplier.setContact("张经理");
        testSupplier.setPhone("138-0000-1111");
        testSupplier.setPaymentMethod("transfer");
        testSupplier.setRating(4.50);
        testSupplier.setDeleted(0);
    }

    @Test
    @DisplayName("查询供应商列表")
    void getSupplierList() {
        Page<Supplier> mockPage = new Page<>(1, 10);
        mockPage.setRecords(java.util.List.of(testSupplier));
        mockPage.setTotal(1);
        when(supplierMapper.selectPage(any(Page.class), any(LambdaQueryWrapper.class))).thenReturn(mockPage);

        Page<Supplier> result = supplierService.getSupplierList(new Page<>(1, 10), null);

        assertNotNull(result);
        assertEquals(1, result.getTotal());
    }

    @Test
    @DisplayName("新增供应商")
    void createSupplier() {
        when(supplierMapper.insert(any(Supplier.class))).thenReturn(1);

        supplierService.createSupplier(testSupplier);

        verify(supplierMapper, times(1)).insert(any(Supplier.class));
    }

    @Test
    @DisplayName("更新供应商")
    void updateSupplier() {
        when(supplierMapper.updateById(any(Supplier.class))).thenReturn(1);

        testSupplier.setContact("李经理");
        supplierService.updateSupplier(testSupplier);

        verify(supplierMapper, times(1)).updateById(testSupplier);
    }
}
