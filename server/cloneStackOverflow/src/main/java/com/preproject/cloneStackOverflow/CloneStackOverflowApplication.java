package com.preproject.cloneStackOverflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CloneStackOverflowApplication {

	public static void main(String[] args) {
		SpringApplication.run(CloneStackOverflowApplication.class, args);
	}

}
