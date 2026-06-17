// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.appointment;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.appointment.Appointment;

import java.time.LocalDate;

public interface AppointmentService {
    Page<Appointment> getAppointmentList(Page<Appointment> page, LocalDate date, String status);
    Appointment getAppointmentById(Long id);
    void createAppointment(Appointment appointment);
    void confirmAppointment(Long id);
    void cancelAppointment(Long id, String reason);
    void completeAppointment(Long id, Long wireId, java.math.BigDecimal cost);
}
