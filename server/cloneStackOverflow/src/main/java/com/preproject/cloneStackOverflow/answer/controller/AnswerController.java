package com.preproject.cloneStackOverflow.answer.controller;

import com.preproject.cloneStackOverflow.answer.dto.AnswerDto;
import com.preproject.cloneStackOverflow.answer.entity.Answer;
import com.preproject.cloneStackOverflow.answer.mapper.AnswerMapper;
import com.preproject.cloneStackOverflow.answer.service.AnswerService;
import com.preproject.cloneStackOverflow.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Validated
@RequestMapping("/answers")
public class AnswerController {
    private final static String ANSWER_DEFAULT_URL = "/answers";
    private final AnswerService answerService;
    private final AnswerMapper mapper;

    public AnswerController(AnswerService answerService, AnswerMapper answerMapper) {
        this.answerService = answerService;
        this.mapper = answerMapper;
    }

    @PostMapping
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerDto.Post answerPostDto){
        Answer answer = answerService.createAnswer(mapper.answerPostToAnswer(answerPostDto)
                ,answerPostDto.getMemberId(),answerPostDto.getQuestionId());

        return new ResponseEntity<>(mapper.answerToPostResponse(answer),HttpStatus.CREATED);
    }

    @GetMapping("/{answer-id}")
    public ResponseEntity<AnswerDto.GetResponse> getAnswer(@PathVariable("answer-id") @Positive long answerId){
        Answer findAnswer = answerService.getAnswer(answerId);
        return new ResponseEntity<>(mapper.answerToGetResponse(findAnswer), HttpStatus.OK);
    }

    @GetMapping("/member/{member-id}")
    public ResponseEntity getMemberAnswers(@PathVariable("member-id") @Positive long memberId){
        List<Answer> memberAnswers = answerService.findMemberAnswers(memberId);

        return new ResponseEntity<>(mapper.answersToGetResponseAll(memberAnswers), HttpStatus.OK);
    }

    @PatchMapping("/{answer-id}")
    public ResponseEntity<AnswerDto.PatchResponse> patchAnswer(@PathVariable("answer-id") @Positive long answerId,
                                                               @Valid @RequestBody AnswerDto.Patch answerPatchDto){
        answerPatchDto.setAnswerId(answerId);
        Answer answer = mapper.answerPatchToAnswer(answerPatchDto);
        Answer updateAnswer= answerService.updateAnswer(answer);

        return new ResponseEntity<>(mapper.answerToPatchResponse(updateAnswer), HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") @Positive long answerId) {
        answerService.deleteAnswer(answerId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/question/{question-id}")
    public ResponseEntity getQuestionAnswers(@PathVariable("question-id") @Positive long questionId){
        List<Answer> memberAnswers = answerService.findQuestionAnswers(questionId);

        return new ResponseEntity<>(mapper.answersToGetResponseAll(memberAnswers), HttpStatus.OK);
    }

}
