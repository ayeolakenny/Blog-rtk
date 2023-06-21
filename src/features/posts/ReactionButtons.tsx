import { useAppDispatch } from "../../app/hooks";
import { reactionAdded } from "./postsSlice";

const reactionEmoji = {
	thumbsUp: "👍",
	wow: "😮",
	heart: "💓",
	rocket: "🚀",
	coffee: "☕"
}

interface ReactionButtonsInterface {
	post: any
}

export const ReactionButtons = ({ post }: ReactionButtonsInterface) => {

	const dispatch = useAppDispatch();

	const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
		return (
			<button
				key={name}
				type="button"
				className="reactionButton"
				onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}
			>{emoji} {post.reactions[name]}</button>
		)
	})

	return <div>{reactionButtons}</div>
}
