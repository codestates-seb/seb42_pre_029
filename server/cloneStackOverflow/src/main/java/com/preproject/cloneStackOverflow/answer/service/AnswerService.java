package com.preproject.cloneStackOverflow.answer.service;

import com.preproject.cloneStackOverflow.answer.dto.AnswerDto;
import com.preproject.cloneStackOverflow.answer.entity.Answer;
import com.preproject.cloneStackOverflow.answer.mapper.AnswerMapper;
import com.preproject.cloneStackOverflow.exception.ExceptionCode;
import com.preproject.cloneStackOverflow.exception.StackOverFlowException;
import com.preproject.cloneStackOverflow.answer.repository.AnswerRepository;
import com.preproject.cloneStackOverflow.member.entity.Member;
import com.preproject.cloneStackOverflow.member.service.MemberService;
import com.preproject.cloneStackOverflow.question.entity.Question;
import com.preproject.cloneStackOverflow.question.service.QuestionService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public Answer createAnswer(AnswerDto.Post answerPost){
        Question findQuestion = questionService.findVerifiedQuestion(answerPost.getQuestionId());
        Member findMember = memberService.findVerifiedMember(answerPost.getMemberId());

        Answer answer = mapper.answerPostToAnswer(answerPost);
        answer.setMember(findMember);
        answer.setQuestion(findQuestion);

        return answerRepository.save(answer);
    }

    public Answer getAnswer(long answerId){
        Answer answer = new Answer();
        answer.setAnswerId(answerId);
        return findVerifyAnswer(answer.getAnswerId());
    }

    public List<Answer> findMemberAnswers(long memberId){
        Member findMember = memberService.findVerifiedMember(memberId);

        return answerRepository.findByMemberId(findMember.getMemberId());
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

    public int findAnswerCount(List<Answer> answers){
        List<Long> answerIds = answers.stream().map(answer -> answer.getAnswerId()).collect(Collectors.toList());

        return answerRepository.countByAnswerIdIn(answerIds);
    }
}
