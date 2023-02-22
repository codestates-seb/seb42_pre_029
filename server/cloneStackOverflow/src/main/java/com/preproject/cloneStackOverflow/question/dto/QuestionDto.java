package com.preproject.cloneStackOverflow.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.util.Assert;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

public class QuestionDto {
    @Getter
    public static class Post {
        @Positive // 임시로 memberId고정(로그인 후 가정)
        private long memberId = 1;
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
            Assert.notNull(questionId, "order id must not be null.");
            this.questionId = questionId;

            return this;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long questionId;
        private long memberId;
        private long answerId;
        private String title;
        private String body;
        private int view;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private int answerCount;
    }
}
