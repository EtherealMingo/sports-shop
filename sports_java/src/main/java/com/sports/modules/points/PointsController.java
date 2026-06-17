// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.points;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 积分控制器
 */
@Tag(name = "积分管理", description = "积分记录、补赠、扣除、核销接口")
@RestController
@RequestMapping("/api/points")
@RequiredArgsConstructor
public class PointsController {

    private final PointsService pointsService;

    @Operation(summary = "积分记录列表", description = "分页查询积分记录，支持按会员和类型筛选")
    @GetMapping("/records")
    public Result<Page<PointsRecord>> list(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String memberId,
            @RequestParam(required = false) String type) {
        Page<PointsRecord> page = new Page<>(current, pageSize);
        return Result.success(pointsService.getPointsList(page, memberId, type));
    }

    @Operation(summary = "会员积分余额", description = "查询会员当前积分余额")
    @GetMapping("/balance/{memberId}")
    public Result<Integer> getBalance(@PathVariable String memberId) {
        return Result.success(pointsService.getPointsBalance(memberId));
    }

    @Operation(summary = "补赠积分", description = "给会员补赠积分")
    @PostMapping("/add")
    public Result<Void> addPoints(
            @RequestParam String memberId,
            @RequestParam Integer points,
            @RequestParam String reason,
            @RequestParam(required = false) Long operatorId,
            @RequestParam(required = false) String operatorName) {
        pointsService.addPoints(memberId, points, reason, operatorId, operatorName);
        return Result.success();
    }

    @Operation(summary = "扣除积分", description = "扣除会员积分")
    @PostMapping("/deduct")
    public Result<Void> deductPoints(
            @RequestParam String memberId,
            @RequestParam Integer points,
            @RequestParam String reason,
            @RequestParam(required = false) Long operatorId,
            @RequestParam(required = false) String operatorName) {
        pointsService.deductPoints(memberId, points, reason, operatorId, operatorName);
        return Result.success();
    }

    @Operation(summary = "积分核销", description = "使用积分核销消费")
    @PostMapping("/redeem")
    public Result<Void> redeemPoints(
            @RequestParam String memberId,
            @RequestParam Integer points,
            @RequestParam(required = false) String orderId,
            @RequestParam(required = false) Long operatorId,
            @RequestParam(required = false) String operatorName) {
        pointsService.redeemPoints(memberId, points, orderId, operatorId, operatorName);
        return Result.success();
    }
}
