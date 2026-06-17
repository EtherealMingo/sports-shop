// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.member;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sports.modules.member.Member;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MemberMapper extends BaseMapper<Member> {

    /**
     * 原子增加积分（SQL 参数化，防止 SQL 注入）
     */
    int addPointsAtomic(@Param("memberId") String memberId, @Param("points") Integer points);

    /**
     * 原子扣除积分（SQL 参数化，防止 SQL 注入和积分不足）
     */
    int deductPointsAtomic(@Param("memberId") String memberId, @Param("points") Integer points);
}
