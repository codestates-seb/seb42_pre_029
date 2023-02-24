package com.preproject.cloneStackOverflow.controllerTest;

import com.google.gson.Gson;
import com.preproject.cloneStackOverflow.answer.dto.AnswerDto;
import com.preproject.cloneStackOverflow.answer.entity.Answer;
import com.preproject.cloneStackOverflow.answer.mapper.AnswerMapper;
import com.preproject.cloneStackOverflow.answer.service.AnswerService;
import com.preproject.cloneStackOverflow.member.entity.Member;
import com.preproject.cloneStackOverflow.member.service.MemberService;
import com.preproject.cloneStackOverflow.question.entity.Question;
import com.preproject.cloneStackOverflow.question.service.QuestionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class AnswerControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private AnswerService answerService;

    @Autowired
    private AnswerMapper mapper;
    AnswerDto.Post post;
    Answer answer;
    Member member;
    Question question;

    @BeforeEach
    public void init() throws Exception{
        //given
        post = new AnswerDto.Post("포스트", 1L, 1L);

        this.answer = mapper.answerPostToAnswer(post);
        this.member = new Member("hgd1@gmail.com","12331241", "홍길동1");
        this.question = new Question("제목", "내용");
        member.setMemberId(1L);
        question.setQuestionId(1L);

        answer.setAnswerId(1L);
        answer.setMember(member);
        answer.setQuestion(question);
    }

    @Test
    void postAnswerTest() throws Exception {
        given(answerService.createAnswer(Mockito.any(Answer.class),Mockito.anyLong(),Mockito.anyLong())).willReturn(answer);

        String content = gson.toJson(post);

        //when
        ResultActions actions =
                mockMvc.perform(
                        post("/v1/answers")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );
        //then
        actions.andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/v1/answers"))));

    }
    @Test
    void patchAnswerTest() throws Exception {
        //given
        given(answerService.createAnswer(Mockito.any(Answer.class),Mockito.anyLong(),Mockito.anyLong())).willReturn(answer);
        String content1 = gson.toJson(post);
        ResultActions postActions =
                mockMvc.perform(
                        post("/v1/answers")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content1)
                );


        AnswerDto.Patch patchDto = new AnswerDto.Patch(1L, "수정할게 ~");

        AnswerDto.PatchResponse response = new AnswerDto.PatchResponse("수정할게 ~", LocalDateTime.now(),LocalDateTime.now());
        Answer patchAnswer = mapper.answerPatchToAnswer(patchDto);

        given(mapper.answerPatchToAnswer(Mockito.any(AnswerDto.Patch.class))).willReturn(answer);

        given(answerService.updateAnswer(Mockito.any(Answer.class))).willReturn(answer);

        given(mapper.answerToPatchResponse(Mockito.any(Answer.class))).willReturn(response);


        String content2 = gson.toJson(patchDto);

        //when
        ResultActions actions =
                mockMvc.perform(
                        patch("v1/answers/1")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content2)
                        );

        //then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("#.data.body").value(patchDto.getBody()));
    }

}
