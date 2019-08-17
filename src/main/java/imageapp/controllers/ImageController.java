package imageapp.controllers;

import imageapp.dao.ImageDao;
import imageapp.domain.Thread;
import imageapp.domain.Image;
import imageapp.util.BeanUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ImageController {

    @Autowired
    private ImageDao dao;

    @GetMapping("api/images")
    public Iterable<Image> getImages(){
        return dao.findAll();
    }

    @GetMapping("api/images/{id}")
    public Image getImageById(@PathVariable Long id){
        return dao.findOne(id);
    }

    @PostMapping("api/images/{id}/mark-as-nsfw")
    public Image markAsNsfw(@PathVariable Long id){
         dao.markAsNsfw(id);
         return getImageById(id);
    }

    @PatchMapping("api/images/{id}")
    public Image update(@PathVariable Long id, @RequestBody Image newImageInfo){
        Image image = getImageById(id);
        return dao.save(image);
    }

    @PostMapping("api/images")
    public Image saveImage(@RequestBody Image image){
       return dao.save(image);
    }

    @PostMapping("api/images/{id}/comment")
    public Image commentImage(@PathVariable Long id, @RequestBody Thread thread){
        return null;
    }

    @GetMapping("api/images/nsfw")
    public Iterable<Image> getNsfwImages(){
        return dao.findAllNsfw();
    }


}
