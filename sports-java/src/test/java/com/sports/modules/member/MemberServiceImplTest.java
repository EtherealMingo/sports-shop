// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.member;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.member.mapper.MemberMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

/**
 * 会员服务单元测试
 */
@ExtendWith(MockitoExtension.class)
class MemberServiceImplTest {

    @Mock
    private MemberMapper memberMapper;

    private MemberServiceImpl memberService;

    private Member testMember;

    @BeforeEach
    void setUp() {
        memberService = new MemberServiceImpl(memberMapper);
        testMember = new Member();
        testMember.setId(1L);
        testMember.setMemberId("M202401010001");
        testMember.setName("张三");
        testMember.setPhone("13800001111");
        testMember.setLevel(1);
        testMember.setPoints(1000);
        testMember.setDeleted(0);
    }

    @Test
    @DisplayName("根据会员ID查询 - 会员存在")
    void getMemberById_WhenMemberExists() {
        when(memberMapper.selectOne(any(LambdaQueryWrapper.class))).thenReturn(testMember);

        Member result = memberService.getMemberById("M202401010001");

        assertNotNull(result);
        assertEquals("张三", result.getName());
    }

    @Test
    @DisplayName("新增会员 - 自动生成会员编号")
    void createMember_GeneratesMemberId() {
        Member newMember = new Member();
        newMember.setName("李四");
        newMember.setPhone("13900002222");

        when(memberMapper.insert(any(Member.class))).thenReturn(1);

        memberService.createMember(newMember);

        assertNotNull(newMember.getMemberId());
        assertTrue(newMember.getMemberId().startsWith("M"));
        assertEquals(0, newMember.getDeleted());
    }

    @Test
    @DisplayName("会员列表 - 分页查询")
    void getMemberList_Pagination() {
        Page<Member> mockPage = new Page<>(1, 10);
        mockPage.setTotal(0);
        when(memberMapper.selectPage(any(Page.class), any(LambdaQueryWrapper.class))).thenReturn(mockPage);

        Page<Member> result = memberService.getMemberList(new Page<>(1, 10), null);

        assertNotNull(result);
    }

    @Test
    @DisplayName("原子增加积分 - 成功")
    void addPointsAtomic_Success() {
        when(memberMapper.update(null, any())).thenReturn(1);

        int result = memberService.addPointsAtomic("M202401010001", 100);

        assertEquals(1, result);
        verify(memberMapper, times(1)).update(null, any());
    }

    @Test
    @DisplayName("原子增加积分 - 会员不存在")
    void addPointsAtomic_MemberNotFound() {
        when(memberMapper.update(null, any())).thenReturn(0);

        int result = memberService.addPointsAtomic("M999999999999", 100);

        assertEquals(0, result);
    }

    @Test
    @DisplayName("原子扣除积分 - 成功")
    void deductPointsAtomic_Success() {
        when(memberMapper.update(null, any())).thenReturn(1);

        int result = memberService.deductPointsAtomic("M202401010001", 200);

        assertEquals(1, result);
        verify(memberMapper, times(1)).update(null, any());
    }

    @Test
    @DisplayName("原子扣除积分 - 积分不足")
    void deductPointsAtomic_InsufficientPoints() {
        when(memberMapper.update(null, any())).thenReturn(0);

        int result = memberService.deductPointsAtomic("M202401010001", 2000);

        assertEquals(0, result);
    }
}
