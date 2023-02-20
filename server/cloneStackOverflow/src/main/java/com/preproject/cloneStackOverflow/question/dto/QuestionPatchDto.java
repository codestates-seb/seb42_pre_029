package com.preproject.cloneStackOverflow.question.dto;

import lombok.Getter;

@Getter
public class QuestionPatchDto {
    private long questionId;
    private String title;
    private String body;
}
