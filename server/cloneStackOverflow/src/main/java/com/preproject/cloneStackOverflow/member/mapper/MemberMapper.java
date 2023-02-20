package com.preproject.cloneStackOverflow.member.mapper;

import com.preproject.cloneStackOverflow.member.dto.MemberDto;
import com.preproject.cloneStackOverflow.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post requestBody);
    Member memberPatchDtoToMember(MemberDto.Patch requestBody);
    MemberDto.GetResponse memberToMemberGetResponseDto(Member member);
    List<MemberDto.GetResponse> membersToMemberGetResponseDtos(List<Member> members);
    //MemberDto.PatchResponse memberToMemberPatchResponseDto(Member member);
}
