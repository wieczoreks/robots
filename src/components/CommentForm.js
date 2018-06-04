import React from "react";

class CommentForm extends React.Component {
	
	render(){
		return (
			<form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
				<label>Join discussion</label><br/>
					<div className="comment-form-fields">
						<input placeholder="Name:" ref = {(input)=>this._author=input} /><br/>
						<input placeholder="Comment" ref = {(input)=>this._body=input} /><br/>
					</div>
					<div className="common-form-actions">
						<button type="submit">Post comment</button>
					</div>
			</form>
			);
	}
	_handleSubmit(event){
		event.preventDefault();
		let author = this._author;
		let body = this._body;
		console.log(author.value, body.value);
		this.props.addComment(author.value,body.value);
	}
}

export default CommentForm