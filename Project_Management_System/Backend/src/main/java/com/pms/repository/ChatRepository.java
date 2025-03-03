package com.pms.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.pms.model.Chat;
import com.pms.model.Project;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    

	Chat findByProject(Project projectById);
	
//	List<Chat> findByProjectNameContainingIgnoreCase(String projectName);
}

