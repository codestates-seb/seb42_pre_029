package com.preproject.cloneStackOverflow.question.controller;

import com.preproject.cloneStackOverflow.question.dto.QuestionPatchDto;
import com.preproject.cloneStackOverflow.question.dto.QuestionPostDto;
import com.preproject.cloneStackOverflow.question.dto.QuestionResponseDto;
import com.preproject.cloneStackOverflow.question.entity.Question;
import com.preproject.cloneStackOverflow.question.mapper.QuestionMapper;
import com.preproject.cloneStackOverflow.question.service.QuestionService;
import com.preproject.cloneStackOverflow.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("v1/questions")
@Validated
public class QuestionController {
    private final static String QUESTION_DEFAULT_URL = "";
    private final QuestionService questionService;
    private final QuestionMapper mapper;

    public QuestionController(QuestionService questionService, QuestionMapper mapper) {
        this.questionService = questionService;
        this.mapper = mapper;
    }

    @PostMapping("{/question-id}")
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto){
        Question question = mapper.questionPostDtoToQuestion(questionPostDto);
        Question resultQuestion = questionService.createQuestion(question);

        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, resultQuestion.getQuestionId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive long questionId, @Valid @RequestBody QuestionPatchDto questionPatchDto){
        questionPatchDto.setQuestionId(questionId);
        Question response = questionService.updateQuestion(mapper.questionPatchDtoToQuestion(questionPatchDto));
        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(response), HttpStatus.OK);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive long questionId){
        Question response = questionService.findQuestion(questionId);
        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(response), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getQuestions(@RequestParam("page") int page, @RequestParam("size") int size){

        List<Question> Questions = questionService.findQuestions();
        List<QuestionResponseDto> response =
                Questions.stream()
                        .map(Question -> mapper.questionToQuestionResponseDto(Question))
                        .collect(Collectors.toList());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive long questionId){
        questionService.deleteQuestion(questionId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/view/{question-id}")
    public ResponseEntity getViewCount(@PathVariable("question-id") @Positive long questionId){
        Question response = questionService.viewCount(questionId);
        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(response), HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity getQuestionCount(){
        long response = questionService.questionCount();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
/*
    @GetMapping("/count/{question-id}")
    // Todo : 답변수, AnswerService매핑 필요?
    public ResponseEntity getAnswerCount(@PathVariable("question-id") @Positive long questionId){
        Question response = questionService.answerCount();
        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(response), HttpStatus.OK);
    }
 */
}