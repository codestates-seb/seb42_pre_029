package com.preproject.cloneStackOverflow.answer.repository;

import com.preproject.cloneStackOverflow.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer,Long> {
   //추가
    int countByAnswerIdIn(List<Long> answerIds);
}
