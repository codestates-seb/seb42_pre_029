package com.preproject.cloneStackOverflow.question.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.preproject.cloneStackOverflow.answer.entity.Answer;
import com.preproject.cloneStackOverflow.audit.Auditable;
import com.preproject.cloneStackOverflow.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.persistence.GenerationType;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long questionId;
    @NotBlank(message = "Insert Subject.")
    @Column(length = 1000, nullable = false)
    private String title;
    @NotBlank(message = "Insert Text.")
    @Column(length = 100000, nullable = false)
    private String body;
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @JoinColumn(name = "VIEW_COUNT")
    @Column(columnDefinition = "Integer default 0", nullable = false)
    private int view;

    @JoinColumn(name = "QUESTION_COUNT")
    @Column(columnDefinition = "Integer default 1", nullable = false)
    private long questionCount;

    @JoinColumn(name = "ANSWER_COUNT")
    @Column(columnDefinition = "Integer default 0", nullable = false)
    private long answerCount;

    @Setter
    @OneToMany(mappedBy = "question", cascade = CascadeType.PERSIST)
    private List<Answer> answers;

    public Question(Long questionId){
        this.questionId = questionId;
    }
    public void setMember(Member member){
        this.member = member;
        if(!this.member.getQuestions().contains(this)){
            this.member.getQuestions().add(this);
        }
    }

    public Question questionCount(long questionCount){
        this.questionCount = questionCount;
        return this;
    }

    public Question answerCount(int answerCount){
        this.answerCount = answerCount;
        return this;
    }

    public Question(String title, String body) {
        this.title = title;
        this.body = body;
    }
}
