// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.points;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.member.Member;
import com.sports.modules.member.MemberService;
import com.sports.modules.points.mapper.PointsRecordMapper;
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
 * 积分服务单元测试
 */
@ExtendWith(MockitoExtension.class)
class PointsServiceImplTest {

    @Mock
    private PointsRecordMapper pointsRecordMapper;

    @Mock
    private MemberService memberService;

    private PointsServiceImpl pointsService;

    private Member testMember;

    @BeforeEach
    void setUp() {
        pointsService = new PointsServiceImpl(pointsRecordMapper, memberService);
        testMember = new Member();
        testMember.setMemberId("M202401010001");
        testMember.setName("张三");
        testMember.setPhone("13800001111");
        testMember.setPoints(1000);
    }

    @Test
    @DisplayName("获取积分记录列表 - 分页")
    void getPointsList_Pagination() {
        Page<PointsRecord> mockPage = new Page<>(1, 10);
        mockPage.setTotal(0);
        when(pointsRecordMapper.selectPage(any(Page.class), any(LambdaQueryWrapper.class))).thenReturn(mockPage);

        Page<PointsRecord> result = pointsService.getPointsList(new Page<>(1, 10), null, null);

        assertNotNull(result);
    }

    @Test
    @DisplayName("获取积分余额 - 成功")
    void getPointsBalance_Success() {
        when(memberService.getMemberById("M202401010001")).thenReturn(testMember);

        Integer balance = pointsService.getPointsBalance("M202401010001");

        assertEquals(1000, balance);
    }

    @Test
    @DisplayName("补赠积分 - 成功（原子操作）")
    void addPoints_Success() {
        when(memberService.addPointsAtomic("M202401010001", 100)).thenReturn(1);
        when(memberService.getMemberById("M202401010001")).thenReturn(testMember);
        when(pointsRecordMapper.insert(any(PointsRecord.class))).thenReturn(1);

        pointsService.addPoints("M202401010001", 100, "补赠积分", 1L, "管理员");

        verify(memberService, times(1)).addPointsAtomic("M202401010001", 100);
        verify(pointsRecordMapper, times(1)).insert(any(PointsRecord.class));
    }

    @Test
    @DisplayName("补赠积分 - 会员不存在")
    void addPoints_MemberNotFound() {
        when(memberService.addPointsAtomic("M999999999999", 100)).thenReturn(0);

        assertThrows(RuntimeException.class, () ->
            pointsService.addPoints("M999999999999", 100, "补赠", 1L, "管理员")
        );
    }

    @Test
    @DisplayName("扣除积分 - 成功（原子操作）")
    void deductPoints_Success() {
        when(memberService.deductPointsAtomic("M202401010001", 200)).thenReturn(1);
        when(memberService.getMemberById("M202401010001")).thenReturn(testMember);
        when(pointsRecordMapper.insert(any(PointsRecord.class))).thenReturn(1);

        pointsService.deductPoints("M202401010001", 200, "消费抵扣", 1L, "管理员");

        verify(memberService, times(1)).deductPointsAtomic("M202401010001", 200);
    }

    @Test
    @DisplayName("扣除积分 - 积分不足")
    void deductPoints_InsufficientPoints() {
        when(memberService.deductPointsAtomic("M202401010001", 2000)).thenReturn(0);

        assertThrows(RuntimeException.class, () ->
            pointsService.deductPoints("M202401010001", 2000, "消费抵扣", 1L, "管理员")
        );
    }

    @Test
    @DisplayName("积分核销 - 成功")
    void redeemPoints_Success() {
        when(memberService.deductPointsAtomic("M202401010001", 500)).thenReturn(1);
        when(memberService.getMemberById("M202401010001")).thenReturn(testMember);
        when(pointsRecordMapper.insert(any(PointsRecord.class))).thenReturn(1);

        pointsService.redeemPoints("M202401010001", 500, "ORD-20260615-001", 1L, "管理员");

        verify(memberService, times(1)).deductPointsAtomic("M202401010001", 500);
    }

    @Test
    @DisplayName("消费获得积分 - 成功")
    void earnPoints_Success() {
        when(memberService.addPointsAtomic("M202401010001", 80)).thenReturn(1);
        when(memberService.getMemberById("M202401010001")).thenReturn(testMember);
        when(pointsRecordMapper.insert(any(PointsRecord.class))).thenReturn(1);

        pointsService.earnPoints("M202401010001", 80, "ORD-20260615-001", 1L, "系统");

        verify(memberService, times(1)).addPointsAtomic("M202401010001", 80);
    }
}
