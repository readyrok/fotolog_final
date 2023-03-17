package com.fotolog.server.service;

import com.fotolog.server.model.AppUser;
import com.fotolog.server.model.Comment;
import com.fotolog.server.model.FileEntity;
import com.fotolog.server.repo.AppUserRepository;
import com.fotolog.server.repo.CommentRepository;
import com.fotolog.server.repo.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final FileRepository fileRepository;
    private final AppUserRepository appUserRepository;
    @Autowired
    public CommentService(CommentRepository commentRepository, FileRepository fileRepository, AppUserRepository appUserRepository){
        this.commentRepository = commentRepository;
        this.fileRepository = fileRepository;
        this.appUserRepository = appUserRepository;
    }

    public Optional<Comment> getComment(String commentId){
        Long id = Long.parseLong(commentId);
        return Optional.of(commentRepository.findById(id).get());
    }

    public List<Comment> getCommentsForPost(String postId){


        return commentRepository.findAllByPostId(postId);
    }

    public void saveComment(String postId, String text, String userId){
        Long id = Long.parseLong(userId);
        AppUser user = appUserRepository.getById(id);
        Optional<FileEntity> optionalPost = fileRepository.findById(postId);
        if(optionalPost.isPresent()){
            FileEntity post = optionalPost.get();
            Comment comment = new Comment(post, user, text);
            commentRepository.save(comment);
        }
    }

    public void deleteComment(String id){
        Long commentId = Long.parseLong(id);
        commentRepository.deleteById(commentId);
    }
}
