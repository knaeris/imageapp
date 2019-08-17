package imageapp.dao;

import imageapp.domain.Post;
import org.springframework.data.repository.CrudRepository;

public interface PostDao extends CrudRepository<Post, Long> {


}
