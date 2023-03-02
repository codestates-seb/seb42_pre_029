package com.preproject.cloneStackOverflow.member.controller;

import com.preproject.cloneStackOverflow.answer.entity.Answer;
import com.preproject.cloneStackOverflow.answer.service.AnswerService;
import com.preproject.cloneStackOverflow.member.dto.MemberDto;
import com.preproject.cloneStackOverflow.member.entity.Member;
import com.preproject.cloneStackOverflow.member.mapper.MemberMapper;
import com.preproject.cloneStackOverflow.member.service.MemberService;
import com.preproject.cloneStackOverflow.question.entity.Question;
import com.preproject.cloneStackOverflow.question.service.QuestionService;
import com.preproject.cloneStackOverflow.response.SingleResponseDto;
import com.preproject.cloneStackOverflow.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RequestMapping("/members")
@RestController
@CrossOrigin(origins = "http://preproject-bucket-029.s3-website.ap-northeast-2.amazonaws.com")
@Validated
@Slf4j
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper memberMapper;
    // My-Page구현시 사용할 것
    //private final QuestionService questionService;
    //private final AnswerService answerService;


    public MemberController(MemberService memberService, MemberMapper mapper){//, QuestionService questionService, AnswerService answerService) {
        this.memberService = memberService;
        this.memberMapper = mapper;
        // My-Page구현시 사용할 것
        //this.questionService = questionService;
        //this.answerService = answerService;
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
                new SingleResponseDto<>(memberMapper.memberToMemberGetResponseDto(member)), HttpStatus.OK);
    }
//    @GetMapping("/{member-id}")
//    public ResponseEntity<Map<String, Object>> getMember(@PathVariable("member-id") long memberId) {
//        Member member = memberService.findMember(memberId);
//
//        List<Question> questionList = questionService.getQuestionListByMember(member);
//
//        List<Answer> answerList = answerService.getAnswerListByMember(member);
//
//        Map<String, Object> data = new HashMap<>();
//        data.put("member", member);
//        data.put("questions", questionList);
//        data.put("answers", answerList);
//
//        return new ResponseEntity<>(data, HttpStatus.OK);
//    }
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
