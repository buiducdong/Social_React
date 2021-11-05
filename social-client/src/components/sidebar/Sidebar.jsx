import "./sidebar.css"
import GroupIcon from '@mui/icons-material/Group';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Avatar } from "@mui/material";
import GroupFriend from "../groupFriend/GroupFriend";
import { Users } from "../../myData"

export default function Sidebar() {
    
    const PFIM = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Avatar className="sidebarAvatar sidebarIcon" src={`${PFIM}person/man.jpg`} alt="" />
                        <span>Bronze</span>
                    </li>
                    <li className="sidebarListItem">
                        <GroupIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">Bạn bè</span>
                    </li>
                    <li className="sidebarListItem">
                        <LiveTvIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">Watch</span>
                    </li>
                    <li className="sidebarListItem">
                        <AccessTimeIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">Kỉ niệm</span>
                    </li>
                    <li className="sidebarListItem">
                        <AccessTimeIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">Live</span>
                    </li>
                    <li className="sidebarListItem">
                        <AccessTimeIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">Live</span>
                    </li>
                    <li className="sidebarListItem">
                        <AccessTimeIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">Live</span>
                    </li>
                    <li className="sidebarListItem">
                        <AccessTimeIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">Live</span>
                    </li>
                    <li className="sidebarListItem">
                        <AccessTimeIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">Live</span>
                    </li>
                    <li className="sidebarListItem">
                        <AccessTimeIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">Live</span>
                    </li>
                    <li className="sidebarListItem">
                        <AccessTimeIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">Live</span>
                    </li>
                </ul>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    {Users.map(user => (
                        <GroupFriend key={user.id} user={user}/>
                    ))}

                    
                </ul>
            </div>
        </div>
    )
}
