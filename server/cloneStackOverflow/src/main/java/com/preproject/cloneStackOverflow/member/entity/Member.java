package com.preproject.cloneStackOverflow.member.entity;

import com.preproject.cloneStackOverflow.answer.entity.Answer;
import com.preproject.cloneStackOverflow.exception.ExceptionCode;
import com.preproject.cloneStackOverflow.exception.StackOverFlowException;
import com.preproject.cloneStackOverflow.question.entity.Question;
import com.preproject.cloneStackOverflow.utils.CustomBeanUtils;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table()
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 10, nullable = false, unique = true)
    private String username;

    @Column(length = 10)
    private String birth;

    @Column(length = 13, unique = true)
    private String phone;

    @Setter(AccessLevel.NONE)
    @OneToMany(mappedBy = "member")
    private List<Question> Questions = new ArrayList<>();

    @Setter(AccessLevel.NONE)
    @OneToMany(mappedBy = "member")
    private List<Answer> Answers = new ArrayList<>();
//    public void setQuestion(Question Question) {
//        this.qnaQuestions.add(qnaQuestion);
//        if (qnaQuestion.getMember() != this) {
//            qnaQuestion.setMember(this);
//        }
//    }
    public Member changeMemberInfo(Member sourceMember, CustomBeanUtils<Member> customBeanUtils) {
        return customBeanUtils.copyNonNullProperties(sourceMember, this);
    }

    public static void checkNotFoundMember(Member member) {
        if (member == null) {
            throw new StackOverFlowException(ExceptionCode.MEMBER_NOT_FOUND);
        }
    }

    public static void checkExistEmail(Member targetMember) {
        if (targetMember != null) {
            throw new StackOverFlowException(ExceptionCode.MEMBER_EXISTS);
        }
    }

    public Member(String email, String password, String username) {
        this.email = email;
        this.password = password;
        this.username = username;
    }
}