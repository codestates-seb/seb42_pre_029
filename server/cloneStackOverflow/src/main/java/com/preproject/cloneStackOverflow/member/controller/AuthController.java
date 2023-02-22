package com.preproject.cloneStackOverflow.member.controller;

import com.preproject.cloneStackOverflow.member.dto.MemberDto;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;

@Controller
@RequestMapping("/auths")
public class AuthController {
    @GetMapping("/login")
    public String loginForm() {
        return "login";
    }

    @GetMapping("/access-denied")
    public String accessDenied() {
        return "access-denied";
    }

    @PostMapping("/login")
    public String login() {
        System.out.println("Login successfully!");
        return "home";
    }
}
    //    @GetMapping("/login")
//    public ModelAndView loginForm(){
//        ModelAndView mav = new ModelAndView("login");
//        System.out.println("Member Login Successful");
//        return mav;
//    }
//    @PostMapping("/login")
//    public ModelAndView login(@Valid MemberDto.login requestBody){
//        ModelAndView mav = new ModelAndView("save");
//        System.out.println("Member Registration Successfully");
//        return mav;
//    }

