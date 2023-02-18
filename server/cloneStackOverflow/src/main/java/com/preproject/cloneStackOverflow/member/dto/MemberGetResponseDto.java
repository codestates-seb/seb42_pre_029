package com.preproject.cloneStackOverflow.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberGetResponseDto {
    private String email;
    private String username;
    private String birth;
    private String phone;
}
