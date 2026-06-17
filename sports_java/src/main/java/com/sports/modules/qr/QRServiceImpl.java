// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.qr;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.sports.common.exception.BusinessException;
import com.sports.modules.qr.mapper.QRCodeMapper;
import com.sports.modules.qr.mapper.QRScanRecordMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QRServiceImpl implements QRService {

    private final QRCodeMapper qrCodeMapper;
    private final QRScanRecordMapper scanRecordMapper;

    @Override
    public List<QRCode> generateQRCodes(Long purchaseId, Integer count) {
        List<QRCode> codes = new ArrayList<>();
        for (int i = 1; i <= count; i++) {
            QRCode code = new QRCode();
            code.setQrCode(generateQRCode(purchaseId, i));
            code.setPurchaseId(purchaseId);
            code.setSpoolNo(i);
            code.setTotalSpools(count);
            code.setStatus("unused");
            code.setPrintCount(0);
            code.setDeleted(0);
            code.setCreateTime(LocalDateTime.now());
            code.setUpdateTime(LocalDateTime.now());
            qrCodeMapper.insert(code);
            codes.add(code);
        }
        return codes;
    }

    @Override
    public QRCode getQRCode(String qrCode) {
        return qrCodeMapper.selectOne(
            new LambdaQueryWrapper<QRCode>()
                .eq(QRCode::getQrCode, qrCode)
                .eq(QRCode::getDeleted, 0)
        );
    }

    @Override
    public QRScanRecord scanQRCode(String qrCode, String action, Long technicianId) {
        QRCode code = getQRCode(qrCode);
        if (code == null) throw new BusinessException("二维码无效");
        if ("used".equals(code.getStatus())) throw new BusinessException("二维码已使用");
        if ("damaged".equals(code.getStatus())) throw new BusinessException("二维码已损坏");
        QRScanRecord record = new QRScanRecord();
        record.setQrCodeId(code.getId());
        record.setQrCode(qrCode);
        record.setAction(action);
        record.setTechnicianId(technicianId);
        record.setDeleted(0);
        record.setCreateTime(LocalDateTime.now());
        scanRecordMapper.insert(record);
        return record;
    }

    @Override
    public List<QRScanRecord> getScanRecords(String qrCode) {
        return scanRecordMapper.selectList(
            new LambdaQueryWrapper<QRScanRecord>()
                .eq(QRScanRecord::getQrCode, qrCode)
                .eq(QRScanRecord::getDeleted, 0)
                .orderByDesc(QRScanRecord::getScanTime)
        );
    }

    private String generateQRCode(Long purchaseId, int spoolNo) {
        return "WIR-" + String.format("%08d", purchaseId) + "-" + String.format("%04d", spoolNo) + "-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase();
    }
}
