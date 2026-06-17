// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "服务管理", description = "服务进度、历史、推荐接口")
@RestController
@RequestMapping("/api/service")
@RequiredArgsConstructor
public class ServiceController {

    private final ServiceService serviceService;

    @Operation(summary = "listProgress")
    @GetMapping("/progress")
    public Result<Page<ServiceProgress>> listProgress(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String status) {
        Page<ServiceProgress> page = new Page<>(current, pageSize);
        return Result.success(serviceService.getProgressList(page, status));
    }

    @Operation(summary = "listHistory")
    @GetMapping("/history")
    public Result<Page<ServiceHistory>> listHistory(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String memberId) {
        Page<ServiceHistory> page = new Page<>(current, pageSize);
        return Result.success(serviceService.getHistoryList(page, memberId));
    }

    @Operation(summary = "updateStatus")
    @PutMapping("/progress/{id}/status")
    public Result<Void> updateStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestParam(required = false) String note) {
        serviceService.updateProgressStatus(id, status, note);
        return Result.success();
    }

    @Operation(summary = "推荐")
    @GetMapping("/recommendations/{memberId}")
    public Result<Page<Recommendation>> getRecommendations(@PathVariable Long memberId) {
        return Result.success(serviceService.getRecommendations(memberId));
    }
}
