// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.waste;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.sports.modules.waste.Waste;
import com.sports.modules.waste.WasteService;
import org.springframework.web.bind.annotation.*;

@Tag(name = "报废记录", description = "报废记录 CRUD 接口")
@RestController
@RequestMapping("/api/waste")
public class WasteController {

    private final WasteService wasteService;

    public WasteController(WasteService wasteService) {
        this.wasteService = wasteService;
    }

    @Operation(summary = "列表")
    @GetMapping("/list")
    public Result<Page<Waste>> list(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) Long wireId,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) String reason) {
        Page<Waste> page = new Page<>(current, pageSize);
        return Result.success(wasteService.getWasteList(page, wireId, startDate, endDate, reason));
    }

    @Operation(summary = "新增")
    @PostMapping
    public Result<Waste> create(@RequestBody Waste waste) {
        wasteService.createWaste(waste);
        return Result.success(waste);
    }

    @Operation(summary = "删除")
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        wasteService.deleteWaste(id);
        return Result.success();
    }
}
