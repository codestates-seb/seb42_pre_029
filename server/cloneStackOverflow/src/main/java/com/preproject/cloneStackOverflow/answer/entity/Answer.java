package com.preproject.cloneStackOverflow.answer.entity;

import com.preproject.cloneStackOverflow.audit.Auditable;
import com.preproject.cloneStackOverflow.exception.ExceptionCode;
import com.preproject.cloneStackOverflow.exception.StackOverFlowException;
import com.preproject.cloneStackOverflow.member.entity.Member;
import com.preproject.cloneStackOverflow.question.entity.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Answer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column(nullable = false, length = 2000)
    private String body;

    @ManyToOne
    @JoinColumn(name ="MEMBER_ID")
    private Member member;

    @ManyToOne()
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    public Answer(String body) {
        this.body = body;
    }

    public void addMember(Member member){
        this.member = member;
        if(!member.getAnswers().contains(this)){
            member.getAnswers().add(this);
        }
    }

    public void addQuestion(Question question) {
        this.question = question;
        if(!member.getAnswers().contains(this)){
            member.getAnswers().add(this);
        }
    }

    public static void checkNotFoundAnswers(int sourceAnswerCount, int targetAnswerCount) {
        if (sourceAnswerCount != targetAnswerCount) {
            throw new StackOverFlowException(ExceptionCode.ANSWER_NOT_FOUND);
        }
    }

}