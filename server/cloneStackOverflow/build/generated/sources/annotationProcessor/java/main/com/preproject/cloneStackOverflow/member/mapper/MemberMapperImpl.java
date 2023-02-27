package com.preproject.cloneStackOverflow.member.mapper;

import com.preproject.cloneStackOverflow.member.dto.MemberDto;
import com.preproject.cloneStackOverflow.member.entity.Member;
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
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberPostToMember(MemberDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member member = new Member();

        member.setEmail( requestBody.getEmail() );
        member.setPassword( requestBody.getPassword() );
        member.setUsername( requestBody.getUsername() );

        return member;
    }

    @Override
    public Member memberPatchDtoToMember(MemberDto.Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member member = new Member();

        member.setMemberId( requestBody.getMemberId() );
        member.setEmail( requestBody.getEmail() );
        member.setPassword( requestBody.getPassword() );
        member.setUsername( requestBody.getUsername() );
        member.setBirth( requestBody.getBirth() );
        member.setPhone( requestBody.getPhone() );

        return member;
    }

    @Override
    public MemberDto.GetResponse memberToMemberGetResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }

        String email = null;
        String username = null;
        String birth = null;
        String phone = null;

        email = member.getEmail();
        username = member.getUsername();
        birth = member.getBirth();
        phone = member.getPhone();

        MemberDto.GetResponse getResponse = new MemberDto.GetResponse( email, username, birth, phone );

        return getResponse;
    }

    @Override
    public List<MemberDto.GetResponse> membersToMemberGetResponseDtos(List<Member> members) {
        if ( members == null ) {
            return null;
        }

        List<MemberDto.GetResponse> list = new ArrayList<MemberDto.GetResponse>( members.size() );
        for ( Member member : members ) {
            list.add( memberToMemberGetResponseDto( member ) );
        }

        return list;
    }
}
