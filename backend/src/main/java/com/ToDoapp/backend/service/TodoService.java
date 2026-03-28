package com.todoapp.backend.service;

import com.todoapp.backend.entity.Todo;
import com.todoapp.backend.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Todo getTodoById(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
    }

    public Todo createTodo(Todo todo) {
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