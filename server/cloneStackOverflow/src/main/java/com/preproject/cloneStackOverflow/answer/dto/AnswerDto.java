package com.preproject.cloneStackOverflow.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

public class AnswerDto {

    @Getter
    @AllArgsConstructor
    public static class Post{
        @NotNull
        private String body;
        @NotNull
        private Long questionId;
        @NotNull
        private Long memberId;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch{
        @NotNull
        private String body;
    }

    @Getter
    @AllArgsConstructor
    public static class PatchResponse {
        @NotNull
        private String body;
        @NotNull
        private LocalDateTime modifiedAt;

    }
    @Getter
    @AllArgsConstructor
    public static class GetResponse {
        String body;
    }

    @Getter
    @AllArgsConstructor
    public static class GetResponseAll{
        List<String> body;
    }

}