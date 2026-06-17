// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.inventory;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import java.util.List;

public interface InventoryService {
    Page<Inventory> getInventoryList(Page<Inventory> page, String keyword, String type);
    List<Inventory> getLowStockItems();
    Inventory getInventoryByWireId(Long wireId);

    /**
     * 增加库存（进货后调用）
     */
    void increaseStock(Long wireId, Integer quantity, String wireName, String brand, String model);

    /**
     * 减少库存（消耗/报废后调用）
     * @return 是否成功，false表示库存不足
     */
    boolean decreaseStock(Long wireId, Integer quantity);

    /**
     * 同步库存（重新计算）
     */
    void syncStock(Long wireId);
}
