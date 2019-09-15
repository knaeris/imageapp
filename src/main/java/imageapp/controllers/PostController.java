package imageapp.controllers;

import imageapp.domain.Post;
import imageapp.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("api/post/{postId}")
    public Post reply(@PathVariable("postId") Long postId, Post reply){
        return postService.replyToPost(postId,reply);
    }


}
