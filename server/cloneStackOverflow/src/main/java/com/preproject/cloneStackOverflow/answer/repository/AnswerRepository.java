package com.preproject.cloneStackOverflow.answer.repository;

import com.preproject.cloneStackOverflow.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer,Long> {
}
