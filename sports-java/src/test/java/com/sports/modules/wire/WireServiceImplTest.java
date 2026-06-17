// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.wire;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.wire.mapper.WireMapper;
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
class WireServiceImplTest {

    @Mock
    private WireMapper wireMapper;

    private WireServiceImpl wireService;

    private Wire testWire;

    @BeforeEach
    void setUp() {
        wireService = new WireServiceImpl(wireMapper);
        testWire = new Wire();
        testWire.setId(1L);
        testWire.setBrand("Yonex");
        testWire.setModel("BG-80");
        testWire.setSpec("0.68mm");
        testWire.setColor("白色");
        testWire.setType("badminton");
        testWire.setMinStock(5);
        testWire.setDeleted(0);
    }

    @Test
    @DisplayName("查询线材列表 - 分页")
    void getWireList_Pagination() {
        Page<Wire> mockPage = new Page<>(1, 10);
        mockPage.setRecords(java.util.List.of(testWire));
        mockPage.setTotal(1);
        when(wireMapper.selectPage(any(Page.class), any(LambdaQueryWrapper.class))).thenReturn(mockPage);

        Page<Wire> result = wireService.getWireList(new Page<>(1, 10), null, null);

        assertNotNull(result);
        assertEquals(1, result.getTotal());
    }

    @Test
    @DisplayName("查询线材列表 - 按类型筛选")
    void getWireList_ByType() {
        Page<Wire> mockPage = new Page<>(1, 10);
        mockPage.setRecords(java.util.List.of(testWire));
        mockPage.setTotal(1);
        when(wireMapper.selectPage(any(Page.class), any(LambdaQueryWrapper.class))).thenReturn(mockPage);

        Page<Wire> result = wireService.getWireList(new Page<>(1, 10), null, "badminton");

        assertNotNull(result);
        verify(wireMapper, times(1)).selectPage(any(Page.class), any(LambdaQueryWrapper.class));
    }

    @Test
    @DisplayName("查询线材详情 - 存在")
    void getWireById_Exists() {
        when(wireMapper.selectById(1L)).thenReturn(testWire);

        Wire result = wireService.getWireById(1L);

        assertNotNull(result);
        assertEquals("Yonex", result.getBrand());
        assertEquals("BG-80", result.getModel());
    }

    @Test
    @DisplayName("查询线材详情 - 不存在")
    void getWireById_NotExists() {
        when(wireMapper.selectById(999L)).thenReturn(null);

        assertNull(wireService.getWireById(999L));
    }

    @Test
    @DisplayName("新增线材")
    void createWire() {
        when(wireMapper.insert(any(Wire.class))).thenReturn(1);

        wireService.createWire(testWire);

        verify(wireMapper, times(1)).insert(any(Wire.class));
    }

    @Test
    @DisplayName("更新线材")
    void updateWire() {
        when(wireMapper.updateById(any(Wire.class))).thenReturn(1);

        testWire.setModel("BG-65");
        wireService.updateWire(testWire);

        verify(wireMapper, times(1)).updateById(testWire);
    }

    @Test
    @DisplayName("删除线材 - 软删除")
    void deleteWire() {
        when(wireMapper.update(null, any())).thenReturn(1);

        wireService.deleteWire(1L);

        verify(wireMapper, times(1)).update(null, any());
    }
}
