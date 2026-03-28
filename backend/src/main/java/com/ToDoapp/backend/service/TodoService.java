package com.todoapp.backend.service;

import com.todoapp.backend.entity.Todo;
import com.todoapp.backend.entity.User;
import com.todoapp.backend.repository.TodoRepository;
import com.todoapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<Todo> getAllTodos() {
        return todoRepository.findByUser(getCurrentUser());
    }

    public Todo getTodoById(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));

        if (!todo.getUser().getId().equals(getCurrentUser().getId())) {
            throw new RuntimeException("Access denied");
        }
        return todo;
    }

    public Todo createTodo(Todo todo) {
        todo.setUser(getCurrentUser());
        return todoRepository.save(todo);
    }

    public Todo updateTodo(Long id, Todo updatedTodo) {
        Todo existing = getTodoById(id);
        existing.setTitle(updatedTodo.getTitle());
        existing.setDescription(updatedTodo.getDescription());
        existing.setCompleted(updatedTodo.isCompleted());
        return todoRepository.save(existing);
    }

    public void deleteTodo(Long id) {
        Todo existing = getTodoById(id);
        todoRepository.delete(existing);
    }
}