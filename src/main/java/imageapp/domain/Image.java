package imageapp.domain;


import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity(name="Image")
@Table(name="image")
public class Image {

    @Id
    @GeneratedValue
    private Long id;

    private Boolean nsfw;

    private String imagePath;




}
