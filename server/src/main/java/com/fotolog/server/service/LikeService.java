package com.fotolog.server.service;

import com.fotolog.server.model.AppUser;
import com.fotolog.server.model.FileEntity;
import com.fotolog.server.model.Like;
import com.fotolog.server.repo.AppUserRepository;
import com.fotolog.server.repo.FileRepository;
import com.fotolog.server.repo.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LikeService {
    @Autowired
    AppUserRepository appUserRepository;

    @Autowired
    LikeRepository likeRepository;

    @Autowired
    FileRepository fileRepository;

    public long countLikesByPostId(String id){
        System.out.println(likeRepository.countLikesByPostId(id));
        return likeRepository.countLikesByPostId(id);
    }

    public void addPostLike(String postId){
        FileEntity file = fileRepository.getById(postId);
        String username = file.getUploader();
        AppUser user = appUserRepository.findByUsername(username);

        Like like = new Like(file, user);
        likeRepository.save(like);
    }

    public void deletePostLike(String postId, String userId) {
        Like like = likeRepository.findByPostIdAndUserId(postId, Long.parseLong(userId));
        likeRepository.deleteLikeById(like.getId());
    }

    public boolean isPostLiked(String postId, String userId){
        System.out.println(likeRepository.existsByPostIdAndUserId(postId, Long.parseLong(userId)));
        return likeRepository.existsByPostIdAndUserId(postId, Long.parseLong(userId));
    }
}
