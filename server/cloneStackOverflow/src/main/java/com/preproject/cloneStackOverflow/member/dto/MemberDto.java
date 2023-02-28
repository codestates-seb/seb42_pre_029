package com.preproject.cloneStackOverflow.member.dto;

import com.preproject.cloneStackOverflow.validator.NotSpace;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class MemberDto {
    @Getter
    @Setter
    public static class Post {
        @NotBlank
        @Email
        private String email;

        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,20}$",
                message = "비밀번호는 영문과 특수문자 숫자를 포함하며 8자 이상이어야 합니다.")
        private String password;

        @NotBlank(message = "이름은 공백이 아니어야 합니다.")
        private String username;
    }
    public static class login {
        @Email
        private String email;
        @NotBlank
        private String password;
    }

    @Getter
    @Setter
    public static class signup{
        @Email
        private String email;

        private String username;

        private String password;

    }
    @Getter
    @AllArgsConstructor
    public static class Patch {

        private long memberId;

        @NotBlank
        @Email
        private String email;

        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,20}$",
                message = "비밀번호는 영문과 특수문자 숫자를 포함하며 8자 이상이어야 합니다.")
        private String password;

        @NotSpace
        private String username;

        @Pattern(regexp = "^(19[0-9][0-9]|20\\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$",
                message = "예시)96년 2월 13일생은 19960213, 공백은 없어야 합니다.")
        private String birth;

        @Pattern(regexp = "^010\\d{3,4}\\d{4}$",
                message = "휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다")
        private String phone;

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }

    }
    @Getter
    @AllArgsConstructor
    public static class GetResponse{
        private String email;
        private String username;
        private String birth;
        private String phone;
    }
    @Getter
    @AllArgsConstructor
    public static class PatchResponse{
        private String email;
        private String password;
        private String username;
        private String birth;
        private String phone;
    }

}
