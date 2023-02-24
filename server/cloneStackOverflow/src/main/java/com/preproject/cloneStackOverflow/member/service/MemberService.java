package com.preproject.cloneStackOverflow.member.service;


import com.preproject.cloneStackOverflow.exception.ExceptionCode;
import com.preproject.cloneStackOverflow.exception.StackOverFlowException;
import com.preproject.cloneStackOverflow.member.entity.Member;
import com.preproject.cloneStackOverflow.member.repository.MemberRepository;
import com.preproject.cloneStackOverflow.utils.CustomBeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    protected final MemberRepository memberRepository;
    private final CustomBeanUtils<Member> beanUtils;

    public MemberService(MemberRepository memberRepository, CustomBeanUtils<Member> beanUtils) {
        this.memberRepository = memberRepository;
        this.beanUtils = beanUtils;
    }
    public Member signinMember(Member member){
        return null;
    }

    public Member createMember(Member member) {
        Optional<Member> findMember = memberRepository.findByEmail(member.getEmail());
        return memberRepository.save(member);
    }

    public Member signoutMember(Member member) {
        return null;
    }

    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
        Member findMember = memberRepository.findById(memberId).orElseThrow(() -> new StackOverFlowException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    @Transactional(readOnly = true)
    public List<Member> findMembers() {
        return (List<Member>) memberRepository.findAll();
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());
        Optional.ofNullable(member.getEmail())
                .ifPresent(email -> findMember.setEmail(email));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(password));
        Optional.ofNullable(member.getUsername())
                .ifPresent(username -> findMember.setUsername(username));
        Optional.ofNullable(member.getBirth())
                .ifPresent(birth -> findMember.setBirth(birth));
        Optional.ofNullable(member.getPhone())
                .ifPresent(phone -> findMember.setPhone(phone));
        return memberRepository.save(findMember);
    }

    public void deleteMember(long memberId) {
        Member findMember = memberRepository.findByMemberId(memberId);
        Member.checkNotFoundMember(findMember);

        memberRepository.delete(findMember);
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {

        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        return optionalMember.orElseThrow(() ->
                new StackOverFlowException(ExceptionCode.MEMBER_NOT_FOUND));
    }
}