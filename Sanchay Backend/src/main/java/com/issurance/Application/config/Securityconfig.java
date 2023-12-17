package com.issurance.Application.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.issurance.Application.Security.JwtAuthenticationEntryPoint;
import com.issurance.Application.Security.JwtAuthenticationFilter;



@EnableMethodSecurity
@Configuration
public class Securityconfig {
	
	@Autowired
	private UserDetailsService jwtuserDetailsService;
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	
	

	public Securityconfig(UserDetailsService userDetailsService,
			JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint, JwtAuthenticationFilter jwtAuthenticationFilter) {
		super();
		this.jwtuserDetailsService = userDetailsService;
		this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
		this.jwtAuthenticationFilter = jwtAuthenticationFilter;
	}
	
//	@Bean
//	public UserDetailsService userDetailsService() {
//	    return userDetailsService();
//	}

	@Bean
	public static PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception{
		return configuration.getAuthenticationManager();
	}
	
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf((csrf)->csrf.disable())
		.authorizeHttpRequests((authorize) ->
		authorize.requestMatchers("/userinfoapp/**").permitAll()
		.requestMatchers(HttpMethod.GET,"/customerapp/**").permitAll()
		.requestMatchers(HttpMethod.POST,"/customerapp/**").permitAll()
		.requestMatchers(HttpMethod.GET,"/adminapp/**").permitAll()
		.requestMatchers(HttpMethod.POST,"/adminapp/**").permitAll()
		.requestMatchers(HttpMethod.POST,"/employeeapp/**").permitAll()
		.requestMatchers(HttpMethod.GET,"/employeeapp/**").permitAll()
		.requestMatchers(HttpMethod.GET,"/agentapp/**").permitAll()
		.requestMatchers(HttpMethod.POST,"/agentapp/**").permitAll()
		.requestMatchers(HttpMethod.GET,"/planapp/**").permitAll()
		.requestMatchers(HttpMethod.POST,"/planapp/**").permitAll()
		.requestMatchers(HttpMethod.GET,"/policyapp/**").permitAll()
		.requestMatchers(HttpMethod.POST,"/policyapp/**").permitAll()
		.requestMatchers(HttpMethod.GET,"/schemeapp/**").permitAll()
		.requestMatchers(HttpMethod.POST,"/schemeapp/**").permitAll()
		.requestMatchers(HttpMethod.GET,"/auth/**").permitAll()
		.requestMatchers(HttpMethod.POST,"/auth/**").permitAll()
		.requestMatchers(HttpMethod.GET,"/paymentapp/**").permitAll()
		.requestMatchers(HttpMethod.POST,"/paymentapp/**").permitAll()
		.requestMatchers(HttpMethod.GET,"/queryapp/**").permitAll()
		.requestMatchers(HttpMethod.POST,"/queryapp/**").permitAll()
		.requestMatchers(HttpMethod.GET,"/mailapp/**").permitAll()
		.requestMatchers(HttpMethod.POST,"/mailapp/**").permitAll()
		.requestMatchers(HttpMethod.GET,"/documentapp/**").permitAll()
		.requestMatchers(HttpMethod.POST,"/documentapp/**").permitAll()
		
		.anyRequest().authenticated()
		).exceptionHandling(exception -> exception
				.authenticationEntryPoint(jwtAuthenticationEntryPoint)
				).sessionManagement(session -> session
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
						);
		http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
}
