package com.preproject.cloneStackOverflow.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.util.Assert;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class QuestionDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @Positive
        private long memberId;
        @NotNull
        private String title;
        @NotNull
        private String body;
    }

    @Getter
    public static class Patch {
        private long questionId;
        private String title;
        private String body;
        public Patch addQuestionId(Long questionId) {
            Assert.notNull(questionId, "question id must not be null.");
            this.questionId = questionId;

            return this;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long questionId;
        private long memberId;
        private String title;
        private String body;
        private int view;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private int answerCount;
    }
}
