package com.preproject.cloneStackOverflow.question.entity;

import com.preproject.cloneStackOverflow.answer.entity.Answer;
import com.preproject.cloneStackOverflow.audit.Auditable;
import com.preproject.cloneStackOverflow.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.persistence.GenerationType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long questionId;
    @NotBlank(message = "제목을 입력해주세요.")
    private String title;
    @NotBlank(message = "내용을 작성해주세요.")
    private String body;
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    @OneToMany(mappedBy = "question")
    @JoinColumn(name = "ANSWER_ID")
    private Answer answer;
    @NotNull
    @JoinColumn(name = "VIEW_COUNT")
    private long view = 1;
    @NotNull
    @JoinColumn(name = "QUESTION_COUNT")
    private long questionCount = 1;
    @NotNull
    @JoinColumn(name = "ANSWER_COUNT")
    private long answerCount = 0;

    public Question(String title){
        this.title = title;
    }
    public Question(String title, String body){
        this.title = title;
        this.body = body;
    }
    public Question viewCount(long view){
        this.view = view + 1;
        return this;
    }

    public Question questionCount(long questionCount){
        this.questionCount = questionCount;
        return this;
    }

    public Question answerCount(int answerCount){
        this.answerCount = answerCount;
        return this;
    }

}
