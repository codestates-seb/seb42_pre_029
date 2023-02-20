package com.preproject.cloneStackOverflow.question.service;

import com.preproject.cloneStackOverflow.exception.ExceptionCode;
import com.preproject.cloneStackOverflow.exception.StackOverFlowException;
import com.preproject.cloneStackOverflow.question.entity.Question;
import com.preproject.cloneStackOverflow.question.repository.QuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    public QuestionService(QuestionRepository questionRepository){
        this.questionRepository = questionRepository;
    }

    public Question createQuestion(Question question){
        verifyExistsId(question.getQuestionId());

        return questionRepository.save(question);
    }

    public Question updateQuestion(Question question){
        Question findQuestion = findVerifiedQuestion(question.getQuestionId());

        Optional.ofNullable(question.getTitle()).ifPresent(title-> findQuestion.setTitle(title));
        Optional.ofNullable(question.getBody()).ifPresent(body-> question.setBody(body));

        return questionRepository.save(findQuestion);
    }

    public Question findQuestion(long questionId){
        return findVerifiedQuestion(questionId);
    }

    public List<Question> findQuestions(){
        return (List<Question>) questionRepository.findAll();
    }

    public Question viewCount(long questionId){
        Question question = questionRepository.findById(questionId).get();
        question.viewCount(question.getView());
        return question;
    }

    public long questionCount(){
        long question = questionRepository.count();
        return question;
    }

    //public int answerCount(List<Long> question){
        //List<Long> answerIds = questions.stream().map(question -> question.getQuestionId()).collect(Collectors.toList());
        //return questionRepository.countByQuestionIdIn(answerIds);
    //}

        public void deleteQuestion(long questionId){
        Question findQuestion = findVerifiedQuestion(questionId);
        questionRepository.delete(findQuestion);
    }

    public Question findVerifiedQuestion(long questionId){
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question findQuestion = optionalQuestion.orElseThrow(()-> new StackOverFlowException(ExceptionCode.QUESTION_NOT_FOUND));
        return findQuestion;
    }

    private void verifyExistsId(long questionId) {
        Optional<Question> question = questionRepository.findById(questionId);
        if(question.isPresent()){
            throw new StackOverFlowException(ExceptionCode.QUESTION_EXISTS);
        }
    }
}
