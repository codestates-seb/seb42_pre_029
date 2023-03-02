package com.preproject.cloneStackOverflow.answer.mapper;

import com.preproject.cloneStackOverflow.answer.dto.AnswerDto;
import com.preproject.cloneStackOverflow.answer.entity.Answer;
import com.preproject.cloneStackOverflow.member.entity.Member;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-02T08:30:36+0000",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.jar, environment: Java 11.0.18 (Ubuntu)"
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

        String username = null;
        long answerId = 0L;
        String body = null;
        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;

        username = answerMemberUsername( answer );
        if ( answer.getAnswerId() != null ) {
            answerId = answer.getAnswerId();
        }
        body = answer.getBody();
        createdAt = answer.getCreatedAt();
        modifiedAt = answer.getModifiedAt();

        AnswerDto.GetResponse getResponse = new AnswerDto.GetResponse( answerId, body, username, createdAt, modifiedAt );

        return getResponse;
    }

    @Override
    public AnswerDto.PostResponse answerToPostResponse(Answer answer) {
        if ( answer == null ) {
            return null;
        }

        long answerId = 0L;
        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;

        if ( answer.getAnswerId() != null ) {
            answerId = answer.getAnswerId();
        }
        createdAt = answer.getCreatedAt();
        modifiedAt = answer.getModifiedAt();

        AnswerDto.PostResponse postResponse = new AnswerDto.PostResponse( answerId, createdAt, modifiedAt );

        return postResponse;
    }

    @Override
    public List<AnswerDto.GetResponse> answersToGetResponseAll(List<Answer> answers) {
        if ( answers == null ) {
            return null;
        }

        List<AnswerDto.GetResponse> list = new ArrayList<AnswerDto.GetResponse>( answers.size() );
        for ( Answer answer : answers ) {
            list.add( answerToGetResponse( answer ) );
        }

        return list;
    }

    private String answerMemberUsername(Answer answer) {
        if ( answer == null ) {
            return null;
        }
        Member member = answer.getMember();
        if ( member == null ) {
            return null;
        }
        String username = member.getUsername();
        if ( username == null ) {
            return null;
        }
        return username;
    }
}
