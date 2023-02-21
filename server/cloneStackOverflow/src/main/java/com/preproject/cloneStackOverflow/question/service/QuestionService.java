package com.preproject.cloneStackOverflow.question.service;

import com.preproject.cloneStackOverflow.answer.entity.Answer;
import com.preproject.cloneStackOverflow.answer.service.AnswerService;
import com.preproject.cloneStackOverflow.exception.ExceptionCode;
import com.preproject.cloneStackOverflow.exception.StackOverFlowException;
import com.preproject.cloneStackOverflow.member.repository.MemberRepository;
import com.preproject.cloneStackOverflow.member.service.MemberService;
import com.preproject.cloneStackOverflow.question.entity.Question;
import com.preproject.cloneStackOverflow.question.repository.QuestionRepository;
import com.preproject.cloneStackOverflow.utils.CustomBeanUtils;
import org.apache.catalina.security.SecurityUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
public class QuestionService {
    //private final Question question;
    private final QuestionRepository questionRepository;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final CustomBeanUtils beanUtils;

    public QuestionService(QuestionRepository questionRepository,
                           MemberService memberService,
                           MemberRepository memberRepository,
                           CustomBeanUtils beanUtils){
        this.questionRepository = questionRepository;
        this.memberService = memberService;
        this.memberRepository = memberRepository;
        this.beanUtils = beanUtils;
    }


    public Question createQuestion(Question question){
        //verifyQuestion(question);
        //Question saveQuestion = saveQuestion(question);
        verifyExistsId(question.getQuestionId());

        return questionRepository.save(question);
    }

    public Question updateQuestion(Question question){
        Question findQuestion = findQuestion(question.getQuestionId());

        //updateQuestion = findQuestion.changeQuestionInfo(question, beanUtils);
        //return saveQuestion(updateQuestion);

        Optional.ofNullable(question.getTitle()).ifPresent(title->findQuestion.setTitle(title));
        Optional.ofNullable(question.getBody()).ifPresent(body->findQuestion.setBody(body));
        return saveQuestion(findQuestion);
    }

    public Question findQuestion(long questionId){
        return questionRepository.findById(questionId).orElseThrow(() -> new StackOverFlowException(ExceptionCode.QUESTION_NOT_FOUND));
    }

    public Page<Question> findQuestions(int page, int size){
        return questionRepository.findAll(PageRequest.of(page, size, Sort.by("questionId").descending()));
    }

    /*@Transactional
    public Question viewCount(long questionId){
        //Question question = findQuestion(questionId);
        .setView(Question.getView()+1);
        return questionRepository.findById(questionId).orElseThrow(() -> new StackOverFlowException(ExceptionCode.QUESTION_NOT_FOUND));
    }*/

    public long questionCount() {
        long question = questionRepository.count();
        return question;
    }
    /*//Todo : answerCount 구현
    public int answerCount(List<Long> quesiotnId){
        question.getAnswers().stream().map(answer->answer.getAnswerId()).collect(Collectors.toList());
        return questionRepository.countByQuestionIdIn(questionIds);
    }*/

    public void deleteQuestion(long questionId){
        Question findQuestion = findVerifiedQuestion(questionId);
        questionRepository.delete(findQuestion);
    }

    public Question findVerifiedQuestion(long questionId){
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question findQuestion = optionalQuestion.orElseThrow(()-> new StackOverFlowException(ExceptionCode.QUESTION_NOT_FOUND));
        return findQuestion;
    }

    private void verifyExistsId(long questionId) {
        Optional<Question> question = questionRepository.findById(questionId);
        if(question.isPresent()){
            throw new StackOverFlowException(ExceptionCode.QUESTION_EXISTS);
        }
    }

    private Question saveQuestion(Question question){
        return questionRepository.save(question);
    }

    private List<Long> getAnswers(Question question){
        return question.getAnswers().stream().map(answer->answer.getAnswerId()).collect(Collectors.toList());
    }
}
