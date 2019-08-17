package imageapp.dao;

import imageapp.domain.Image;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface ImageDao extends CrudRepository<Image,Long> {

    @Modifying
    @Transactional
    @Query("update Image i set i.nsfw = true where i.id = :id")
    void markAsNsfw(@Param("id") Long id);

    @Query("select i from Image i where i.nsfw = true")
    Iterable<Image> findAllNsfw();
}
