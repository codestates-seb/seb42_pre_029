package com.preproject.cloneStackOverflow.answer.mapper;

import com.preproject.cloneStackOverflow.answer.dto.AnswerDto;
import com.preproject.cloneStackOverflow.answer.entity.Answer;
import com.preproject.cloneStackOverflow.member.entity.Member;
import com.preproject.cloneStackOverflow.question.entity.Question;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;


@Mapper(componentModel = "spring")
public interface AnswerMapper {
    Answer answerPostToAnswer(AnswerDto.Post answerPostDto);
    Answer answerPatchToAnswer(AnswerDto.Patch requestBody);
    AnswerDto.PatchResponse answerToPatchResponse(Answer answer);
    AnswerDto.GetResponse answerToGetResponse(Answer answer);

}
