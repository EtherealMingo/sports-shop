// @ai-generated - 全部由 AI 輔助生成
package com.sports.common.exception;

import com.sports.common.Result;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

/**
 * 全局异常处理单元测试
 */
class GlobalExceptionHandlerTest {

    private final GlobalExceptionHandler handler = new GlobalExceptionHandler();

    @Test
    @DisplayName("业务异常 - 返回业务错误码")
    void handleBusinessException() {
        BusinessException ex = new BusinessException(1001, "积分不足");

        Result<Void> result = handler.handleBusinessException(ex);

        assertEquals(1001, result.getCode());
        assertEquals("积分不足", result.getMessage());
        assertNull(result.getData());
    }

    @Test
    @DisplayName("业务异常 - 默认错误码")
    void handleBusinessException_DefaultCode() {
        BusinessException ex = new BusinessException("未知错误");

        Result<Void> result = handler.handleBusinessException(ex);

        assertEquals(500, result.getCode());
        assertEquals("未知错误", result.getMessage());
    }

    @Test
    @DisplayName("参数异常 - 返回400")
    void handleIllegalArgument() {
        IllegalArgumentException ex = new IllegalArgumentException("参数错误");

        Result<Void> result = handler.handleIllegalArgument(ex);

        assertEquals(400, result.getCode());
        assertEquals("参数错误", result.getMessage());
    }

    @Test
    @DisplayName("系统异常 - 返回500")
    void handleException() {
        Exception ex = new RuntimeException("系统错误");

        Result<Void> result = handler.handleException(ex);

        assertEquals(500, result.getCode());
        assertEquals("系统繁忙，请稍后重试", result.getMessage());
    }
}
