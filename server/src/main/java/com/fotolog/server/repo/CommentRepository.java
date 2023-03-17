package com.fotolog.server.repo;

import com.fotolog.server.model.Comment;
import com.fotolog.server.model.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByPostId(String postId);
}
