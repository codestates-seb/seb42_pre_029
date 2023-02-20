package com.preproject.cloneStackOverflow.member.repository;


import com.preproject.cloneStackOverflow.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByMemberId(long memberId);
    Member findByEmail(String email);
}
