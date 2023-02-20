package com.preproject.cloneStackOverflow.question.repository;

import com.preproject.cloneStackOverflow.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Optional<Question> findById(int id);
    int countByQuestionIdIn(List<Long> questionIds);
}
