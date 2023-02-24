package com.preproject.cloneStackOverflow.config;

import com.preproject.cloneStackOverflow.member.auth.utils.HelloAuthorityUtils;
import com.preproject.cloneStackOverflow.member.service.DBMemberService;
import com.preproject.cloneStackOverflow.member.service.MemberService;
import com.preproject.cloneStackOverflow.member.repository.MemberRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class JavaConfiguration {
    @Primary
    @Bean
    public MemberService dbMemberService(MemberRepository memberRepository,
                                           PasswordEncoder passwordEncoder,
                                           HelloAuthorityUtils authorityUtils) {
        return new DBMemberService(memberRepository, passwordEncoder, authorityUtils);
    }
}