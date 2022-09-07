import Layout from './partials/Layout'
import Chat from './partials/Chat'
import {useParams, Navigate} from 'react-router-dom'
import {useEffect, useState } from 'react'
import {TOKEN} from '../utils'


const ChatDetail = ({isLoggedIn}) => {
    const {id} = useParams('id')
    const [contact, setContact ] = useState(null)
    const [messages, setMessages] = useState([])
    const [slug, setSlug] = useState(null)
    let chatUrl = `ws://127.0.0.1:8000/ws/${slug}/`
    const chatSocket = new WebSocket(chatUrl)
    chatSocket.onmessage = function(e){
        let data = JSON.parse(e.data)
        const {message} = data
        setMessages([...messages, message])
    }
    const handleSendMessage = message => {
        chatSocket.send(JSON.stringify({'message':message}))
        // setMessages([...messages, message])
    }
    useEffect(() => {
        if (!isLoggedIn){
            return <Navigate replace to="/" />
        }
        const AbortCont = new AbortController()
        fetch(`http://127.0.0.1:8000/api/contacts/${id}`, {
            signal : AbortCont.signal,
            headers : {
                'Authorization' : `Token ${TOKEN}`
            }
        })
        .then(res => res.json())
        .then(contact => {
            setContact(contact)
            setSlug(contact.chat_slug)
        })
        .catch(err => {
            if(err.name !== 'AbortError'){
                console.log(err)
            }
        })
        return () => AbortCont.abort(); 
    }, [id])
    return (
        <Layout>
            <Chat chatId={id} contact={contact} messages={messages} handleSendMessage={handleSendMessage}/>
            
        </Layout>
    )
}


export default ChatDetail;