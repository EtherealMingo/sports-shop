// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.exchange;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 兑换控制器
 */
@Tag(name = "兑换管理", description = "兑换商品、兑换记录、核销接口")
@RestController
@RequestMapping("/api/exchange")
@RequiredArgsConstructor
public class ExchangeController {

    private final ExchangeService exchangeService;

    @Operation(summary = "兑换商品列表", description = "分页查询可兑换商品")
    @GetMapping("/items")
    public Result<Page<ExchangeItem>> listItems(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String type) {
        Page<ExchangeItem> page = new Page<>(current, pageSize);
        return Result.success(exchangeService.getItemList(page, type));
    }

    @Operation(summary = "兑换商品详情", description = "查询兑换商品详情")
    @GetMapping("/items/{id}")
    public Result<ExchangeItem> getItem(@PathVariable Long id) {
        return Result.success(exchangeService.getItemById(id));
    }

    @Operation(summary = "添加兑换商品", description = "创建新的兑换商品")
    @PostMapping("/items")
    public Result<ExchangeItem> createItem(@RequestBody ExchangeItem item) {
        exchangeService.createItem(item);
        return Result.success(item);
    }

    /**
     * 更新兑换商品
     */
    @Operation(summary = "更新商品")
    @PutMapping("/items/{id}")
    public Result<ExchangeItem> updateItem(@PathVariable Long id, @RequestBody ExchangeItem item) {
        item.setId(id);
        exchangeService.updateItem(item);
        return Result.success(item);
    }

    /**
     * 删除兑换商品
     */
    @Operation(summary = "删除商品")
    @DeleteMapping("/items/{id}")
    public Result<Void> deleteItem(@PathVariable Long id) {
        exchangeService.deleteItem(id);
        return Result.success();
    }

    @Operation(summary = "积分兑换", description = "使用积分兑换商品")
    @PostMapping("/redeem")
    public Result<ExchangeRecord> redeem(
            @RequestParam String memberId,
            @RequestParam Long itemId,
            @RequestParam(required = false) Long operatorId,
            @RequestParam(required = false) String operatorName) {
        return Result.success(exchangeService.redeemItem(memberId, itemId, operatorId, operatorName));
    }

    @Operation(summary = "兑换记录列表", description = "分页查询兑换记录")
    @GetMapping("/records")
    public Result<Page<ExchangeRecord>> listRecords(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String status) {
        Page<ExchangeRecord> page = new Page<>(current, pageSize);
        return Result.success(exchangeService.getRecordList(page, status));
    }

    @Operation(summary = "核销兑换记录", description = "核销待核销的兑换记录")
    @PutMapping("/records/{id}/redeem")
    public Result<Void> redeemRecord(
            @PathVariable Long id,
            @RequestParam(required = false) Long operatorId,
            @RequestParam(required = false) String operatorName) {
        exchangeService.redeemRecord(id, operatorId, operatorName);
        return Result.success();
    }
}
