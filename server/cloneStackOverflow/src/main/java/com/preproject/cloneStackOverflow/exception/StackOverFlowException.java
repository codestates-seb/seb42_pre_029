package com.preproject.cloneStackOverflow.exception;

import lombok.Getter;

public class StackOverFlowException extends RuntimeException {
    @Getter
    private ExceptionCode exceptionCode;

    public StackOverFlowException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
