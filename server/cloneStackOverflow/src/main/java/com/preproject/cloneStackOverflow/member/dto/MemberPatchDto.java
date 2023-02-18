package com.preproject.cloneStackOverflow.member.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import com.preproject.cloneStackOverflow.validator.NotSpace;

@Getter
@Setter
public class MemberPatchDto {

    private long memberId;
    @Email
    private String email;
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,20}$",
            message = "비밀번호는 영문과 특수문자 숫자를 포함하며 8자 이상이어야 합니다.")
    private String password;

    @NotSpace(message = "회원 이름은 공백이 아니어야 합니다")
    private String username;

    @Pattern(regexp = "^((19|20)\\\\d\\\\d)?([-/.])?(0[1-9]|1[012])([-/.])?(0[1-9]|[12][0-9]|3[01])$")
    private String birth;

    @NotSpace(message = "휴대폰 번호는 공백이 아니어야 합니다")
    @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$",
            message = "휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다")
    private String phone;

}
