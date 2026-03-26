package mtkigali.ac.rw.onlineJobPortal.controller;

import mtkigali.ac.rw.onlineJobPortal.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/search")
public class SearchController {

    private final SearchService searchService;

    @Autowired
    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public Page<Object> globalSearch(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return searchService.globalSearch(keyword, PageRequest.of(page, size));
    }
}
