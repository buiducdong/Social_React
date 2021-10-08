import Post from "../post/Post"
import Share from "../share/Share"
import Story from "../story/Story"
import "./feed.css"
import { Posts } from "../../myData"

export default function Feed({ profile }) {

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
