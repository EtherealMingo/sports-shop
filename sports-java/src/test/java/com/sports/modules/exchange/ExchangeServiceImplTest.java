// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.exchange;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.exchange.mapper.ExchangeItemMapper;
import com.sports.modules.exchange.mapper.ExchangeRecordMapper;
import com.sports.modules.member.Member;
import com.sports.modules.member.MemberService;
import com.sports.modules.points.PointsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ExchangeServiceImplTest {

    @Mock
    private ExchangeItemMapper exchangeItemMapper;
    @Mock
    private ExchangeRecordMapper exchangeRecordMapper;
    @Mock
    private MemberService memberService;
    @Mock
    private PointsService pointsService;

    private ExchangeServiceImpl exchangeService;

    private ExchangeItem testItem;
    private Member testMember;

    @BeforeEach
    void setUp() {
        exchangeService = new ExchangeServiceImpl(exchangeItemMapper, exchangeRecordMapper, memberService, pointsService);

        testItem = new ExchangeItem();
        testItem.setId(1L);
        testItem.setName("专业羽毛球拍手胶");
        testItem.setPoints(200);
        testItem.setStock(50);
        testItem.setStatus("active");
        testItem.setDeleted(0);

        testMember = new Member();
        testMember.setMemberId("M202401010001");
        testMember.setName("张三");
        testMember.setPoints(1000);
    }

    @Test
    @DisplayName("积分兑换 - 成功（原子库存扣减）")
    void redeemItem_Success() {
        when(exchangeItemMapper.selectById(1L)).thenReturn(testItem);
        when(exchangeItemMapper.decrementStock(1L)).thenReturn(1);
        when(memberService.getMemberById("M202401010001")).thenReturn(testMember);
        doNothing().when(pointsService).deductPointsAtomic(anyString(), anyInt());
        when(exchangeRecordMapper.insert(any(ExchangeRecord.class))).thenReturn(1);

        ExchangeRecord result = exchangeService.redeemItem("M202401010001", 1L, 1L, "管理员");

        assertNotNull(result);
        assertEquals("pending", result.getStatus());
        verify(exchangeItemMapper, times(1)).decrementStock(1L);
        verify(pointsService, times(1)).deductPointsAtomic(eq("M202401010001"), eq(200));
    }

    @Test
    @DisplayName("积分兑换 - 库存不足")
    void redeemItem_OutOfStock() {
        when(exchangeItemMapper.selectById(1L)).thenReturn(testItem);
        when(exchangeItemMapper.decrementStock(1L)).thenReturn(0);

        assertThrows(RuntimeException.class, () ->
            exchangeService.redeemItem("M202401010001", 1L, 1L, "管理员")
        );
    }

    @Test
    @DisplayName("核销兑换记录 - 成功")
    void redeemRecord_Success() {
        ExchangeRecord record = new ExchangeRecord();
        record.setId(1L);
        record.setStatus("pending");

        when(exchangeRecordMapper.selectById(1L)).thenReturn(record);
        when(exchangeRecordMapper.updateById(any(ExchangeRecord.class))).thenReturn(1);

        exchangeService.redeemRecord(1L, 1L, "管理员");

        assertEquals("redeemed", record.getStatus());
    }
}
