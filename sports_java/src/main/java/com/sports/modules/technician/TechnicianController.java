// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.technician;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "技师管理", description = "技师 CRUD 接口")
@RestController
@RequestMapping("/api/technician")
@RequiredArgsConstructor
public class TechnicianController {

    private final TechnicianService technicianService;

    @Operation(summary = "列表")
    @GetMapping("/list")
    public Result<Page<Technician>> list(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String keyword) {
        Page<Technician> page = new Page<>(current, pageSize);
        return Result.success(technicianService.getTechnicianList(page, keyword));
    }

    @Operation(summary = "详情")
    @GetMapping("/{id}")
    public Result<Technician> getById(@PathVariable Long id) {
        return Result.success(technicianService.getTechnicianById(id));
    }

    @Operation(summary = "新增")
    @PostMapping
    public Result<Technician> create(@RequestBody Technician technician) {
        technicianService.createTechnician(technician);
        return Result.success(technician);
    }

    @Operation(summary = "更新")
    @PutMapping("/{id}")
    public Result<Technician> update(@PathVariable Long id, @RequestBody Technician technician) {
        technician.setId(id);
        technicianService.updateTechnician(technician);
        return Result.success(technician);
    }

    @Operation(summary = "删除")
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        technicianService.deleteTechnician(id);
        return Result.success();
    }
}
