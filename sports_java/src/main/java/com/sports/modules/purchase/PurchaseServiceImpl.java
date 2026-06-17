// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.purchase;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.inventory.InventoryService;
import com.sports.modules.purchase.Purchase;
import com.sports.modules.purchase.PurchaseMapper;
import com.sports.modules.purchase.PurchaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;

/**
 * 进货服务实现
 */
@Service
@RequiredArgsConstructor
public class PurchaseServiceImpl implements PurchaseService {

    private final PurchaseMapper purchaseMapper;
    private final InventoryService inventoryService;

    @Override
    public Page<Purchase> getPurchaseList(Page<Purchase> page, Long wireId, Long supplierId, String startDate, String endDate) {
        LambdaQueryWrapper<Purchase> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(wireId != null, Purchase::getWireId, wireId)
               .eq(supplierId != null, Purchase::getSupplierId, supplierId)
               .ge(StringUtils.hasText(startDate), Purchase::getPurchaseDate, startDate)
               .le(StringUtils.hasText(endDate), Purchase::getPurchaseDate, endDate)
               .eq(Purchase::getDeleted, 0)
               .orderByDesc(Purchase::getPurchaseDate);
        return purchaseMapper.selectPage(page, wrapper);
    }

    @Override
    public Purchase getPurchaseById(Long id) {
        return purchaseMapper.selectById(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void createPurchase(Purchase purchase) {
        // 自动计算总价
        if (purchase.getUnitPrice() != null && purchase.getQuantity() != null) {
            purchase.setTotalPrice(purchase.getUnitPrice().multiply(BigDecimal.valueOf(purchase.getQuantity())));
        }
        purchaseMapper.insert(purchase);
        // 同步更新库存
        inventoryService.increaseStock(
            purchase.getWireId(),
            purchase.getQuantity(),
            purchase.getWireName(),
            purchase.getWireBrand(),
            purchase.getWireModel()
        );
    }

    @Override
    public void updatePurchase(Purchase purchase) {
        if (purchase.getUnitPrice() != null && purchase.getQuantity() != null) {
            purchase.setTotalPrice(purchase.getUnitPrice().multiply(BigDecimal.valueOf(purchase.getQuantity())));
        }
        purchaseMapper.updateById(purchase);
    }

    @Override
    public void deletePurchase(Long id) {
        purchaseMapper.update(null,
            new com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper<Purchase>()
                .set("deleted", 1).eq("id", id));
    }
}
