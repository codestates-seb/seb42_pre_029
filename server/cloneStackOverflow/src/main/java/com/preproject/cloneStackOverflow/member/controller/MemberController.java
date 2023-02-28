package com.preproject.cloneStackOverflow.member.controller;

import com.preproject.cloneStackOverflow.member.dto.MemberDto;
import com.preproject.cloneStackOverflow.member.entity.Member;
import com.preproject.cloneStackOverflow.member.mapper.MemberMapper;
import com.preproject.cloneStackOverflow.member.service.MemberService;
import com.preproject.cloneStackOverflow.response.SingleResponseDto;
import com.preproject.cloneStackOverflow.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;


@RequestMapping("/members")
@RestController
@CrossOrigin
@Validated
@Slf4j
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.memberMapper = mapper;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = memberMapper.memberPostToMember(requestBody);

        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        return ResponseEntity.created(location).build();
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
        return new ResponseEntity<>(memberMapper.membersToMemberGetResponseDtos(members), HttpStatus.OK);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                      @Valid @RequestBody MemberDto.Patch requestBody){
        requestBody.setMemberId(memberId);
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
