// @ai-generated - 全部由 AI 輔助生成
package com.sports.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Swagger / OpenAPI 配置
 */
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("体育器材服务店铺管理系统 API")
                .version("2.1.0")
                .description("会员积分 + 耗材管理 + 服务预约 RESTful API")
                .contact(new Contact()
                    .name("开发团队")
                    .email("dev@sports.com"))
                .license(new License()
                    .name("MIT")
                    .url("https://opensource.org/licenses/MIT"))
            );
    }
}
