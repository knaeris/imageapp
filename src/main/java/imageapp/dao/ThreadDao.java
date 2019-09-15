package imageapp.dao;

import imageapp.domain.Thread;
import org.springframework.data.repository.CrudRepository;

public interface ThreadDao extends CrudRepository<Thread, Long> {


    //Iterable<Thread> findLast(Long numberOfThreads);
}
