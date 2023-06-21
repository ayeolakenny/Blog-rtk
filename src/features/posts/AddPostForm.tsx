import React, { useState } from "react"

import { postAdded } from "./postsSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { usersSelector } from "../users/usersSlice"

export const AddPostForm = () => {
	const [title, setTitle] = useState<string>('')
	const [content, setContent] = useState('')
	const [userId, setUserId] = useState('')

	const dispatch = useAppDispatch();

	const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
	const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)
	const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value)

	const users = useAppSelector(usersSelector)

	const onSavePostClicked = () => {
		if (title && content) {
			dispatch(
				postAdded(title, content, userId)
			)

			setTitle('')
			setContent('')
		}
	}

	const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

	const usersOptions = users.map(user => (
		<option key={user.id} value={user.id}>
			{user.name}
		</option>
	))

	return (
		<section>
			<h2>Add a New Post</h2>
			<form action="">
				<label htmlFor="postTitle">Post Title:</label>
				<input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} />
				<label htmlFor="postContent">Content:</label>
				<select id="postAuthor" value={userId} onChange={onAuthorChanged}>
					<option value=""></option>
					{usersOptions}
				</select>
				<textarea name="postContent" id="postContent" value={content} onChange={onContentChanged}></textarea>
				<button type="button" onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
			</form>
		</section>
	)
}
