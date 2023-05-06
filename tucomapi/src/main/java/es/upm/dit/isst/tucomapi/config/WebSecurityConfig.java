package es.upm.dit.isst.tucomapi.config;

import java.util.Arrays;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
    DataSource ds;

    @Autowired
    Securityhandler successHandler;

    @Autowired
    Failurehandler failureHandler;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication().dataSource(ds)
            .usersByUsernameQuery ("SELECT email, CONCAT('{bcrypt}', contrasena) AS password, estado FROM Usuario where email=?")
            .authoritiesByUsernameQuery ("SELECT email, CASE WHEN nivel=1 THEN 'ROLE_PRESI' ELSE 'ROLE_VECI' END AS authority FROM Usuario where email=?");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
        .exceptionHandling()
        .authenticationEntryPoint(new Http403ForbiddenEntryPoint())
        .and()
        .cors().and()
		.csrf().disable()
        .authorizeRequests()
			.antMatchers("/css/**", "/img/**", "/layouts/**").permitAll()
			.antMatchers("/", "/registro","/swagger-ui.html","/swagger-ui/**","/v3/**").permitAll()
            .antMatchers("/votacion/nueva","/comunicados/nuevo","/comunidad/editcodigovecino",
                        "/comunidad/codigopresidente").hasAnyRole("PRESI")
			.anyRequest().authenticated()
        .and()
            .formLogin()
				.permitAll()
                .successHandler(successHandler)
                .failureHandler(failureHandler)
		.and()
            .logout()
                .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK))
			    .permitAll();

	}

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("https://localhost:8080"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PUT"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}