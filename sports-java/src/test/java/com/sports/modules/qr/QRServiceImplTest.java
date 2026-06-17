// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.qr;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.sports.modules.qr.mapper.QRCodeMapper;
import com.sports.modules.qr.mapper.QRScanRecordMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class QRServiceImplTest {

    @Mock
    private QRCodeMapper qrCodeMapper;

    @Mock
    private QRScanRecordMapper scanRecordMapper;

    private QRServiceImpl qrService;

    private QRCode testQRCode;

    @BeforeEach
    void setUp() {
        qrService = new QRServiceImpl(qrCodeMapper, scanRecordMapper);
        testQRCode = new QRCode();
        testQRCode.setId(1L);
        testQRCode.setQrCode("WIR-00000001-00000001-0001-ABCD");
        testQRCode.setWireId(1L);
        testQRCode.setPurchaseId(1L);
        testQRCode.setSpoolNo(1);
        testQRCode.setTotalSpools(20);
        testQRCode.setStatus("unused");
        testQRCode.setPrintCount(1);
        testQRCode.setDeleted(0);
    }

    @Test
    @DisplayName("生成二维码")
    void generateQRCodes() {
        when(qrCodeMapper.insert(any(QRCode.class))).thenReturn(1);

        List<QRCode> result = qrService.generateQRCodes(1L, 5);

        assertNotNull(result);
        assertEquals(5, result.size());
        assertEquals(1, result.get(0).getSpoolNo());
        assertEquals(5, result.get(4).getSpoolNo());
        verify(qrCodeMapper, times(5)).insert(any(QRCode.class));
    }

    @Test
    @DisplayName("查询二维码 - 存在")
    void getQRCode_Exists() {
        when(qrCodeMapper.selectOne(any(LambdaQueryWrapper.class))).thenReturn(testQRCode);

        QRCode result = qrService.getQRCode("WIR-00000001-00000001-0001-ABCD");

        assertNotNull(result);
        assertEquals("unused", result.getStatus());
    }

    @Test
    @DisplayName("查询二维码 - 不存在")
    void getQRCode_NotExists() {
        when(qrCodeMapper.selectOne(any(LambdaQueryWrapper.class))).thenReturn(null);

        assertNull(qrService.getQRCode("INVALID-CODE"));
    }

    @Test
    @DisplayName("扫码 - 成功")
    void scanQRCode_Success() {
        when(qrCodeMapper.selectOne(any(LambdaQueryWrapper.class))).thenReturn(testQRCode);
        when(scanRecordMapper.insert(any(QRScanRecord.class))).thenReturn(1);

        QRScanRecord result = qrService.scanQRCode("WIR-00000001-00000001-0001-ABCD", "scan_start", 1L);

        assertNotNull(result);
        assertEquals("scan_start", result.getAction());
        assertEquals(1L, result.getTechnicianId());
        verify(scanRecordMapper, times(1)).insert(any(QRScanRecord.class));
    }

    @Test
    @DisplayName("扫码 - 二维码无效")
    void scanQRCode_Invalid() {
        when(qrCodeMapper.selectOne(any(LambdaQueryWrapper.class))).thenReturn(null);

        assertThrows(RuntimeException.class, () ->
            qrService.scanQRCode("INVALID", "scan_start", 1L)
        );
    }

    @Test
    @DisplayName("扫码 - 二维码已使用")
    void scanQRCode_AlreadyUsed() {
        testQRCode.setStatus("used");
        when(qrCodeMapper.selectOne(any(LambdaQueryWrapper.class))).thenReturn(testQRCode);

        assertThrows(RuntimeException.class, () ->
            qrService.scanQRCode("WIR-00000001-00000001-0001-ABCD", "scan_start", 1L)
        );
    }

    @Test
    @DisplayName("获取扫码记录")
    void getScanRecords() {
        QRScanRecord record = new QRScanRecord();
        record.setId(1L);
        record.setAction("scan_start");
        when(scanRecordMapper.selectList(any(LambdaQueryWrapper.class)))
            .thenReturn(java.util.List.of(record));

        List<QRScanRecord> result = qrService.getScanRecords("WIR-00000001-00000001-0001-ABCD");

        assertNotNull(result);
        assertEquals(1, result.size());
    }
}
