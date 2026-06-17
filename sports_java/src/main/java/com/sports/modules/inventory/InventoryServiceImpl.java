// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.inventory;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.inventory.mapper.InventoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 库存服务实现
 */
@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final InventoryMapper inventoryMapper;

    @Override
    public Page<Inventory> getInventoryList(Page<Inventory> page, String keyword, String type) {
        LambdaQueryWrapper<Inventory> wrapper = new LambdaQueryWrapper<Inventory>()
            .eq(Inventory::getDeleted, 0);
        if (keyword != null) {
            wrapper.and(w -> w
                .like(Inventory::getWireName, keyword)
                .or()
                .like(Inventory::getWireBrand, keyword)
            );
        }
        if (type != null) {
            wrapper.eq(Inventory::getType, type);
        }
        wrapper.orderByDesc(Inventory::getCreateTime);
        return inventoryMapper.selectPage(page, wrapper);
    }

    @Override
    public List<Inventory> getLowStockItems() {
        return inventoryMapper.selectList(
            new LambdaQueryWrapper<Inventory>()
                .eq(Inventory::getDeleted, 0)
                .le(Inventory::getCurrentStock, Inventory::getMinStock)
        );
    }

    @Override
    public Inventory getInventoryByWireId(Long wireId) {
        return inventoryMapper.selectOne(
            new LambdaQueryWrapper<Inventory>()
                .eq(Inventory::getWireId, wireId)
                .eq(Inventory::getDeleted, 0)
        );
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void increaseStock(Long wireId, Integer quantity, String wireName, String wireBrand, String wireModel) {
        Inventory inventory = getInventoryByWireId(wireId);
        if (inventory == null) {
            // 新建库存记录
            inventory = new Inventory();
            inventory.setWireId(wireId);
            inventory.setWireName(wireName);
            inventory.setWireBrand(wireBrand);
            inventory.setWireModel(wireModel);
            inventory.setTotalPurchased(quantity);
            inventory.setTotalUsed(0);
            inventory.setTotalWasted(0);
            inventory.setCurrentStock(quantity);
            inventory.setAvgCost(BigDecimal.ZERO);
            inventory.setMinStock(5);
            inventory.setStatus(1);
            inventory.setDeleted(0);
            inventory.setCreateTime(LocalDateTime.now());
            inventory.setUpdateTime(LocalDateTime.now());
            inventoryMapper.insert(inventory);
        } else {
            // 更新库存
            inventory.setTotalPurchased(inventory.getTotalPurchased() + quantity);
            inventory.setCurrentStock(inventory.getCurrentStock() + quantity);
            inventory.setUpdateTime(LocalDateTime.now());
            inventoryMapper.updateById(inventory);
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean decreaseStock(Long wireId, Integer quantity) {
        Inventory inventory = getInventoryByWireId(wireId);
        if (inventory == null || inventory.getCurrentStock() < quantity) {
            return false;
        }
        inventory.setTotalUsed(inventory.getTotalUsed() + quantity);
        inventory.setCurrentStock(inventory.getCurrentStock() - quantity);
        inventory.setUpdateTime(LocalDateTime.now());
        inventoryMapper.updateById(inventory);
        return true;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void syncStock(Long wireId) {
        // TODO: 从进货/消耗/报废记录重新计算库存
        Inventory inventory = getInventoryByWireId(wireId);
        if (inventory == null) return;
        // 这里应该查询相关表重新计算
        inventory.setUpdateTime(LocalDateTime.now());
        inventoryMapper.updateById(inventory);
    }
}
