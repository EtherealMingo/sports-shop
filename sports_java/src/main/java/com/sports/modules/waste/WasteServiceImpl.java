// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.waste;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.inventory.InventoryService;
import com.sports.modules.waste.Waste;
import com.sports.modules.waste.WasteMapper;
import com.sports.modules.waste.WasteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

/**
 * 报废记录服务实现
 */
@Service
@RequiredArgsConstructor
public class WasteServiceImpl implements WasteService {

    private final WasteMapper wasteMapper;
    private final InventoryService inventoryService;

    @Override
    public Page<Waste> getWasteList(Page<Waste> page, Long wireId, String startDate, String endDate, String reason) {
        LambdaQueryWrapper<Waste> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(wireId != null, Waste::getWireId, wireId)
               .ge(StringUtils.hasText(startDate), Waste::getWasteDate, startDate)
               .le(StringUtils.hasText(endDate), Waste::getWasteDate, endDate)
               .eq(StringUtils.hasText(reason), Waste::getReason, reason)
               .eq(Waste::getDeleted, 0)
               .orderByDesc(Waste::getWasteDate);
        return wasteMapper.selectPage(page, wrapper);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void createWaste(Waste waste) {
        wasteMapper.insert(waste);
        // 同步扣减库存
        inventoryService.decreaseStock(waste.getWireId(), waste.getQuantity());
    }

    @Override
    public void deleteWaste(Long id) {
        wasteMapper.update(null,
            new com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper<Waste>()
                .set("deleted", 1).eq("id", id));
    }
}
