package com.preproject.cloneStackOverflow.question.service;

import com.preproject.cloneStackOverflow.answer.entity.Answer;
import com.preproject.cloneStackOverflow.answer.service.AnswerService;
import com.preproject.cloneStackOverflow.exception.ExceptionCode;
import com.preproject.cloneStackOverflow.exception.StackOverFlowException;
import com.preproject.cloneStackOverflow.member.entity.Member;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
public class QuestionService {
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
        verifyExistsId(question.getQuestionId());

        return questionRepository.save(question);
    }

    public Question updateQuestion(Question question){
        Question findQuestion = findQuestion(question.getQuestionId());

        Optional.ofNullable(question.getTitle()).ifPresent(findQuestion::setTitle);
        Optional.ofNullable(question.getBody()).ifPresent(findQuestion::setBody);
        return saveQuestion(findQuestion);
    }

    public Question findQuestion(long questionId){
        Question question = questionRepository.findById(questionId).orElseThrow(() -> new StackOverFlowException(ExceptionCode.QUESTION_NOT_FOUND));
        question.setView(question.getView()+1);
        question.setAnswerCount(answerCount(questionId));
        return questionRepository.save(question);
    }

//    public Page<Question> findQuestions(int page, int size){
//        return questionRepository.findAll(PageRequest.of(page, size, Sort.by("questionId").descending()));
//    }
    @Transactional(readOnly = true)
    public List<Question> findQuestions() {
        return (List<Question>) questionRepository.findAll();
    }


    public int viewCount(long questionId){
        Question findView = findVerifiedQuestion(questionId);
        return findView.getView();
    }

    public long questionCount() {
        long question = questionRepository.count();
        return question;
    }

    public int answerCount(long questionId){
        Question findAnswers = findVerifiedQuestion(questionId);
        return findAnswers.getAnswers().size();
    }

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

}
