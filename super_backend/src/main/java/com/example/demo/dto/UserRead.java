package com.example.demo.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
@Builder
@Data
@AllArgsConstructor
@Schema(description = "User response dto for read operations")
public class UserRead {
    @Schema(description = "user full name", example ="blues clue")
    final String name;
    @Schema(description = "user's email, unique values in db", example = "wejustgotaletter@bluesclue.org")
    final String email;
    @Schema(description = "user's username, unique values in db", example = "bluesclue")
    final String username;
}
