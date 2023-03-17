package com.fotolog.server.repo;

import com.fotolog.server.model.AppUser;
import com.fotolog.server.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;
@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    // Gets like count for a post
    Long countLikesByPostId(String postId);

    List<Like> findAllByPostId(String postId);
    Like findByPostIdAndUserId(String postId, Long userId);

    boolean existsByPostIdAndUserId(String postId, Long userId);

    void deleteLikeById(Long likeId);
}
