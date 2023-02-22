package com.preproject.cloneStackOverflow.member.controller;

import com.preproject.cloneStackOverflow.member.dto.MemberDto;
import com.preproject.cloneStackOverflow.member.entity.Member;
import com.preproject.cloneStackOverflow.member.mapper.MemberMapper;
import com.preproject.cloneStackOverflow.member.service.MemberService;
import com.preproject.cloneStackOverflow.response.MultiResponseDto;
import com.preproject.cloneStackOverflow.response.SingleResponseDto;
import com.preproject.cloneStackOverflow.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;


@RequestMapping("/members")
@RestController
@Validated
@Slf4j
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/v1/members";
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.memberMapper = mapper;
    }
    //회원가입 페이지 출력 요청
    @GetMapping("/save")
    public ModelAndView saveForm(){
        ModelAndView mav = new ModelAndView("save");
        return mav;
    }
    //회원가입 post 요청
    @PostMapping("/save")
    public ModelAndView save(@Valid MemberDto.signup requestBody){
        ModelAndView mav = new ModelAndView("save");
        System.out.println("Member Registration Successfully");
        return mav;
    }

    @GetMapping("/{member-id}/my-page")
    public ModelAndView myPage(){
        ModelAndView mav = new ModelAndView("my-page");
        return mav;
    }
//    @PostMapping("/signup")
//    public ResponseEntity signupMember(@Valid @RequestBody MemberDto.Post requestBody){
//        Member member = memberMapper.memberPostToMember(requestBody);
//        Member createdMember = memberService.createMember(member);
//        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());
//
//        return ResponseEntity.created(location).build();
//    }
    @GetMapping("/logout")
    public ModelAndView logoutMember(){
        ModelAndView mav = new ModelAndView("logout");
        return mav;
    }
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId){
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(memberMapper.memberToMemberGetResponseDto(member))
                , HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getMembers(){
        List<Member> members = memberService.findMembers();
        return new ResponseEntity<>(members, HttpStatus.OK);
    }
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                      @Valid @RequestBody MemberDto.Patch requestBody){
        Member member =
                memberService.updateMember(memberMapper.memberPatchDtoToMember(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(memberMapper.memberToMemberGetResponseDto(member)),
                HttpStatus.OK);

    }
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(  @PathVariable("member-id") @Positive long memberId){
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
