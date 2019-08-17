package imageapp.services;

import imageapp.dao.PostDao;
import imageapp.domain.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class PostService {

    @Autowired
    private PostDao dao;

    public Post replyToPost(Long postId, Post reply){
        Post repliedTo = dao.findOne(postId);
        Set<Post> replies = repliedTo.getReplies();
        replies.add(reply);
        repliedTo.setReplies(replies);
        return dao.save(repliedTo);
    }

}
