package com.preproject.cloneStackOverflow.question.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class QuestionResponseDto {
    private long questionId;
    private String title;
    private String body;
}
