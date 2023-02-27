package com.preproject.cloneStackOverflow.answer.mapper;

import com.preproject.cloneStackOverflow.answer.dto.AnswerDto;
import com.preproject.cloneStackOverflow.answer.entity.Answer;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-02-27T07:26:47+0000",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.jar, environment: Java 11.0.17 (Ubuntu)"
)
@Component
public class AnswerMapperImpl implements AnswerMapper {

    @Override
    public Answer answerPostToAnswer(AnswerDto.Post answerPostDto) {
        if ( answerPostDto == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setBody( answerPostDto.getBody() );

        return answer;
    }

    @Override
    public Answer answerPatchToAnswer(AnswerDto.Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setAnswerId( requestBody.getAnswerId() );
        answer.setBody( requestBody.getBody() );

        return answer;
    }

    @Override
    public AnswerDto.PatchResponse answerToPatchResponse(Answer answer) {
        if ( answer == null ) {
            return null;
        }

        String body = null;
        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;

        body = answer.getBody();
        createdAt = answer.getCreatedAt();
        modifiedAt = answer.getModifiedAt();

        AnswerDto.PatchResponse patchResponse = new AnswerDto.PatchResponse( body, createdAt, modifiedAt );

        return patchResponse;
    }

    @Override
    public AnswerDto.GetResponse answerToGetResponse(Answer answer) {
        if ( answer == null ) {
            return null;
        }

        String body = null;
        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;

        body = answer.getBody();
        createdAt = answer.getCreatedAt();
        modifiedAt = answer.getModifiedAt();

        AnswerDto.GetResponse getResponse = new AnswerDto.GetResponse( body, createdAt, modifiedAt );

        return getResponse;
    }
}
