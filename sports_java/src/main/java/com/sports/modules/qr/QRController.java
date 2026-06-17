// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.qr;

import com.sports.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "二维码管理", description = "二维码生成、扫码、追溯接口")
@RestController
@RequestMapping("/api/qr")
@RequiredArgsConstructor
public class QRController {

    private final QRService qrService;

    @Operation(summary = "生成")
    @PostMapping("/generate")
    public Result<List<QRCode>> generate(
            @RequestParam Long purchaseId,
            @RequestParam Integer count) {
        return Result.success(qrService.generateQRCodes(purchaseId, count));
    }

    @Operation(summary = "二维码详情")
    @GetMapping("/{qrCode}")
    public Result<QRCode> getQRCode(@PathVariable String qrCode) {
        return Result.success(qrService.getQRCode(qrCode));
    }

    @Operation(summary = "扫码")
    @PostMapping("/scan")
    public Result<QRScanRecord> scan(
            @RequestParam String qrCode,
            @RequestParam String action,
            @RequestParam(required = false) Long technicianId) {
        return Result.success(qrService.scanQRCode(qrCode, action, technicianId));
    }

    @Operation(summary = "记录")
    @GetMapping("/{qrCode}/records")
    public Result<List<QRScanRecord>> getRecords(@PathVariable String qrCode) {
        return Result.success(qrService.getScanRecords(qrCode));
    }
}
