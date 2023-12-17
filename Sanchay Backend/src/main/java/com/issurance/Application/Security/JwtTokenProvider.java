package com.issurance.Application.Security;

import java.security.Key;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.issurance.Application.entities.UserInfo;
import com.issurance.Application.exceptions.UserApiException;
import com.issurance.Application.repository.UserInfoRepo;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenProvider {
	
	
	@Value("${app.jwt-secret}")
	private String jwtSecret;
	
	
	@Value("${app.jwt-expiration-millisecond}")
	private long ExpirationDate;
	
	
	@Autowired
	private UserInfoRepo userInfoRepo;
	
	private Key key() {
		return Keys.hmacShaKeyFor(
					Decoders.BASE64.decode(jwtSecret)
				);
	}
	
	public String generateToken(Authentication authentication) {
		
		String username=authentication.getName();
		
		
		Optional<UserInfo> userinfo=userInfoRepo.findByUsername(username);
		
		String roleName=null;
		if(userinfo.isPresent()) {
			roleName=userinfo.get().getRole().getRolename();
		}
		
		Claims claims=Jwts.claims().setSubject(username);
		claims.put("role", roleName);
		
		Date currentDate= new Date();	
		
		Date expireDate= new Date(currentDate.getTime()+ ExpirationDate);
		
		String token= Jwts.builder()
				.setClaims(claims)
//				.setSubject(username)
				.setIssuedAt(new Date())
				.setExpiration(expireDate)
				.signWith(key())
				.compact();
		return token;
	}
	
	//get username from jwt token
	public String getUsername(String token) {
		Claims claims= Jwts.parserBuilder()
				.setSigningKey(key())
				.build()
				.parseClaimsJws(token)
				.getBody();
		String username= claims.getSubject();
		return username;
	}
	
	
	
	
	//validate Jwt token
	
	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder()
					.setSigningKey(key())
					.build()
					.parse(token);
			return true;
		} catch (MalformedJwtException ex) {
            throw new UserApiException(HttpStatus.BAD_REQUEST, "Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            throw new UserApiException(HttpStatus.BAD_REQUEST, "Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            throw new UserApiException(HttpStatus.BAD_REQUEST, "Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            throw new UserApiException(HttpStatus.BAD_REQUEST, "JWT claims string is empty.");
        }
	
	}
	
	
	//to decode token
	
	 public  Claims decodeJwtToken(String token) throws JwtException {
	        Claims claims = Jwts.parser()
	                .setSigningKey(key())
	                .parseClaimsJws(token)
	                .getBody();
	        return claims;
	    }
}
