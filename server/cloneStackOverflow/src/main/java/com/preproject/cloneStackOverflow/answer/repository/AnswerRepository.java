package com.preproject.cloneStackOverflow.answer.repository;

import com.preproject.cloneStackOverflow.answer.dto.AnswerDto;
import com.preproject.cloneStackOverflow.answer.entity.Answer;
import com.preproject.cloneStackOverflow.member.entity.Member;
import com.preproject.cloneStackOverflow.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer,Long> {
    int countByAnswerIdIn(List<Long> answerIds);
    List<Answer> findByMember(Member member);

    List<Answer> findByQuestion(Question question);
}
