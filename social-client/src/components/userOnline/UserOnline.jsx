import "./userOnline.css"

export default function UserOnline({user}) {
    const PFIM = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="rightbarFriend">
            <div className="rightbarProfile">
                <img src={user.profilePicture ? PFIM+user.profilePicture : PFIM+"person/noavatar.jpg"} alt="" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
        </li>
    )
}
