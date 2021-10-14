import { useEffect, useState } from "react"
import Post from "../post/Post"
import Share from "../share/Share"
import Story from "../story/Story"
import axios from "axios"
import "./feed.css"
export default function Feed({username}) {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPost = async () => {
            const res = username 
            ? await axios.get("/posts/profile/" + username) 
            : await axios.get('posts/timeline/615dcad47631cf469818bd57');
            setPosts(res.data);
        };
        fetchPost();
    }, [username])

    const HomeFeed = () => {
        return (
            <div className="feed">
                <div className="feedWrapper">
                    <Story />
                    <Share home/>
                    {posts.map((p) => (
                        <Post key={p._id} post={p}/>
                    ))}
                </div>
            </div>
        )
    }
    const ProfileFeed = () => {
        return (
            <>
                <Share />
                {posts.map((p) => (
                    <Post key={p._id} post={p}/>
                ))}
            </>
        )
    }

    return (
        <>
            {username ? <ProfileFeed /> : <HomeFeed />}
        </>
    )
}
