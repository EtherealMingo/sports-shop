// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.supplier;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.sports.modules.supplier.Supplier;
import com.sports.modules.supplier.SupplierService;
import org.springframework.web.bind.annotation.*;

@Tag(name = "供应商管理", description = "供应商 CRUD 接口")
@RestController
@RequestMapping("/api/supplier")
public class SupplierController {

    private final SupplierService supplierService;

    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @Operation(summary = "列表")
    @GetMapping("/list")
    public Result<Page<Supplier>> list(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String keyword) {
        Page<Supplier> page = new Page<>(current, pageSize);
        return Result.success(supplierService.getSupplierList(page, keyword));
    }

    @Operation(summary = "详情")
    @GetMapping("/{id}")
    public Result<Supplier> getById(@PathVariable Long id) {
        return Result.success(supplierService.getSupplierById(id));
    }

    @Operation(summary = "新增")
    @PostMapping
    public Result<Supplier> create(@RequestBody Supplier supplier) {
        supplierService.createSupplier(supplier);
        return Result.success(supplier);
    }

    @Operation(summary = "更新")
    @PutMapping("/{id}")
    public Result<Supplier> update(@PathVariable Long id, @RequestBody Supplier supplier) {
        supplier.setId(id);
        supplierService.updateSupplier(supplier);
        return Result.success(supplier);
    }

    @Operation(summary = "删除")
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        supplierService.deleteSupplier(id);
        return Result.success();
    }
}
