// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.member;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.member.Member;

public interface MemberService {

    Member getMemberById(String memberId);

    Member getMemberByPhone(String phone);

    void createMember(Member member);

    void updateMember(Member member);

    Page<Member> getMemberList(Page<Member> page, String keyword);

    void addPoints(String memberId, Integer points, String reason);

    void deductPoints(String memberId, Integer points, String reason);

    /**
     * 原子增加积分（SQL级别，防止并发竞态）
     * @return 影响行数，0表示会员不存在
     */
    int addPointsAtomic(String memberId, Integer points);

    /**
     * 原子扣除积分（SQL级别，防止并发竞态和积分不足）
     * @return 影响行数，0表示积分不足或会员不存在
     */
    int deductPointsAtomic(String memberId, Integer points);
}
