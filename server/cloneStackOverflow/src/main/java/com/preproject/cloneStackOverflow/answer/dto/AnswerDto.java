package com.preproject.cloneStackOverflow.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
        @NotNull
        private LocalDateTime modifiedAt;

    }
    @Getter
    @AllArgsConstructor
    public static class GetResponse {
        String body;
    }


}
