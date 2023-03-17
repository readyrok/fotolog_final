package com.fotolog.server.repo;

import com.fotolog.server.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    AppUser findByUsername(String username);

    Optional<AppUser> findById(Long id);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
