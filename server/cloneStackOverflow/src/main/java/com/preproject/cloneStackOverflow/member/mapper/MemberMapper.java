package com.preproject.cloneStackOverflow.member.mapper;

import com.preproject.cloneStackOverflow.member.dto.MemberDto;
import com.preproject.cloneStackOverflow.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post requestBody);
    Member memberPatchDtoToMember(MemberDto.Patch requestBody);
    MemberDto.GetResponse memberToMemberGetResponse(Member member);
    MemberDto.PatchResponse memberToMemberPatchResponse(Member member);
}
