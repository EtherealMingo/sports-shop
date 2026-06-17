// @ai-generated - 全部由 AI 輔助生成
package com.sports.common.aspect;

import com.sports.modules.log.OperationLog;
import com.sports.modules.log.OperationLogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * 操作日志 AOP 切面
 */
@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class OperationLogAspect {

    private final OperationLogService logService;

    /**
     * 切入点：所有 ServiceImpl 的公开方法
     */
    @Pointcut("execution(* com.sports.modules..*ServiceImpl.*(..))")
    public void serviceMethods() {}

    /**
     * 方法成功后记录操作日志
     */
    @AfterReturning("serviceMethods()")
    public void logOperation(JoinPoint jp) {
        try {
            String className = jp.getTarget().getClass().getSimpleName();
            String methodName = jp.getSignature().getName();
            String module = className.replace("ServiceImpl", "").toLowerCase();

            // 跳过查询方法
            if (methodName.startsWith("get") || methodName.startsWith("list") || methodName.startsWith("query")) {
                return;
            }

            OperationLog log = new OperationLog();
            log.setModule(module);
            log.setAction(methodName);
            log.setDescription(className + "." + methodName);
            log.setCreateTime(LocalDateTime.now());

            logService.recordLog(log);
        } catch (Exception e) {
            log.warn("记录操作日志失败: {}", e.getMessage());
        }
    }
}
