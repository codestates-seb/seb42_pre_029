package com.preproject.cloneStackOverflow.member.service;


import com.preproject.cloneStackOverflow.exception.ExceptionCode;
import com.preproject.cloneStackOverflow.exception.StackOverFlowException;
import com.preproject.cloneStackOverflow.member.entity.Member;
import com.preproject.cloneStackOverflow.member.repository.MemberRepository;
import com.preproject.cloneStackOverflow.utils.CustomBeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Stack;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final CustomBeanUtils<Member> beanUtils;
    //private final PasswordEncoder passwordEncoder;
    //private final CustomAuthorityUtils authorityUtils; 이건 시큐리티,권한할때

    public MemberService(MemberRepository memberRepository, CustomBeanUtils<Member> beanUtils) {
        this.memberRepository = memberRepository;
        this.beanUtils = beanUtils;
        //this.passwordEncoder = passwordEncoder;
    }

    public Member signinMember(Member member){
        return null;
    }

    public Member createMember(Member member){
        Member findMember = memberRepository.findByEmail(member.getEmail());
        Member.checkExistEmail(findMember);

        //String encryptedPassword = passwordEncoder.encode(member.getPassword());
        //member.setPassword(encryptedPassword);

        return memberRepository.save(member);
    }

    public Member signoutMember(Member member){
        return null;
    }

    @Transactional(readOnly = true)
    public Member findMember(long memberId){
        Member findMember = memberRepository.findById(memberId).orElseThrow(() -> new StackOverFlowException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    @Transactional(readOnly = true)
    public Page<Member> findMembers(int page, int size){
        return memberRepository.findAll(PageRequest.of(page, size, Sort.by("memberId").descending()));
    }

    public Member updateMember(Member member){
        Member findMember = findMember(member.getMemberId());

        Member updatedMember = findMember.changeMemberInfo(member, beanUtils); // TODO 리팩토링 포인트 beanUtils 어쩔?

        return memberRepository.save(updatedMember);
    }
    public void deleteMember(long memberId){
        Member findMember = memberRepository.findByMemberId(memberId);
        Member.checkNotFoundMember(findMember);

        memberRepository.delete(findMember);
    }
    }