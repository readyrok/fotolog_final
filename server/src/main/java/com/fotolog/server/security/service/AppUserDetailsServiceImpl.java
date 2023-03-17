package com.fotolog.server.security.service;

import com.fotolog.server.model.AppUser;
import com.fotolog.server.repo.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class AppUserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    AppUserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       AppUser user = userRepository.findByUsername(username);

       if(user == null){
           new UsernameNotFoundException("User Not Found with username: " + username);
       }

        return AppUserDetailsImpl.build(user);
    }

}
