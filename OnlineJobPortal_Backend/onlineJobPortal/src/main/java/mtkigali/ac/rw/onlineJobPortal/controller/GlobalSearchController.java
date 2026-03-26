package mtkigali.ac.rw.onlineJobPortal.controller;

import mtkigali.ac.rw.onlineJobPortal.service.GlobalSearchService;
import mtkigali.ac.rw.onlineJobPortal.service.JobService;
import mtkigali.ac.rw.onlineJobPortal.service.RecruiterProfileService;
import mtkigali.ac.rw.onlineJobPortal.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/search")
public class GlobalSearchController {

    @Autowired
    private GlobalSearchService globalSearchService;

      @Autowired
    private JobService jobService;

       @Autowired
    private RecruiterProfileService recruiterProfileService;

    @Autowired
    private UserService userService;

    // @GetMapping("/search/global")
    // public Map<String, Object> globalSearch(@RequestParam String searchTerm) {
    //     return globalSearchService.globalSearch(searchTerm);
    // }

//     @GetMapping("/search/global")
// public ResponseEntity<?> search(@RequestParam String searchTerm) {
//     System.out.println("Received searchTerm: " + searchTerm); // Log input
//     List<Job> jobs = jobService.searchJobs(searchTerm);
//     List<RecruiterProfile> recruiters = recruiterProfileService.searchRecruiters(searchTerm);

//     System.out.println("Jobs found: " + jobs.size());
//     System.out.println("Recruiters found: " + recruiters.size());
//     return ResponseEntity.ok(Map.of("jobs", jobs, "recruiters", recruiters));
// }



    @GetMapping("/global")
    public ResponseEntity<Map<String, Object>> globalSearch(@RequestParam String searchTerm) {
        Map<String, Object> results = globalSearchService.globalSearch(searchTerm);
        return ResponseEntity.ok(results);

        
    }
}



