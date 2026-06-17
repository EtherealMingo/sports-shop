// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.purchase;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.sports.modules.purchase.Purchase;
import com.sports.modules.purchase.PurchaseService;
import org.springframework.web.bind.annotation.*;

@Tag(name = "进货管理", description = "进货记录 CRUD 接口")
@RestController
@RequestMapping("/api/purchase")
public class PurchaseController {

    private final PurchaseService purchaseService;

    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @Operation(summary = "列表")
    @GetMapping("/list")
    public Result<Page<Purchase>> list(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) Long wireId,
            @RequestParam(required = false) Long supplierId,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        Page<Purchase> page = new Page<>(current, pageSize);
        return Result.success(purchaseService.getPurchaseList(page, wireId, supplierId, startDate, endDate));
    }

    @Operation(summary = "详情")
    @GetMapping("/{id}")
    public Result<Purchase> getById(@PathVariable Long id) {
        return Result.success(purchaseService.getPurchaseById(id));
    }

    @Operation(summary = "新增")
    @PostMapping
    public Result<Purchase> create(@RequestBody Purchase purchase) {
        purchaseService.createPurchase(purchase);
        return Result.success(purchase);
    }

    @Operation(summary = "更新")
    @PutMapping("/{id}")
    public Result<Purchase> update(@PathVariable Long id, @RequestBody Purchase purchase) {
        purchase.setId(id);
        purchaseService.updatePurchase(purchase);
        return Result.success(purchase);
    }

    @Operation(summary = "删除")
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        purchaseService.deletePurchase(id);
        return Result.success();
    }
}
