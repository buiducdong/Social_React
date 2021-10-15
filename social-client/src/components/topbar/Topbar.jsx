/* eslint-disable react/jsx-no-undef */
import "./topbar.css"
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import GroupsIcon from '@mui/icons-material/Groups';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MessageIcon from '@mui/icons-material/Message';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AppsIcon from '@mui/icons-material/Apps';
import { Avatar } from "@mui/material";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
    const PFIM = process.env.REACT_APP_PUBLIC_FOLDER;

    const { user } = useContext(AuthContext)
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <img src={`${PFIM}logo-facebook.png`} alt="" />
                <span className="search">
                    <SearchIcon className="iconSearch"/>
                    <input
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </span>
            </div>
            <div className="topbarCenter">
                <Link to="/">
                    <HomeIcon className="iconHome iconTopbar"/>
                </Link>
                <OndemandVideoIcon className="iconLive iconTopbar"/>
                <StorefrontIcon className="iconMarket iconTopbar"/>
                <GroupsIcon className="group iconTopbar"/>
                <SportsEsportsIcon className="play iconTopbar"/>
            </div>
            <div className="topbarRight">
                <Link to={`/profile/${user.username}`} style={{textDecoration: "none", color:"black"}}>
                    <span className="avatar">
                        <Avatar className="imgavatar" src={user.profilePicture ? PFIM + user.profilePicture : PFIM + "person/noavatar.jpg"} alt="" />
                        <span>Bronze</span>
                    </span>
                </Link>
                <AppsIcon className="iconTopright"/>
                <MessageIcon className="iconTopright"/>
                <CircleNotificationsIcon className="iconTopright"/>
                <ArrowDropDownIcon className="iconTopright"/>
            </div>
        </div>
    )
}
