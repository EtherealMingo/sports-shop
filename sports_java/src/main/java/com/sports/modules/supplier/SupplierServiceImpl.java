// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.supplier;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.supplier.Supplier;
import com.sports.modules.supplier.SupplierMapper;
import com.sports.modules.supplier.SupplierService;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class SupplierServiceImpl implements SupplierService {

    private final SupplierMapper supplierMapper;

    public SupplierServiceImpl(SupplierMapper supplierMapper) {
        this.supplierMapper = supplierMapper;
    }

    @Override
    public Page<Supplier> getSupplierList(Page<Supplier> page, String keyword) {
        LambdaQueryWrapper<Supplier> wrapper = new LambdaQueryWrapper<>();
        wrapper.like(StringUtils.hasText(keyword), Supplier::getName, keyword)
               .eq(Supplier::getDeleted, 0)
               .orderByDesc(Supplier::getCreateTime);
        return supplierMapper.selectPage(page, wrapper);
    }

    @Override
    public Supplier getSupplierById(Long id) {
        return supplierMapper.selectById(id);
    }

    @Override
    public void createSupplier(Supplier supplier) {
        supplierMapper.insert(supplier);
    }

    @Override
    public void updateSupplier(Supplier supplier) {
        supplierMapper.updateById(supplier);
    }

    @Override
    public void deleteSupplier(Long id) {
        supplierMapper.update(null,
            new com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper<Supplier>()
                .set("deleted", 1).eq("id", id));
    }
}
