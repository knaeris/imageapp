package imageapp.domain;


import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

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
