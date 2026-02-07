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
        // For MVP: Return a default user or create one if doesn't exist
        return userRepository.findById(1L)
                .orElseGet(() -> createDefaultUser());
    }
    
    private User createDefaultUser() {
        User defaultUser = User.builder()
                .username("demo_user")
                .email("demo@quizlly.com")
                
                .build();
        return userRepository.save(defaultUser);
    }
    
    public Long getCurrentUserId() {
        return getCurrentUser().getId();
    }
}