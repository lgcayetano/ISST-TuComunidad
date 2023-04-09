package es.upm.dit.isst.tucomapi.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
    private CustomAuthenticationProvider authProvider;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authProvider);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
        .cors().and()
		.csrf().disable()
        .authorizeRequests()
			.antMatchers("/css/**", "/img/**", "/layouts/**").permitAll()
			.antMatchers("/", "/registro").permitAll()
			//.antMatchers("/crear", "/guardar").permitAll()
			.anyRequest().authenticated()
        .and()
            .formLogin()
				//.loginPage("/login")
                //.defaultSuccessUrl("/",true) //añadido por luis para probar
				.permitAll()
		.and()
            .logout()
			.permitAll();
/*
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //NEW
        .and()
        .authorizeRequests()
			.antMatchers("/login").permitAll() // sustituye por formLogin y logout
			.antMatchers("/lista").permitAll()
            .anyRequest().authenticated()
        .and()
			.addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class);
*/
	}

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:8080"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}