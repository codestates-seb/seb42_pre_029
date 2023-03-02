package com.preproject.cloneStackOverflow.question.service;

import com.preproject.cloneStackOverflow.answer.entity.Answer;
import com.preproject.cloneStackOverflow.exception.ExceptionCode;
import com.preproject.cloneStackOverflow.exception.StackOverFlowException;
import com.preproject.cloneStackOverflow.member.entity.Member;
import com.preproject.cloneStackOverflow.member.repository.MemberRepository;
import com.preproject.cloneStackOverflow.member.service.MemberService;
import com.preproject.cloneStackOverflow.question.entity.Question;
import com.preproject.cloneStackOverflow.question.repository.QuestionRepository;
import com.preproject.cloneStackOverflow.utils.CustomBeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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


    public Question createQuestion(Question question, long memberId){
        verifyExistsId(question.getQuestionId());
        Member findMember = memberService.findVerifiedMember(memberId);

        question.setMember(findMember);

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
        question.userInfo();
        question.setView(question.getView()+1);
        question.setAnswerCount(answerCount(questionId));
        return questionRepository.save(question);
    }

    @Transactional(readOnly = true)
    public List<Question> findQuestions() {
        return (List<Question>) questionRepository.findAll();
    }

    public List<String> findMemberQuestions(long memberId){
        Member findMember = memberService.findVerifiedMember(memberId);
        List<Question> questionList = questionRepository.findByMember(findMember);
        List<String> list = new ArrayList<>();
        for(Question question : questionList){
            list.add(question.getBody());
        }
        return list;
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

    // My-Page구현시 사용할 것
//    public List<Question> getQuestionListByMember(Member member) {
//        return questionRepository.findByMember(member);
//    }
}
