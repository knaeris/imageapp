package imageapp.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity(name="Post")
@Table(name="post")
public class Post {

    @Id
    @GeneratedValue
    private Long id;

    private String ip;

    private String poster;

    private String content;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd/MM/yyyy")
    @Column(name="dateposted")
    private Date datePosted;

    private String browser;

    @OneToOne(cascade=CascadeType.ALL)
    private Image image;

    @OneToMany(cascade=CascadeType.ALL)
    private Set<Post> replies = new HashSet<>();

}
