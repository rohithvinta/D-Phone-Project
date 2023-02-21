package com.bajaj.controller;

import com.bajaj.config.UserInfoUserDetails;
import com.bajaj.config.UserInfoUserDetailsService;
import com.bajaj.entity.UserEntity;
import com.bajaj.filter.JwtAuthFilter;
import com.bajaj.service.JwtService;
import com.bajaj.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    UserService userService;
    @MockBean
    private UserInfoUserDetailsService userDetailsService;
    @Autowired
    private JwtAuthFilter filter;
    @Autowired
    private JwtService tokenHelper;
    private  String token;

    @Test
    @DisplayName("POST /login success")
    void testLoginWorking() throws Exception{
        // Setup our mocked service
        UserEntity widgetToPost = new UserEntity(0,"Deep","Deep@gmail.com","MithiJai@852","USER","9999",0,"1234567890",null);
        mockMvc.perform(post("/new")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(widgetToPost)))
                // Validate the response code and content type
                .andExpect(status().isOk());
    }

    static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    @Test
    @DisplayName("GET /allusers")
    void testAllUsersData() throws Exception{
        mockMvc.perform(get("/allusers")).andExpect(status().is4xxClientError());
    }
    @BeforeEach
    public void setup() {
        // Setup our mocked service
        List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList("USER");
        UserEntity widgetToPost = new UserEntity(0,"Deep","Deep@gmail.com","MithiJai@852","USER","9999",0,"1234567890",null);
        Mockito.when(userDetailsService.loadUserByUsername(Mockito.anyString())).thenReturn(new UserInfoUserDetails(widgetToPost));
        token = tokenHelper.generateToken("test-user");
    }
    @Test
    public void loginForbiddenTestSuccess() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.get("/products/all").header("AUTHORIZATION","Bearer "+token).contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)).andExpect(MockMvcResultMatchers.status().isForbidden());
    }
}
