import React, { useContext, useEffect, useRef, useState } from 'react'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import Topbar from '../../components/topbar/Topbar'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import './messenger.css'
export default function Messenger() {

  const { user } = useContext(AuthContext)
  const [conversation, setConversation] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const scrollRef = useRef()

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id
    }
    

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
                <div className="chatBox__top">
                  {messages.map((m) => (
                    <div ref={scrollRef} key={m._id} className="d">
                      <Message own={m.sender === user._id} message={m}/>
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
