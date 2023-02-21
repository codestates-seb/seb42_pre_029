package com.preproject.cloneStackOverflow.question.repository;

import com.preproject.cloneStackOverflow.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Optional<Question> findById(long questionId);
    int countByQuestionIdIn(List<Long> answerIds);
}
