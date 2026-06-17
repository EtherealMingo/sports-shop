// @ai-generated - 全部由 AI 輔助生成
package com.sports.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * 安全配置
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configure(http))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // 允许公开访问
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/test/**").permitAll()
                // 管理员接口
                .requestMatchers("/api/member/**").hasRole("ADMIN")
                .requestMatchers("/api/points/**").hasRole("ADMIN")
                .requestMatchers("/api/exchange/**").hasRole("ADMIN")
                .requestMatchers("/api/wire/**").hasRole("ADMIN")
                .requestMatchers("/api/supplier/**").hasRole("ADMIN")
                .requestMatchers("/api/purchase/**").hasRole("ADMIN")
                .requestMatchers("/api/usage/**").hasRole("ADMIN")
                .requestMatchers("/api/waste/**").hasRole("ADMIN")
                .requestMatchers("/api/inventory/**").hasRole("ADMIN")
                .requestMatchers("/api/appointment/**").hasRole("ADMIN")
                .requestMatchers("/api/technician/**").hasRole("ADMIN")
                .requestMatchers("/api/service/**").hasRole("ADMIN")
                .requestMatchers("/api/finance/**").hasRole("ADMIN")
                .requestMatchers("/api/log/**").hasRole("ADMIN")
                // 技师可扫码
                .requestMatchers("/api/qr/scan").hasAnyRole("ADMIN", "TECHNICIAN")
                .requestMatchers("/api/qr/generate").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
