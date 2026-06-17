// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.inventory;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "库存查询", description = "库存查询、低库存预警接口")
@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @Operation(summary = "列表")
    @GetMapping("/list")
    public Result<Page<Inventory>> list(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String keyword) {
        Page<Inventory> page = new Page<>(current, pageSize);
        return Result.success(inventoryService.getInventoryList(page, keyword, null));
    }

    @Operation(summary = "低库存")
    @GetMapping("/low-stock")
    public Result<List<Inventory>> getLowStock() {
        return Result.success(inventoryService.getLowStockItems());
    }
}
