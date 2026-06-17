// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.inventory;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.inventory.mapper.InventoryMapper;
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
class InventoryServiceImplTest {

    @Mock
    private InventoryMapper inventoryMapper;

    private InventoryServiceImpl inventoryService;

    private Inventory testInventory;

    @BeforeEach
    void setUp() {
        inventoryService = new InventoryServiceImpl(inventoryMapper);
        testInventory = new Inventory();
        testInventory.setId(1L);
        testInventory.setWireId(1L);
        testInventory.setWireName("Yonex BG-80");
        testInventory.setCurrentStock(28);
        testInventory.setMinStock(5);
        testInventory.setDeleted(0);
    }

    @Test
    @DisplayName("查询库存列表")
    void getInventoryList() {
        Page<Inventory> mockPage = new Page<>(1, 10);
        when(inventoryMapper.selectPage(any(Page.class), any(LambdaQueryWrapper.class))).thenReturn(mockPage);

        assertNotNull(inventoryService.getInventoryList(new Page<>(1, 10), null, null));
    }

    @Test
    @DisplayName("获取低库存商品")
    void getLowStockItems() {
        Inventory lowStock = new Inventory();
        lowStock.setCurrentStock(2);
        lowStock.setMinStock(3);
        when(inventoryMapper.selectList(any(LambdaQueryWrapper.class)))
            .thenReturn(java.util.List.of(lowStock));

        java.util.List<Inventory> result = inventoryService.getLowStockItems();

        assertEquals(1, result.size());
    }

    @Test
    @DisplayName("增加库存 - 新建")
    void increaseStock_New() {
        when(inventoryMapper.selectOne(any(LambdaQueryWrapper.class))).thenReturn(null);
        when(inventoryMapper.insert(any(Inventory.class))).thenReturn(1);

        inventoryService.increaseStock(1L, 20, "Yonex BG-80", "Yonex", "BG-80");

        verify(inventoryMapper, times(1)).insert(any(Inventory.class));
    }

    @Test
    @DisplayName("增加库存 - 更新")
    void increaseStock_Update() {
        when(inventoryMapper.selectOne(any(LambdaQueryWrapper.class))).thenReturn(testInventory);
        when(inventoryMapper.updateById(any(Inventory.class))).thenReturn(1);

        inventoryService.increaseStock(1L, 10, "Yonex BG-80", "Yonex", "BG-80");

        assertEquals(38, testInventory.getCurrentStock());
    }

    @Test
    @DisplayName("减少库存 - 成功")
    void decreaseStock_Success() {
        when(inventoryMapper.selectOne(any(LambdaQueryWrapper.class))).thenReturn(testInventory);
        when(inventoryMapper.updateById(any(Inventory.class))).thenReturn(1);

        boolean result = inventoryService.decreaseStock(1L, 5);

        assertTrue(result);
        assertEquals(23, testInventory.getCurrentStock());
    }

    @Test
    @DisplayName("减少库存 - 库存不足")
    void decreaseStock_Insufficient() {
        testInventory.setCurrentStock(2);
        when(inventoryMapper.selectOne(any(LambdaQueryWrapper.class))).thenReturn(testInventory);

        boolean result = inventoryService.decreaseStock(1L, 5);

        assertFalse(result);
    }
}
