// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.member;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 会员控制器
 */
@Tag(name = "会员管理", description = "会员 CRUD、积分调整接口")
@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @Operation(summary = "会员列表", description = "分页查询会员列表，支持关键词搜索")
    @GetMapping("/list")
    public Result<Page<Member>> list(
            @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer current,
            @Parameter(description = "每页条数") @RequestParam(defaultValue = "10") Integer pageSize,
            @Parameter(description = "搜索关键词") @RequestParam(required = false) String keyword) {
        Page<Member> page = new Page<>(current, pageSize);
        return Result.success(memberService.getMemberList(page, keyword));
    }

    @Operation(summary = "会员详情", description = "根据ID查询会员详情")
    @GetMapping("/{id}")
    public Result<Member> getById(@Parameter(description = "会员ID") @PathVariable Long id) {
        Member member = memberService.getMemberById(String.valueOf(id));
        if (member == null) {
            return Result.error("会员不存在");
        }
        return Result.success(member);
    }

    @Operation(summary = "新增会员", description = "创建新会员，自动生成会员编号")
    @PostMapping
    public Result<Member> create(@RequestBody Member member) {
        memberService.createMember(member);
        return Result.success(member);
    }

    @Operation(summary = "更新会员", description = "更新会员基本信息")
    @PutMapping("/{id}")
    public Result<Member> update(@Parameter(description = "会员ID") @PathVariable Long id, @RequestBody Member member) {
        member.setId(id);
        memberService.updateMember(member);
        return Result.success(member);
    }

    @Operation(summary = "删除会员", description = "软删除会员")
    @DeleteMapping("/{id}")
    public Result<Void> delete(@Parameter(description = "会员ID") @PathVariable Long id) {
        Member member = new Member();
        member.setId(id);
        member.setDeleted(1);
        memberService.updateMember(member);
        return Result.success();
    }

    @Operation(summary = "补赠积分", description = "给会员补赠积分")
    @PostMapping("/{memberId}/points/add")
    public Result<Void> addPoints(
            @Parameter(description = "会员ID") @PathVariable String memberId,
            @Parameter(description = "积分数量") @RequestParam Integer points,
            @Parameter(description = "补赠原因") @RequestParam String reason,
            @Parameter(description = "操作人ID") @RequestParam(required = false) Long operatorId,
            @Parameter(description = "操作人姓名") @RequestParam(required = false) String operatorName) {
        memberService.addPoints(memberId, points, reason, operatorId, operatorName);
        return Result.success();
    }

    @Operation(summary = "扣除积分", description = "扣除会员积分")
    @PostMapping("/{memberId}/points/deduct")
    public Result<Void> deductPoints(
            @Parameter(description = "会员ID") @PathVariable String memberId,
            @Parameter(description = "积分数量") @RequestParam Integer points,
            @Parameter(description = "扣除原因") @RequestParam String reason,
            @Parameter(description = "操作人ID") @RequestParam(required = false) Long operatorId,
            @Parameter(description = "操作人姓名") @RequestParam(required = false) String operatorName) {
        memberService.deductPoints(memberId, points, reason, operatorId, operatorName);
        return Result.success();
    }
}
