package com.preproject.cloneStackOverflow.helper.event;

import com.preproject.cloneStackOverflow.member.entity.Member;
import lombok.Getter;

@Getter
public class MemberRegistrationApplicationEvent {
    private Member member;
    public MemberRegistrationApplicationEvent(Member member) {
        this.member = member;
    }
}