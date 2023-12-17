package com.issurance.Application.Security;

import java.util.Collections;
import java.util.Optional;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.issurance.Application.entities.UserInfo;
import com.issurance.Application.repository.UserInfoRepo;


import lombok.AllArgsConstructor;


@AllArgsConstructor
@Service
public class CustomerUserDetailsService implements UserDetailsService {
	
	
	
	private UserInfoRepo userInfoRepo;
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Optional<UserInfo> finduser=userInfoRepo.findByUsername(username);
		
		
		UserInfo userInfo=finduser.get();
		
		if(userInfo == null)
			throw new UsernameNotFoundException("User not found with username or email: " +  username);
		
		Set<GrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority(userInfo.getRole().getRolename()));
//		Set<GrantedAuthority> authorities = new SimpleGrantedAuthority(userdetails.getRole().getRolename()).toSet();;
		
		return new org.springframework.security.core.userdetails.User(userInfo.getUsername(), userInfo.getPassword(), authorities);
	}

}
