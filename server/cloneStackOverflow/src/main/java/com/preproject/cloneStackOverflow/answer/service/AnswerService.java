package com.preproject.cloneStackOverflow.answer.service;

import com.preproject.cloneStackOverflow.answer.entity.Answer;
import com.preproject.cloneStackOverflow.exception.ExceptionCode;
import com.preproject.cloneStackOverflow.exception.StackOverFlowException;
import com.preproject.cloneStackOverflow.answer.repository.AnswerRepository;
import com.preproject.cloneStackOverflow.member.service.MemberService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final MemberService memberService;

    public AnswerService(AnswerRepository answerRepository, MemberService memberService) {
        this.answerRepository = answerRepository;
        this.memberService = memberService;
    }

    public Answer createAnswer(Answer answer){
        Answer savedAnswer = answerRepository.save(answer);
        return savedAnswer;
    }

    private Answer findVerifyAnswer(Answer answer){
        Optional<Answer> optionalAnswer = answerRepository.findById(answer.getAnswerId());
        return optionalAnswer.orElseThrow(() ->
                new StackOverFlowException(ExceptionCode.ANSWER_NOT_FOUND));

    }
}
