// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.wire;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 线材控制器
 */
@Tag(name = "线材管理", description = "线材字典 CRUD 接口")
@RestController
@RequestMapping("/api/wire")
@RequiredArgsConstructor
public class WireController {

    private final WireService wireService;

    @Operation(summary = "线材列表", description = "分页查询线材列表，支持品牌/型号搜索和类型筛选")
    @GetMapping("/list")
    public Result<Page<Wire>> list(
            @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer current,
            @Parameter(description = "每页条数") @RequestParam(defaultValue = "10") Integer pageSize,
            @Parameter(description = "搜索关键词") @RequestParam(required = false) String keyword,
            @Parameter(description = "类型 tennis/badminton") @RequestParam(required = false) String type) {
        Page<Wire> page = new Page<>(current, pageSize);
        return Result.success(wireService.getWireList(page, keyword, type));
    }

    @Operation(summary = "线材详情", description = "根据ID查询线材详情")
    @GetMapping("/{id}")
    public Result<Wire> getById(@Parameter(description = "线材ID") @PathVariable Long id) {
        return Result.success(wireService.getWireById(id));
    }

    @Operation(summary = "新增线材", description = "创建新线材")
    @PostMapping
    public Result<Wire> create(@RequestBody Wire wire) {
        wireService.createWire(wire);
        return Result.success(wire);
    }

    @Operation(summary = "更新线材", description = "更新线材信息")
    @PutMapping("/{id}")
    public Result<Wire> update(@Parameter(description = "线材ID") @PathVariable Long id, @RequestBody Wire wire) {
        wire.setId(id);
        wireService.updateWire(wire);
        return Result.success(wire);
    }

    @Operation(summary = "删除线材", description = "软删除线材")
    @DeleteMapping("/{id}")
    public Result<Void> delete(@Parameter(description = "线材ID") @PathVariable Long id) {
        wireService.deleteWire(id);
        return Result.success();
    }
}
