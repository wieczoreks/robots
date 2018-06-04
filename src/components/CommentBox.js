import React from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

class CommentBox extends React.Component{
constructor(){
	super();
	this.state = {
		showComments:false,
		comments: [
			{id:1, author:"dupa", body: "great stuff"},
			{id:2, author:"nadia", body: "excellent stuff"}
		]
	};
}
componentWillMount(){
	_fetchcomments();
}
componentDidMount(){
	this._timer=setInterval(
		()=>this._fetchcomments(),5000
		);
}
componentWillUnmount(){
clearInterval(this._timer);
}
//---------------------

_fetchcomments(){
	jQuery.ajax({
		method:"GET",
		url:"/api/comments",
		success:(comments)=>{this.setState({comments})}
	})
}
//------------------------
_deleteComment(comment){
	$.ajax({
		method:"DELETE",
		url:`/api/comments/${comment.id}`
	});
	const comments = [...this.state.comments];
	const commentIndex = comments.indexOf(comment);
	comments.splice(commentIndex,1);
	this.setState({comments});
}
//---------------------

_addComment(author,body){
const comment = {author,body};
jQuery.post(`/api/comments`,{comment}).success(newComment=>{
	this.setState({comments:this.state.comments.concat([newComment]) });
})


const comment = {
	id:this.state.comments.length+1,
	 author,
	 body
};
this.setState({comments:this.state.comments.concat( [comment] ) } ) ;}

//------------------------
_getComments(){
	
	return this.state.comments.map((comment)=>{
		return (<Comment 
			author = {comment.author} body={comment.body} key={comment.id}
			onDelete={this.deleteComment.bind(this)}
			/>)
	});
}
//---------------------------
_getCommentsTitle(commentCount){
	if(commentCount===0){
		return "No comments yet";
	}else if(commentCount===1){
		return "1 comment";

	}else{
	return `${commentCount} comments`;
	}

}
//----------------------------
_handleClick(){
	this.setState({
		showComments:!this.state.showComments
	});
}
//-----------------
render(){
const comments = this._getComments();
let commentNodes;
let buttonText = "Show comments";

if(this.state.showComments){
	commentNodes= <div className = "comment-list">{comments}</div>
	buttonText = "Hide comments";
}
return (
<div className = "comment-box">
	
	<CommentForm addComment={this._addComment.bind(this)}/>
	
	<h3>Comments</h3>
	<button onClick = {this._handleClick.bind(this)}>{buttonText}</button>
	<h4 className = "comment-count"> {this._getCommentsTitle(comments.length)} </h4>
	{commentNodes}
</div>);
}

}

export default CommentBox;