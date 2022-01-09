import React, { useContext, useEffect, useRef, useState } from 'react'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import Topbar from '../../components/topbar/Topbar'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import './messenger.css'
import {io} from 'socket.io-client'
export default function Messenger() {
  const { user } = useContext(AuthContext)
  const [conversation, setConversation] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [receiverUser, setReceiverUser] = useState({})
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const scrollRef = useRef()
  const socket = useRef()
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    socket.current = io("ws://localhost:8900")
    socket.current.on('getMessage', data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createAt: Date.now(),
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
    setMessages(prev => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit("addUser", user._id)
    socket.current.on("getUsers", users=>{
      console.log(users)
    })
  }, [user])

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axios.get('/conversations/'+ user._id)
        setConversation(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getConversations()
  }, [user._id])

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get('/messages/'+currentChat?._id)
        setMessages(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getMessage()
  }, [currentChat])

  useEffect(() => {
    const getReceiverUser = async() => {
      
      try{
        const friendId =await currentChat.members.find((m) => m !== user._id)
        const res = await axios.get('/users?userId='+ friendId)
        setReceiverUser(res.data)
      }catch (err){
        console.log(err)
      }
    }
    getReceiverUser()

  },[currentChat, user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id
    }
    

    const receiverId = currentChat.members.find(member => member !== user._id)
    socket.current.emit('sendMessage', {
      senderId: user._id,
      receiverId,
      text: newMessage
    })

    try {
      const res = await axios.post('/messages', message)
      setMessages([...messages, res.data])
      setNewMessage('')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages])

  return (
    <>
      <Topbar></Topbar>
      <div className="messenger">
        <div className="chatMenu">
          <input className='chatMenu--button' placeholder='search for friends' type="text" />
          {conversation.map(c => (
            <div key={c._id} onClick={() => setCurrentChat(c)}>
              <Conversation key={c._id} conversation={c} currentUser={user}/>
            </div>
          ))}
        </div>
        <div className="chatBox">
          {currentChat ? 
            <>
          <div className="chatBox__header">
            <img className='receiverUserImg' src={receiverUser?.profilePicture ?PF+ receiverUser.profilePicture : PF + 'person/noavatar.jpg'} alt='fsf'/>
            <div className="receiverUserInfo">
              <h3>{receiverUser.username}</h3>
              <p>hoạt động 1 phút trước</p>
            </div>
          </div>
                <div className="chatBox__top">
                  {messages.map((m) => (
                    <div ref={scrollRef} key={m._id} className="d">
                      <Message own={m.sender === user._id} message={m} receiverUser={receiverUser}/>
                    </div>
                  ))}
                </div>
                <div className="chatBox__bottom">
                  <textarea
                    className="message__input" 
                    placeholder='Aa' id=""
                    onChange={e => setNewMessage(e.target.value)}
                    value={newMessage}>
                  </textarea>
                  <button onClick={handleSubmit} className='message__button--submit'>submit</button>
                </div>
            </> : <span>open concersation</span>}
          </div>
        <div className="chatOnline">hihi</div>
      </div>
    </>
  )
}
