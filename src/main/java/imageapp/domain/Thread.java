package imageapp.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.*;

@Data
@Entity(name="Thread")
public class Thread {

    @Id
    @GeneratedValue
    private Long id;

    private String title;

    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="initialpost_id")
    private Post initialPost;



}
