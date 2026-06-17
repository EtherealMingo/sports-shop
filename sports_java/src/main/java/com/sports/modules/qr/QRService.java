// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.qr;

import com.sports.modules.qr.QRCode;
import com.sports.modules.qr.QRScanRecord;

import java.util.List;

public interface QRService {
    List<QRCode> generateQRCodes(Long purchaseId, Integer count);
    QRCode getQRCode(String qrCode);
    QRScanRecord scanQRCode(String qrCode, String action, Long technicianId);
    List<QRScanRecord> getScanRecords(String qrCode);
}
