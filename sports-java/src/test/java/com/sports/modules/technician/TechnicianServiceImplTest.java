// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.technician;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.technician.mapper.TechnicianMapper;
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
class TechnicianServiceImplTest {

    @Mock
    private TechnicianMapper technicianMapper;

    private TechnicianServiceImpl technicianService;

    private Technician testTechnician;

    @BeforeEach
    void setUp() {
        technicianService = new TechnicianServiceImpl(technicianMapper);
        testTechnician = new Technician();
        testTechnician.setId(1L);
        testTechnician.setName("张师傅");
        testTechnician.setPhone("138-0000-5555");
        testTechnician.setSkillType("羽毛球,网球");
        testTechnician.setStatus(1);
        testTechnician.setDeleted(0);
    }

    @Test
    @DisplayName("查询技师列表")
    void getTechnicianList() {
        Page<Technician> mockPage = new Page<>(1, 10);
        mockPage.setRecords(java.util.List.of(testTechnician));
        mockPage.setTotal(1);
        when(technicianMapper.selectPage(any(Page.class), any(LambdaQueryWrapper.class))).thenReturn(mockPage);

        Page<Technician> result = technicianService.getTechnicianList(new Page<>(1, 10), null);

        assertNotNull(result);
        assertEquals(1, result.getTotal());
    }

    @Test
    @DisplayName("新增技师")
    void createTechnician() {
        when(technicianMapper.insert(any(Technician.class))).thenReturn(1);

        technicianService.createTechnician(testTechnician);

        assertEquals(0, testTechnician.getDeleted());
        assertEquals(1, testTechnician.getStatus());
        verify(technicianMapper, times(1)).insert(any(Technician.class));
    }

    @Test
    @DisplayName("删除技师 - 软删除")
    void deleteTechnician() {
        when(technicianMapper.update(null, any())).thenReturn(1);

        technicianService.deleteTechnician(1L);

        verify(technicianMapper, times(1)).update(null, any());
    }
}
