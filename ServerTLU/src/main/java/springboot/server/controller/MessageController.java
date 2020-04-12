package springboot.server.controller;

import org.springframework.web.bind.annotation.*;
import springboot.server.model.GroupSubject;
import springboot.server.model.Message;
import springboot.server.repository.MessageRepository;

@RestController
@RequestMapping("/api/message")
public class MessageController {
    private final MessageRepository messageRepository;

    public MessageController(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @PostMapping(value = "/")
    @ResponseBody
    public boolean saveMessage(@RequestBody Message message) {
        messageRepository.save(message);
        return true;
    }
}
