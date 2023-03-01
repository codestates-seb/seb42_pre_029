package com.preproject.cloneStackOverflow.answer.mapper;

import com.preproject.cloneStackOverflow.answer.dto.AnswerDto;
import com.preproject.cloneStackOverflow.answer.entity.Answer;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    Answer answerPostToAnswer(AnswerDto.Post answerPostDto);
    Answer answerPatchToAnswer(AnswerDto.Patch requestBody);
    AnswerDto.PatchResponse answerToPatchResponse(Answer answer);
    @Mapping(source = "member.username", target = "username")
    AnswerDto.GetResponse answerToGetResponse(Answer answer);

}
