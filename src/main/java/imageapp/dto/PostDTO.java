package imageapp.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import imageapp.domain.Image;
import imageapp.domain.Post;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class PostDTO {
    private Long id;

    private String poster;

    private String content;

    private Date datePosted;

    private String browser;

    private ImageDTO image;

    private Set<PostDTO> replies = new HashSet<>();

}
