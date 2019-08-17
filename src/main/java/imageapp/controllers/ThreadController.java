package imageapp.controllers;

import imageapp.dao.PostDao;
import imageapp.dao.ThreadDao;
import imageapp.domain.Post;
import imageapp.domain.Thread;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
public class ThreadController {

    @Autowired
    private ThreadDao threadDao;


    @GetMapping("api/threads")
    public Iterable<Thread> getAllThreads(){
        return threadDao.findAll();
    }

    @GetMapping("api/threads/{id}")
    public Thread getThreadById(@PathVariable Long id){
        return threadDao.findOne(id);
    }

    @GetMapping("api/threads/last/{nr}")
    public Iterable<Thread> getLastThreads(@PathVariable Long numberOfThreads){
        return null;
    }

    @PostMapping("api/threads")
    public Thread startNewThread(@RequestBody Thread thread){
        return threadDao.save(thread);
    }

    @DeleteMapping("api/threads/{id}/delete")
    public void deleteThread(@PathVariable Long id){
         threadDao.delete(id);
    }


}
