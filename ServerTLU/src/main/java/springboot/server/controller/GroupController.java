package springboot.server.controller;

import org.springframework.web.bind.annotation.*;
import springboot.server.model.Group;
import springboot.server.repository.GroupRepository;

@RestController
@RequestMapping("/api/group")
public class GroupController {
    private final GroupRepository groupRepository;

    public GroupController(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveGroup(@RequestBody Group group) {
        groupRepository.save(group);
        return true;
    }
}
