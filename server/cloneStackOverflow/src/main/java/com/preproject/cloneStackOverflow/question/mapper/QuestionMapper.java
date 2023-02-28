package com.preproject.cloneStackOverflow.question.mapper;

import com.preproject.cloneStackOverflow.question.dto.QuestionDto;
import com.preproject.cloneStackOverflow.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface QuestionMapper {
    Question questionPostDtoToQuestion(QuestionDto.Post requestBody);
    Question questionPatchDtoToQuestion(QuestionDto.Patch requestBody);
    QuestionDto.Response questionToQuestionResponseDto(Question question);
    List<QuestionDto.Response> questionsToQuestionResponseDtos(List<Question> questions);
}
