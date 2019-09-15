package imageapp.dto;

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
