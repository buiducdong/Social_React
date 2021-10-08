import "./userOnline.css"

export default function UserOnline({user}) {
    return (
        <li className="rightbarFriend">
            <div className="rightbarProfile">
                <img src={user.profilePicture} alt="" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
        </li>
    )
}
