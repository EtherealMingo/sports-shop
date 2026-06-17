// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.wire;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.wire.Wire;
import com.sports.modules.wire.WireMapper;
import com.sports.modules.wire.WireService;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class WireServiceImpl implements WireService {

    private final WireMapper wireMapper;

    public WireServiceImpl(WireMapper wireMapper) {
        this.wireMapper = wireMapper;
    }

    @Override
    public Page<Wire> getWireList(Page<Wire> page, String keyword, String type) {
        LambdaQueryWrapper<Wire> wrapper = new LambdaQueryWrapper<>();
        wrapper.like(StringUtils.hasText(keyword), Wire::getBrand, keyword)
               .or()
               .like(StringUtils.hasText(keyword), Wire::getModel, keyword)
               .eq(StringUtils.hasText(type), Wire::getType, type)
               .eq(Wire::getDeleted, 0)
               .orderByDesc(Wire::getCreateTime);
        return wireMapper.selectPage(page, wrapper);
    }

    @Override
    public Wire getWireById(Long id) {
        return wireMapper.selectById(id);
    }

    @Override
    public void createWire(Wire wire) {
        wireMapper.insert(wire);
    }

    @Override
    public void updateWire(Wire wire) {
        wireMapper.updateById(wire);
    }

    @Override
    public void deleteWire(Long id) {
        wireMapper.update(null,
            new com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper<Wire>()
                .set("deleted", 1).eq("id", id));
    }
}
