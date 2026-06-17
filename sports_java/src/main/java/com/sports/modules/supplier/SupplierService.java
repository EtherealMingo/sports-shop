// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.supplier;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.supplier.Supplier;

public interface SupplierService {

    Page<Supplier> getSupplierList(Page<Supplier> page, String keyword);

    Supplier getSupplierById(Long id);

    void createSupplier(Supplier supplier);

    void updateSupplier(Supplier supplier);

    void deleteSupplier(Long id);
}
