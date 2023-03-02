package com.preproject.cloneStackOverflow.member.repository;

import com.preproject.cloneStackOverflow.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByMemberId(long memberId);
    Optional<Member> findByEmail(String email);
}
