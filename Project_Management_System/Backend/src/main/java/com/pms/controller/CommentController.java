package com.pms.controller;

import com.pms.exception.IssueException;

import com.pms.exception.ProjectException;
import com.pms.exception.UserException;
import com.pms.model.Comment;
import com.pms.model.User;
import com.pms.request.CreateCommentRequest;
import com.pms.response.MessageResponse;
import com.pms.service.CommentService;
import com.pms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private CommentService commentService;
    private UserService userService;

    @Autowired
    public CommentController(CommentService commentService,UserService userService) {
        this.commentService = commentService;
        this.userService = userService;
    }

    @PostMapping()
    public ResponseEntity<Comment> createComment(

            @RequestBody CreateCommentRequest req,
            @RequestHeader("Authorization") String jwt) throws UserException, IssueException, ProjectException {
        User user = userService.findUserProfileByJwt(jwt);
        Comment createdComment = commentService.createComment(req.getIssueId(), user.getId(), req.getContent());
        return new ResponseEntity<>(createdComment,HttpStatus.CREATED);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<MessageResponse> deleteComment(@PathVariable Long commentId,

                                                         @RequestHeader("Authorization") String jwt) throws UserException, IssueException, ProjectException {
        User user = userService.findUserProfileByJwt(jwt);
        commentService.deleteComment(commentId, user.getId());
        MessageResponse res=new MessageResponse();
        res.setMessage("comment deleted successfully");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/{issueId}")
    public ResponseEntity<List<Comment>>  getCommentsByIssueId(@PathVariable Long issueId) {
        List<Comment> comments = commentService.findCommentByIssueId(issueId);
        return new ResponseEntity<>(comments,HttpStatus.OK);
    }
}
