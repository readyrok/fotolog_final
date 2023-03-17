package com.fotolog.server.controller;

import com.fotolog.server.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(path = "/likes")
public class LikeController {
    private final LikeService likeService;

    @Autowired
    public LikeController(LikeService likeService){
        this.likeService = likeService;
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public Long countLikesByPostId(@PathVariable("id") String id){
        return likeService.countLikesByPostId(id);
    }

    @GetMapping("/{postId}/{userId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public boolean isPostLiked(@PathVariable("postId")String postId, @PathVariable("userId") String userId){
        return likeService.isPostLiked(postId, userId);
    }

    @PostMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public void savePostLike(@PathVariable("id") String id){
        likeService.addPostLike(id);
    }

    @DeleteMapping("/{postId}/{userId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public void deletePostLike(@PathVariable("postId") String postId, @PathVariable("userId") String userId){
        likeService.deletePostLike(postId, userId);
    }
}
