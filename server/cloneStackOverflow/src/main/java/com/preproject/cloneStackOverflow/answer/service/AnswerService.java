package com.preproject.cloneStackOverflow.answer.service;

import com.preproject.cloneStackOverflow.answer.entity.Answer;
import com.preproject.cloneStackOverflow.answer.mapper.AnswerMapper;
import com.preproject.cloneStackOverflow.exception.ExceptionCode;
import com.preproject.cloneStackOverflow.exception.StackOverFlowException;
import com.preproject.cloneStackOverflow.answer.repository.AnswerRepository;
import com.preproject.cloneStackOverflow.member.entity.Member;
import com.preproject.cloneStackOverflow.member.service.MemberService;
import com.preproject.cloneStackOverflow.question.entity.Question;
import com.preproject.cloneStackOverflow.question.service.QuestionService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final MemberService memberService;
    private final QuestionService questionService;
    private final AnswerMapper mapper;


    public AnswerService(AnswerRepository answerRepository, MemberService memberService, QuestionService questionService, AnswerMapper mapper) {
        this.answerRepository = answerRepository;
        this.memberService = memberService;
        this.questionService = questionService;
        this.mapper = mapper;
    }

    public Answer createAnswer(Answer answer,long memberId, long questionId){
        Question findQuestion = questionService.findVerifiedQuestion(questionId);
        Member findMember = memberService.findVerifiedMember(memberId);

        answer.addMember(findMember);
        answer.addQuestion(findQuestion);

        return answerRepository.save(answer);
    }

    public Answer getAnswer(long answerId){
        Answer answer = new Answer();
        answer.setAnswerId(answerId);
        return findVerifyAnswer(answer.getAnswerId());
    }

    public List<String> findMemberAnswers(long memberId){
        Member findMember = memberService.findVerifiedMember(memberId);
        List<Answer> answerList = answerRepository.findByMember(findMember);
        List<String> list = new ArrayList<>();
        for(Answer answer : answerList){
            list.add(answer.getBody());
        }
        return list;
    }

    public Answer updateAnswer(Answer answer) {
        Answer findAnswer = findVerifyAnswer(answer.getAnswerId());

        Optional.ofNullable(answer.getBody())
                .ifPresent(findAnswer::setBody);
        return answerRepository.save(findAnswer);
    }

    public void deleteAnswer(long answerId){
        Answer findAnswer = findVerifyAnswer(answerId);
        answerRepository.delete(findAnswer);
    }

    private Answer findVerifyAnswer(long answerId){
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        return optionalAnswer.orElseThrow(() ->
                new StackOverFlowException(ExceptionCode.ANSWER_NOT_FOUND));
    }
// My-Page구현시 사용할 것
//    public List<Answer> getAnswerListByMember(Member member) {
//        return answerRepository.findByMember(member);
//    }
}
