package com.preproject.cloneStackOverflow.answer.mapper;

import com.preproject.cloneStackOverflow.answer.dto.AnswerDto;
import com.preproject.cloneStackOverflow.answer.entity.Answer;
import com.preproject.cloneStackOverflow.member.entity.Member;
import com.preproject.cloneStackOverflow.question.entity.Question;
import org.mapstruct.Mapper;



@Mapper(componentModel = "spring")
public interface AnswerMapper {
    default Answer answerPostToAnswer(AnswerDto.Post answerPostDto){
        Answer answer = new Answer();
        Member member = new Member();
        Question question = new Question();
        member.setMemberId(answerPostDto.getMemberId());
        question.setQuestionId(answerPostDto.getQuestionId());


        answer.addMember(member);
        answer.addQuestion(question);
        answer.setBody(answerPostDto.getBody());
        return answer;
    }
    Answer answerPatchToAnswer(AnswerDto.Patch requestBody);
    AnswerDto.PatchResponse answerToPatchResponse(Answer answer);
    AnswerDto.GetResponse answerToGetResponse(Answer answer);
}
