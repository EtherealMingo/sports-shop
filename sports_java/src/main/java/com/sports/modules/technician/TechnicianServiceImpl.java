// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.technician;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.technician.mapper.TechnicianMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TechnicianServiceImpl implements TechnicianService {

    private final TechnicianMapper technicianMapper;

    @Override
    public Page<Technician> getTechnicianList(Page<Technician> page, String keyword) {
        LambdaQueryWrapper<Technician> wrapper = new LambdaQueryWrapper<Technician>()
            .eq(Technician::getDeleted, 0);
        if (keyword != null) {
            wrapper.like(Technician::getName, keyword);
        }
        wrapper.orderByDesc(Technician::getCreateTime);
        return technicianMapper.selectPage(page, wrapper);
    }

    @Override
    public Technician getTechnicianById(Long id) {
        return technicianMapper.selectById(id);
    }

    @Override
    public void createTechnician(Technician technician) {
        technician.setDeleted(0);
        technician.setStatus(1);
        technician.setCreateTime(LocalDateTime.now());
        technician.setUpdateTime(LocalDateTime.now());
        technicianMapper.insert(technician);
    }

    @Override
    public void updateTechnician(Technician technician) {
        technician.setUpdateTime(LocalDateTime.now());
        technicianMapper.updateById(technician);
    }

    @Override
    public void deleteTechnician(Long id) {
        technicianMapper.update(null,
            new com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper<Technician>()
                .set("deleted", 1).eq("id", id));
    }
}
