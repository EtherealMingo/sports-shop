// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.log;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.log.mapper.OperationLogMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OperationLogServiceImpl implements OperationLogService {

    private final OperationLogMapper logMapper;

    @Override
    public Page<OperationLog> getLogList(Page<OperationLog> page, String module, String action) {
        LambdaQueryWrapper<OperationLog> wrapper = new LambdaQueryWrapper<OperationLog>()
            .eq(OperationLog::getDeleted, 0);
        if (module != null) wrapper.eq(OperationLog::getModule, module);
        if (action != null) wrapper.eq(OperationLog::getAction, action);
        wrapper.orderByDesc(OperationLog::getCreateTime);
        return logMapper.selectPage(page, wrapper);
    }

    @Override
    public void recordLog(OperationLog log) {
        log.setDeleted(0);
        log.setCreateTime(LocalDateTime.now());
        logMapper.insert(log);
    }
}
