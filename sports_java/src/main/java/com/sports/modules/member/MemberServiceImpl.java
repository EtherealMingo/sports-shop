// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.member;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * 会员服务实现
 */
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberMapper memberMapper;

    @Override
    public Member getMemberById(String memberId) {
        return memberMapper.selectOne(
            new LambdaQueryWrapper<Member>()
                .eq(Member::getMemberId, memberId)
                .eq(Member::getDeleted, 0)
        );
    }

    @Override
    public Member getMemberByPhone(String phone) {
        return memberMapper.selectOne(
            new LambdaQueryWrapper<Member>()
                .eq(Member::getPhone, phone)
                .eq(Member::getDeleted, 0)
        );
    }

    @Override
    public void createMember(Member member) {
        if (!StringUtils.hasText(member.getMemberId())) {
            member.setMemberId(generateMemberId());
        }
        member.setDeleted(0);
        member.setCreateTime(LocalDateTime.now());
        member.setUpdateTime(LocalDateTime.now());
        memberMapper.insert(member);
    }

    @Override
    public void updateMember(Member member) {
        member.setUpdateTime(LocalDateTime.now());
        memberMapper.updateById(member);
    }

    @Override
    public Page<Member> getMemberList(Page<Member> page, String keyword) {
        LambdaQueryWrapper<Member> wrapper = new LambdaQueryWrapper<Member>()
            .eq(Member::getDeleted, 0);
        if (StringUtils.hasText(keyword)) {
            wrapper.and(w -> w
                .like(Member::getName, keyword)
                .or()
                .like(Member::getPhone, keyword)
                .or()
                .like(Member::getMemberId, keyword)
            );
        }
        wrapper.orderByDesc(Member::getCreateTime);
        return memberMapper.selectPage(page, wrapper);
    }

    @Override
    public void addPoints(String memberId, Integer points, String reason) {
        Member member = getMemberById(memberId);
        if (member == null) {
            throw new RuntimeException("会员不存在: " + memberId);
        }
        member.setPoints(member.getPoints() + points);
        member.setLastConsumeTime(LocalDateTime.now());
        updateMember(member);
    }

    @Override
    public void deductPoints(String memberId, Integer points, String reason) {
        Member member = getMemberById(memberId);
        if (member == null) {
            throw new RuntimeException("会员不存在: " + memberId);
        }
        if (member.getPoints() < points) {
            throw new RuntimeException("积分不足");
        }
        member.setPoints(member.getPoints() - points);
        member.setLastConsumeTime(LocalDateTime.now());
        updateMember(member);
    }

    @Override
    public int addPointsAtomic(String memberId, Integer points) {
        // 使用 XML 中定义的参数化 SQL，防止 SQL 注入
        return memberMapper.addPointsAtomic(memberId, points);
    }

    @Override
    public int deductPointsAtomic(String memberId, Integer points) {
        // 使用 XML 中定义的参数化 SQL，防止 SQL 注入
        return memberMapper.deductPointsAtomic(memberId, points);
    }

    /**
     * 生成会员编号: M + yyMMdd + 6位随机
     */
    private String generateMemberId() {
        String datePart = LocalDateTime.now()
            .format(java.time.format.DateTimeFormatter.ofPattern("yyMMdd"));
        String randomPart = UUID.randomUUID().toString().replace("-", "").substring(0, 6).toUpperCase();
        return "M" + datePart + randomPart;
    }
}
