// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.appointment;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.common.exception.BusinessException;
import com.sports.modules.appointment.mapper.AppointmentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 预约服务实现
 */
@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentMapper appointmentMapper;

    @Override
    public Page<Appointment> getAppointmentList(Page<Appointment> page, LocalDate date, String status) {
        LambdaQueryWrapper<Appointment> wrapper = new LambdaQueryWrapper<Appointment>()
            .eq(Appointment::getDeleted, 0);
        if (date != null) wrapper.eq(Appointment::getAppointmentDate, date);
        if (status != null) wrapper.eq(Appointment::getStatus, status);
        wrapper.orderByDesc(Appointment::getCreateTime);
        return appointmentMapper.selectPage(page, wrapper);
    }

    @Override
    public Appointment getAppointmentById(Long id) {
        return appointmentMapper.selectById(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void createAppointment(Appointment appointment) {
        // 预约冲突检测：同一技师同一时段只能有一个有效预约
        if (appointment.getTechnicianId() != null) {
            int conflictCount = appointmentMapper.selectCount(
                new LambdaQueryWrapper<Appointment>()
                    .eq(Appointment::getTechnicianId, appointment.getTechnicianId())
                    .eq(Appointment::getAppointmentDate, appointment.getAppointmentDate())
                    .eq(Appointment::getTimeSlot, appointment.getTimeSlot())
                    .eq(Appointment::getDeleted, 0)
                    .ne(Appointment::getStatus, "cancelled")
                    .ne(Appointment::getId, appointment.getId())  // 排除自身（更新场景）
            );
            if (conflictCount > 0) {
                throw new BusinessException(1003, "该技师在此时段已有预约");
            }
        }
        appointment.setStatus("pending");
        appointment.setDeleted(0);
        appointment.setCreateTime(LocalDateTime.now());
        appointment.setUpdateTime(LocalDateTime.now());
        appointmentMapper.insert(appointment);
    }

    @Override
    public void confirmAppointment(Long id) {
        Appointment appointment = getAppointmentById(id);
        if (appointment == null) throw new BusinessException("预约不存在");
        if (!"pending".equals(appointment.getStatus())) {
            throw new BusinessException("预约状态异常，无法确认");
        }
        appointment.setStatus("confirmed");
        appointment.setUpdateTime(LocalDateTime.now());
        appointmentMapper.updateById(appointment);
    }

    @Override
    public void cancelAppointment(Long id, String reason) {
        Appointment appointment = getAppointmentById(id);
        if (appointment == null) throw new BusinessException("预约不存在");
        if ("completed".equals(appointment.getStatus())) {
            throw new BusinessException("已完成的预约无法取消");
        }
        appointment.setStatus("cancelled");
        appointment.setCancelReason(reason);
        appointment.setUpdateTime(LocalDateTime.now());
        appointmentMapper.updateById(appointment);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void completeAppointment(Long id, Long wireId, java.math.BigDecimal cost) {
        Appointment appointment = getAppointmentById(id);
        if (appointment == null) throw new BusinessException("预约不存在");
        if (!"confirmed".equals(appointment.getStatus()) && !"in_progress".equals(appointment.getStatus())) {
            throw new BusinessException("预约状态异常，无法完成");
        }
        appointment.setStatus("completed");
        appointment.setWireId(wireId);
        appointment.setCost(cost);
        appointment.setActualEnd(LocalDateTime.now());
        appointment.setUpdateTime(LocalDateTime.now());
        appointmentMapper.updateById(appointment);
    }
}
