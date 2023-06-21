import { useAppSelector } from "../../app/hooks";
import { usersSelector } from "./postsSlice";

interface PostAuthorInterface {
	userId: string
}

export const PostAuthor = ({ userId }: PostAuthorInterface) => {
	const users = useAppSelector(usersSelector);

	const author = users.find(user => user.id === userId);

	return (
		<span>by {author ? author.name : "Unknown author"}</span>
	)
}
