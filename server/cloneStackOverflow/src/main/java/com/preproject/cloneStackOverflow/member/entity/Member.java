package com.preproject.cloneStackOverflow.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.preproject.cloneStackOverflow.answer.entity.Answer;
import com.preproject.cloneStackOverflow.exception.ExceptionCode;
import com.preproject.cloneStackOverflow.exception.StackOverFlowException;
import com.preproject.cloneStackOverflow.question.entity.Question;
import com.preproject.cloneStackOverflow.utils.CustomBeanUtils;
import lombok.*;
import org.hibernate.annotations.BatchSize;

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

    @Column(length = 100, nullable = false, unique = true)
    private String username;

    @Column(length = 100)
    private String birth;

    @Column(length = 100, unique = true)
    private String phone;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public Member(String email) {
        this.email = email;
    }

    public Member(String email, String username, String password) {
        this.email = email;
        this.username= username;
        this.password = password;
    }

    public Member(String email, String password, String username, String birth, String phone) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.birth = birth;
        this.phone = phone;
    }

    @Setter(AccessLevel.NONE)
    @OneToMany(mappedBy = "member")
    private List<Question> Questions = new ArrayList<>();

    @Setter(AccessLevel.NONE)
    @BatchSize(size=10)
    @OneToMany(mappedBy = "member")
    private List<Answer> Answers = new ArrayList<>();

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

    public enum MemberRole {
        ROLE_USER,
        ROLE_ADMIN
    }

}