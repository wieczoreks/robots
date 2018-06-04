import React from 'react';


class Comment extends React.Component{

render(){
	return (
<div className = "comment">
	<p className = "comment-header">{this.props.author}</p>
	<p className = "comment-body"> {this.props.body}</p>
	<div className = "comment-footer">
	<a href="#" className = "comment-footer-delete" 
	onClick={this.handledelete.bind(this)}>delete comment</a>
	</div>
</div>);
}
_handleDelete(event){
	preventDefault();
	if(confirm("are you sure ?")){
	this.props.onDelete(this.props.comment);
}
}
}

export default Comment;