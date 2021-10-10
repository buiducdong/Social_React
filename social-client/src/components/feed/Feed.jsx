import Post from "../post/Post"
import Share from "../share/Share"
import Story from "../story/Story"
import "./feed.css"
import { Posts } from "../../myData"
import { useEffect} from "react"
import axios from "axios"

export default function Feed({ profile }) {

    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get('posts/timeline/615dcae57631cf469818bd59');
            console.log(res);
        };
        fetchPost();
    }, [])

    const HomeFeed = () => {
        return (
            <div className="feed">
                <div className="feedWrapper">
                    <Story />
                    <Share home/>
                    {Posts.map((p) => (
                        <Post key={p.id} post={p}/>
                    ))}
                </div>
            </div>
        )
    }
    const ProfileFeed = () => {
        return (
            <>
                <Share />
                {Posts.map((p) => (
                    <Post key={p.id} post={p}/>
                ))}
            </>
        )
    }

    return (
        <>
                {profile ? <ProfileFeed /> : <HomeFeed />}
        </>
    )
}
