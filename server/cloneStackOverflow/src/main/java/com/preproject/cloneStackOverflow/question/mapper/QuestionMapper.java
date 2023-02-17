package com.preproject.cloneStackOverflow.question.mapper;

import com.preproject.cloneStackOverflow.question.dto.QuestionPatchDto;
import com.preproject.cloneStackOverflow.question.dto.QuestionPostDto;
import com.preproject.cloneStackOverflow.question.dto.QuestionResponseDto;
import com.preproject.cloneStackOverflow.question.entity.Question;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question questionPostDtoToQuestion(QuestionPostDto questionPostDto);
    Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto);
    QuestionResponseDto questionToQuestionResponseDto(Question question);
}
