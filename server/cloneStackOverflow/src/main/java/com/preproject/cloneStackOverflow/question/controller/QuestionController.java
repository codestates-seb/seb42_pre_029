package com.preproject.cloneStackOverflow.question.controller;

import com.preproject.cloneStackOverflow.member.service.MemberService;
import com.preproject.cloneStackOverflow.question.dto.QuestionDto;
import com.preproject.cloneStackOverflow.question.entity.Question;
import com.preproject.cloneStackOverflow.question.mapper.QuestionMapper;
import com.preproject.cloneStackOverflow.question.repository.QuestionRepository;
import com.preproject.cloneStackOverflow.question.service.QuestionService;
import com.preproject.cloneStackOverflow.response.MultiResponseDto;
import com.preproject.cloneStackOverflow.response.SingleResponseDto;
import com.preproject.cloneStackOverflow.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/v1/questions")
@Validated
@Slf4j
public class QuestionController {
    private final static String QUESTION_DEFAULT_URL = "/v1/questions";
    private final QuestionService questionService;
    private final QuestionMapper mapper;
    private final MemberService memberService;

    public QuestionController(QuestionService questionService, QuestionMapper mapper, MemberService memberService) {
        this.questionService = questionService;
        this.mapper = mapper;
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionDto.Post requestBody){
        Question question = mapper.questionPostDtoToQuestion(requestBody);
        Question createQuestion = questionService.createQuestion(question);

        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, createQuestion.getQuestionId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive long questionId, @Valid @RequestBody QuestionDto.Patch requestBody){
        Question question = questionService.updateQuestion(mapper.questionPatchDtoToQuestion(requestBody.addQuestionId(questionId)));
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.questionToQuestionResponseDto(question)), HttpStatus.OK );
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive long questionId){
        Question response = questionService.findQuestion(questionId);
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.questionToQuestionResponseDto(response)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getQuestions(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size){
        Page<Question> pageQuestions = questionService.findQuestions(page - 1, size);
        List<Question> questions = pageQuestions.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.questionsToQuestionResponseDtos(questions), pageQuestions), HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive long questionId){
        questionService.deleteQuestion(questionId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/view/{question-id}")
    public ResponseEntity getViewCount(@PathVariable("question-id") @Positive long questionId){
        Question response = questionService.viewCount(questionId);
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.questionToQuestionResponseDto(response)), HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity getQuestionCount(){
        long response = questionService.questionCount();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /*@GetMapping("/count/{question-id}")
    // Todo : 답변수, AnswerService매핑 필요?
    public ResponseEntity getAnswerCount(@PathVariable("question-id") @Positive long questionId){
        Question response = questionService.answerCount();
        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(response), HttpStatus.OK);
    }*/

}