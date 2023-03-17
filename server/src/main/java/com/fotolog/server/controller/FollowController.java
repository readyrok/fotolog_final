package com.fotolog.server.controller;

import com.fotolog.server.model.AppUser;
import com.fotolog.server.model.Comment;
import com.fotolog.server.model.Follow;
import com.fotolog.server.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(path = "/follow")
public class FollowController {
    private final FollowService followService;

    @Autowired
    public FollowController(FollowService followService){
        this.followService = followService;
    }

    @PostMapping("/{userId}/{followerId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public void saveFollow(@PathVariable("userId") String userId, @PathVariable("followerId") String followerId){
        followService.addFollow(userId, followerId);
    }

    @DeleteMapping("/{userId}/{followerId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public void deleteFollow(@PathVariable("userId") String userId, @PathVariable("followerId") String followerId){
        followService.deleteFollow(userId, followerId);
    }

    @GetMapping("/followers/{userId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public List<AppUser> getFollowers(@PathVariable("userId") String userId){
        return followService.getFollowers(userId);
    }

    @GetMapping("/following/{userId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public List<AppUser> getFollowing(@PathVariable("userId") String userId){
        return followService.getFollowing(userId);
    }

    @GetMapping("/follower_count/{userId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public Long getFollowersCount(@PathVariable("userId") String userId){
        return followService.countFollowers(userId);
    }

    @GetMapping("/following_count/{userId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public Long getFollowingCount(@PathVariable("userId") String userId){
        return followService.countFollowing(userId);
    }

}
