package com.fotolog.server.repo;

import com.fotolog.server.model.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    Long countFollowByUserId(Long userId);

    Long countFollowsByFollowerId(Long userId);

    List<Follow> getFollowsByUserId(Long userId);

    List<Follow> getFollowsByFollowerId(Long userId);

    Follow getFollowByUserIdAndFollowerId(Long userId, Long followerId);
}
