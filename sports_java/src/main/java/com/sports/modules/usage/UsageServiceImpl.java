// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.usage;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.inventory.InventoryService;
import com.sports.modules.usage.Usage;
import com.sports.modules.usage.UsageMapper;
import com.sports.modules.usage.UsageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

/**
 * 消耗记录服务实现
 */
@Service
@RequiredArgsConstructor
public class UsageServiceImpl implements UsageService {

    private final UsageMapper usageMapper;
    private final InventoryService inventoryService;

    @Override
    public Page<Usage> getUsageList(Page<Usage> page, Long wireId, String startDate, String endDate) {
        LambdaQueryWrapper<Usage> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(wireId != null, Usage::getWireId, wireId)
               .ge(StringUtils.hasText(startDate), Usage::getUsageDate, startDate)
               .le(StringUtils.hasText(endDate), Usage::getUsageDate, endDate)
               .eq(Usage::getDeleted, 0)
               .orderByDesc(Usage::getUsageDate);
        return usageMapper.selectPage(page, wrapper);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void createUsage(Usage usage) {
        usageMapper.insert(usage);
        // 同步扣减库存
        inventoryService.decreaseStock(usage.getWireId(), usage.getQuantity());
    }

    @Override
    public void deleteUsage(Long id) {
        usageMapper.update(null,
            new com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper<Usage>()
                .set("deleted", 1).eq("id", id));
    }
}
