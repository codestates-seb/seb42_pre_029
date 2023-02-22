package com.preproject.cloneStackOverflow.question.entity;

import com.preproject.cloneStackOverflow.answer.entity.Answer;
import com.preproject.cloneStackOverflow.audit.Auditable;
import com.preproject.cloneStackOverflow.member.entity.Member;
import com.preproject.cloneStackOverflow.utils.CustomBeanUtils;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.query.internal.QueryImpl;

import javax.persistence.*;
import javax.persistence.GenerationType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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
    @Column(length = 1000, nullable = false)
    private String body;
    //@Setter
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
    public void setMember(Member memeber){
        this.member = memeber;
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

}
