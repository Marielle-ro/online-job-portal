package mtkigali.ac.rw.onlineJobPortal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod; // ✅ IMPORTANT
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
                        // ✅ Allow login & register
                        .requestMatchers("/auth/**").permitAll()

                        // ✅ VERY IMPORTANT: allow preflight requests
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // ✅ Your existing endpoints
                        .requestMatchers("/recruiter/jobs/**").permitAll()
                        .requestMatchers("/categories/**").permitAll()
                        .requestMatchers("/recruiter/getjobs/**").permitAll()
                        .requestMatchers("/jobseeker/jobs/**").permitAll()
                        .requestMatchers("/jobseeker/applications/**").permitAll()
                        .requestMatchers("/jobseeker/getuser/**").permitAll()
                        .requestMatchers("/jobseeker/profile/**").permitAll()
                        .requestMatchers("/jobseeker/stats/**").permitAll()
                        .requestMatchers("/recruiter/applications/**").permitAll()
                        .requestMatchers("/recruiter/recruiter_profile/**").permitAll()
                        .requestMatchers("/recruiter/*/status").permitAll()
                        .requestMatchers("/files/**").permitAll()
                        .requestMatchers("/search/global/**").permitAll()

                        // 🔒 Everything else secured
                        .anyRequest().authenticated()
                );

        return http.build();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();


        config.setAllowedOriginPatterns(List.of("*"));

        config.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"
        ));

        config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration
    ) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}