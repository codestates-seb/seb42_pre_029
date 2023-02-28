package com.preproject.cloneStackOverflow.question.repository;

import com.preproject.cloneStackOverflow.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Optional<Question> findById(long questionId);
}
