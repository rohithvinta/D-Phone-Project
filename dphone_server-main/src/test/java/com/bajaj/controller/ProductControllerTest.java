package com.bajaj.controller;

import com.bajaj.service.ProductService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductControllerTest {
    @MockBean
    private ProductService service;

    @Autowired
    private MockMvc mockMvc;
    @Test
    @DisplayName("GET /welcome success")
    void testGetWelcomeSuccess() throws Exception{
        mockMvc.perform(get("/test"))
                // Validate the response code and content type
                .andExpect(status().isOk());
    }

}
