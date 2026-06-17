// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.log;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.log.mapper.OperationLogMapper;
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
class OperationLogServiceImplTest {

    @Mock
    private OperationLogMapper logMapper;

    private OperationLogServiceImpl logService;

    private OperationLog testLog;

    @BeforeEach
    void setUp() {
        logService = new OperationLogServiceImpl(logMapper);
        testLog = new OperationLog();
        testLog.setId(1L);
        testLog.setOperatorId(1L);
        testLog.setOperatorName("管理员");
        testLog.setModule("member");
        testLog.setAction("update");
        testLog.setDescription("更新会员信息");
        testLog.setDeleted(0);
    }

    @Test
    @DisplayName("查询操作日志列表")
    void getLogList() {
        Page<OperationLog> mockPage = new Page<>(1, 10);
        mockPage.setRecords(java.util.List.of(testLog));
        mockPage.setTotal(1);
        when(logMapper.selectPage(any(Page.class), any(LambdaQueryWrapper.class))).thenReturn(mockPage);

        Page<OperationLog> result = logService.getLogList(new Page<>(1, 10), null, null);

        assertNotNull(result);
        assertEquals(1, result.getTotal());
    }

    @Test
    @DisplayName("记录操作日志")
    void recordLog() {
        when(logMapper.insert(any(OperationLog.class))).thenReturn(1);

        logService.recordLog(testLog);

        assertEquals(0, testLog.getDeleted());
        assertNotNull(testLog.getCreateTime());
        verify(logMapper, times(1)).insert(any(OperationLog.class));
    }
}
