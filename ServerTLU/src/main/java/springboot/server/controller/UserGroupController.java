package springboot.server.controller;

import org.springframework.web.bind.annotation.*;
import springboot.server.model.UserGroup;
import springboot.server.repository.UserGroupRepository;

@RestController
@RequestMapping("/api/userGroup")
public class UserGroupController {
    private final UserGroupRepository userGroupRepository;

    public UserGroupController(UserGroupRepository userGroupRepository) {
        this.userGroupRepository = userGroupRepository;
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveUserGroup(@RequestBody UserGroup userGroup) {
        userGroupRepository.save(userGroup);
        return true;
    }
}
