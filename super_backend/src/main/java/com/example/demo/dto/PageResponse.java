package com.example.demo.dto;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
//needed custom for openapi annotations
@Schema(description = "generic Paginated Response via spring data interface Page")
public class PageResponse<T> {
    @ArraySchema(schema = @Schema(description = "List of items", implementation = Object.class))
    private List<T> content;

    @Schema(description = "Current page number", example = "0")
    private int number;

    @Schema(description = "Number of elements per page", example = "10")
    private int size;

    @Schema(description = "Total elements in all pages", example = "100")
    private long totalElements;

    @Schema(description = "Total pages", example = "10")
    private int totalPages;
}
