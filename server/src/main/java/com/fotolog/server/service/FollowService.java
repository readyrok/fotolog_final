package com.fotolog.server.service;

import com.fotolog.server.model.AppUser;
import com.fotolog.server.model.Follow;
import com.fotolog.server.repo.AppUserRepository;
import com.fotolog.server.repo.FollowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FollowService {
    private final FollowRepository followRepository;

    private final AppUserRepository appUserRepository;

    @Autowired
    public FollowService(FollowRepository followRepository, AppUserRepository appUserRepository){
        this.followRepository = followRepository;
        this.appUserRepository = appUserRepository;
    }

    public void addFollow(String userId, String followerId){
        AppUser user = appUserRepository.getById(Long.parseLong(userId));
        AppUser follower = appUserRepository.getById(Long.parseLong(followerId));

        Follow follow = new Follow(user, follower);

        followRepository.save(follow);
    }

    public void deleteFollow(String userId, String followerId){
        Follow follow = followRepository.getFollowByUserIdAndFollowerId(Long.parseLong(userId), Long.parseLong(followerId));

        followRepository.delete(follow);
    }

    public long countFollowers(String userId){
        return followRepository.countFollowByUserId(Long.parseLong(userId));
    }

    public long countFollowing(String userId){
        return followRepository.countFollowsByFollowerId(Long.parseLong(userId));
    }

    public List<AppUser> getFollowers(String userId){
        List<Follow> followers = followRepository.getFollowsByUserId(Long.parseLong(userId));

        List<AppUser> users = new ArrayList<AppUser>();

        for(Follow follow : followers){
            AppUser follower = follow.getFollower();
            users.add(follower);
        }

        return users;
    }

    public List<AppUser> getFollowing(String userId){
        List<Follow> following = followRepository.getFollowsByFollowerId(Long.parseLong(userId));

        List<AppUser> users = new ArrayList<AppUser>();

        for(Follow follow : following){
            AppUser followUser = follow.getUser();
            users.add(followUser);
        }

        return users;
    }
}
