package com.fotolog.server.controller;

import com.fotolog.server.model.Comment;
import com.fotolog.server.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(path = "/comments")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService){
        this.commentService = commentService;
    }

    @GetMapping("/comment/{id}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public Optional<Comment> getComment(@PathVariable("id") String commentId){
        return commentService.getComment(commentId);
    }

    @GetMapping("/{postId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public List<Comment> getCommentsForPost(@PathVariable("postId") String postId){
        return commentService.getCommentsForPost(postId);
    }

    @PostMapping("/{postId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public void saveComment(@PathVariable("postId") String postId,
                            @RequestParam("text") String text,
                            @RequestParam("userId") String userId){
        System.out.println("Comment: " + text);
        commentService.saveComment(postId, text, userId);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public void deleteComment(@PathVariable("id") String commentId){
        commentService.deleteComment(commentId);
    }
}
