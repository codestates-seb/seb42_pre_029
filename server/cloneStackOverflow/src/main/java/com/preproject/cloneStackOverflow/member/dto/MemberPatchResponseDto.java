package com.preproject.cloneStackOverflow.member.dto;

import lombok.Getter;

@Getter
public class MemberPatchResponseDto {
    private String email;
    private String password;
    private String username;
    private String birth;
    private String phone;
}
