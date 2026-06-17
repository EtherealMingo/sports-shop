// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.appointment;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@Tag(name = "预约管理", description = "预约 CRUD、确认、取消、完成接口")
@RestController
@RequestMapping("/api/appointment")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Operation(summary = "列表")
    @GetMapping("/list")
    public Result<Page<Appointment>> list(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String status) {
        Page<Appointment> page = new Page<>(current, pageSize);
        LocalDate d = date != null ? LocalDate.parse(date) : null;
        return Result.success(appointmentService.getAppointmentList(page, d, status));
    }

    @Operation(summary = "详情")
    @GetMapping("/{id}")
    public Result<Appointment> getById(@PathVariable Long id) {
        return Result.success(appointmentService.getAppointmentById(id));
    }

    @Operation(summary = "新增")
    @PostMapping
    public Result<Appointment> create(@RequestBody Appointment appointment) {
        appointmentService.createAppointment(appointment);
        return Result.success(appointment);
    }

    @Operation(summary = "确认")
    @PutMapping("/{id}/confirm")
    public Result<Void> confirm(@PathVariable Long id) {
        appointmentService.confirmAppointment(id);
        return Result.success();
    }

    @Operation(summary = "取消")
    @PutMapping("/{id}/cancel")
    public Result<Void> cancel(@PathVariable Long id, @RequestParam String reason) {
        appointmentService.cancelAppointment(id, reason);
        return Result.success();
    }
}
