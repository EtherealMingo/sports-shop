// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.purchase;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.purchase.Purchase;

public interface PurchaseService {

    Page<Purchase> getPurchaseList(Page<Purchase> page, Long wireId, Long supplierId, String startDate, String endDate);

    Purchase getPurchaseById(Long id);

    void createPurchase(Purchase purchase);

    void updatePurchase(Purchase purchase);

    void deletePurchase(Long id);
}
