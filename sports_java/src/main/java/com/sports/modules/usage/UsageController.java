// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.usage;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.sports.modules.usage.Usage;
import com.sports.modules.usage.UsageService;
import org.springframework.web.bind.annotation.*;

@Tag(name = "消耗记录", description = "消耗记录 CRUD 接口")
@RestController
@RequestMapping("/api/usage")
public class UsageController {

    private final UsageService usageService;

    public UsageController(UsageService usageService) {
        this.usageService = usageService;
    }

    @Operation(summary = "列表")
    @GetMapping("/list")
    public Result<Page<Usage>> list(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) Long wireId,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        Page<Usage> page = new Page<>(current, pageSize);
        return Result.success(usageService.getUsageList(page, wireId, startDate, endDate));
    }

    @Operation(summary = "新增")
    @PostMapping
    public Result<Usage> create(@RequestBody Usage usage) {
        usageService.createUsage(usage);
        return Result.success(usage);
    }

    @Operation(summary = "删除")
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        usageService.deleteUsage(id);
        return Result.success();
    }
}
