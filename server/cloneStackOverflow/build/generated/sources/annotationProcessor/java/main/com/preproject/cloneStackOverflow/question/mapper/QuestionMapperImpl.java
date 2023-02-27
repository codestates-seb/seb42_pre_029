package com.preproject.cloneStackOverflow.question.mapper;

import com.preproject.cloneStackOverflow.question.dto.QuestionDto;
import com.preproject.cloneStackOverflow.question.entity.Question;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-02-27T07:26:46+0000",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.jar, environment: Java 11.0.17 (Ubuntu)"
)
@Component
public class QuestionMapperImpl implements QuestionMapper {

    @Override
    public Question questionPostDtoToQuestion(QuestionDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Question question = new Question();

        question.setTitle( requestBody.getTitle() );
        question.setBody( requestBody.getBody() );

        return question;
    }

    @Override
    public Question questionPatchDtoToQuestion(QuestionDto.Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Question question = new Question();

        question.setQuestionId( requestBody.getQuestionId() );
        question.setTitle( requestBody.getTitle() );
        question.setBody( requestBody.getBody() );

        return question;
    }

    @Override
    public QuestionDto.Response questionToQuestionResponseDto(Question question) {
        if ( question == null ) {
            return null;
        }

        long questionId = 0L;
        String title = null;
        String body = null;
        int view = 0;
        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;
        int answerCount = 0;

        questionId = question.getQuestionId();
        title = question.getTitle();
        body = question.getBody();
        view = question.getView();
        createdAt = question.getCreatedAt();
        modifiedAt = question.getModifiedAt();
        answerCount = (int) question.getAnswerCount();

        QuestionDto.Response response = new QuestionDto.Response( questionId, title, body, view, createdAt, modifiedAt, answerCount );

        return response;
    }

    @Override
    public List<QuestionDto.Response> questionsToQuestionResponseDtos(List<Question> questions) {
        if ( questions == null ) {
            return null;
        }

        List<QuestionDto.Response> list = new ArrayList<QuestionDto.Response>( questions.size() );
        for ( Question question : questions ) {
            list.add( questionToQuestionResponseDto( question ) );
        }

        return list;
    }
}
