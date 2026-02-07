// src/main/java/com/quizlly/backend/service/UserService.java
package com.quizlly.backend.service;

import com.quizlly.backend.entity.User;
import com.quizlly.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public User getCurrentUser() {
        return userRepository.findById(1L)
                .orElseGet(this::createDefaultUser);
    }
    
    private User createDefaultUser() {
        User defaultUser = new User();
        defaultUser.setUsername("demo_user");
        defaultUser.setEmail("demo@quizlly.com");
        defaultUser.setPassword("demo123");
        
        return userRepository.save(defaultUser);
    }
    
    public Long getCurrentUserId() {
        return getCurrentUser().getId();
    }
}