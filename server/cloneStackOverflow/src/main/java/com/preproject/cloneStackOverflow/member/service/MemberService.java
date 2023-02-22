package com.preproject.cloneStackOverflow.member.service;


import com.preproject.cloneStackOverflow.exception.ExceptionCode;
import com.preproject.cloneStackOverflow.exception.StackOverFlowException;
import com.preproject.cloneStackOverflow.member.dto.MemberDto;
import com.preproject.cloneStackOverflow.member.entity.Member;
import com.preproject.cloneStackOverflow.member.repository.MemberRepository;
import com.preproject.cloneStackOverflow.utils.CustomBeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final CustomBeanUtils<Member> beanUtils;

    //private final PasswordEncoder passwordEncoder;    로그인 구현에서
    //private final CustomAuthorityUtils authorityUtils; 이건 시큐리티,권한할때

    public MemberService(MemberRepository memberRepository, CustomBeanUtils<Member> beanUtils
    ) {
        this.memberRepository = memberRepository;
        this.beanUtils = beanUtils;
        //this.passwordEncoder = passwordEncoder; 로그인 구현에서
        // private final PasswordEncoder passwordEncoder;
        //private final CustomAuthorityUtils authorityUtils; 이건 시큐리티,권한할때
    }
    public Member signinMember(Member member){
        return null;
    }

    public Member createMember(Member member) {
        Member findMember = memberRepository.findByEmail(member.getEmail());
        Member.checkExistEmail(findMember);

        //String encryptedPassword = passwordEncoder.encode(member.getPassword());
        // member.setPassword(encryptedPassword);

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

//    public Member findVerifiedMember(long memberId) {
//        Optional<Member> optionalMember =
//                memberRepository.findById(memberId);
//        Member findMember =
//                optionalMember.orElseThrow(() ->
//                        new StackOverFlowException(ExceptionCode.MEMBER_NOT_FOUND));
//        return findMember;
        //지열님 코드

//        public Long save(MemberDto memberDto) {
//            Member member = Member.toSaveEntity(memberDto);
//            Long savedId = memberRepository.save(member).getMemberId();
//            return savedId;
//    }
//        public MemberDto login(MemberDto memberDto) {
//            //login.html에서 이메일,비번 받고, DB로부터 이메일의 정보 가져오고,
//            //입력받은 비번과 DB에서 조회한 비번의 일치여부를 판단,
//            //일치하면 로그인 성공, 아니면 실패
//            Optional<Member> optionalMember = memberRepository.findByEmail(memberDto.getEmail());
//            if(optionalMember.isPresent()){
//                Member loginEntity = optionalMember.get();
//                if(loginEntity.getPassword().equals(memberDto.getPassword())){
//                    return MemberDto.toMemberDto(loginEntity);
//                }else{
//                    return null;
//                }
//            }else{
//                return null;
//            }
//        }
