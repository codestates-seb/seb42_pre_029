package com.preproject.cloneStackOverflow.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class AnswerDto {

    @Getter
    @AllArgsConstructor
    public static class Post{
        @NotNull
        private String body;
        @NotNull
        @Positive
        private Long questionId;
        @NotNull
        @Positive
        private Long memberId;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch{
        @NotNull
        private long answerId;
        @NotNull
        private String body;

        public void setAnswerId(long answerId){
            this.answerId = answerId;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class PatchResponse {
        @NotNull
        private String body;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

    }
    @Getter
    @AllArgsConstructor
    public static class GetResponse {
        private long answerId;
        @NotNull
        String body;
        private String username;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

    }

    @Getter
    @AllArgsConstructor
    public static class PostResponse {
        private long answerId;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }


}
