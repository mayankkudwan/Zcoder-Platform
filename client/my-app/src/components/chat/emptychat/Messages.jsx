import { Box,styled } from "@mui/material";
import Footer from "./Footer";
import { useContext,useEffect,useState,useRef } from "react";
import { AccountContext } from "../../constants/contexts/AccountProvider";
import { newMessage } from "../../../service/api.js";
import { getMessages } from "../../../service/api.js";
import SingleMessage from "./singleMessage.jsx";
import background from "./background.jpg";
const Container=styled(Box)`
backgroundImage: url(${background});
background-size:50%;
background-color:black;
`
const Contai = styled(Box)`
    padding: 1px 30px;
`;
const Component=styled(Box)`
height:67vh;
overflow-y:scroll;
${'' /* vertical overflow will become scrollable */}
`
function Messages({person,conversation}){


        const[value, setValue]=useState('');
        const[messages,setMessages]=useState([]);
        const[newMessageFlag,setNewMessageFlag]=useState(false);
        const[incomingMessage,setIncomingMessage]=useState(null);
        const scrollRef=useRef();
    const {account,socket}=useContext(AccountContext);
    
    useEffect(() => {
        const handleIncoming = (data) => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now()
            });
        };
    
        socket.current.on('getMessage', handleIncoming);
    
        return () => {
            socket.current.off('getMessage', handleIncoming); // ✅ Cleanup when component unmounts
        };
    }, []);

    useEffect(()=>{
        const getMessageDetails =async ()=>{
           // console.log(conversation);
           await new Promise(res => setTimeout(res, 100));
            let data = await getMessages(conversation._id);
            // console.log("khohkhkhkhkhkhkhk");
            // console.log(conversation._id);
            // console.log("hehehehheheheeh")
          //  console.log(data);
            setMessages(data);
            //console.log(messages);
        }
        getMessageDetails(); 
    },[person._id,conversation._id,newMessageFlag,setMessages]);

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({transition:'smooth'})//scrollRef.current works as document.getElementById type
    },[messages])

    useEffect(()=>{
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId) &&
        setMessages((prev) => [...prev, incomingMessage]);
    },[incomingMessage, conversation]);

    const receiverId = conversation?.members?.find(member => member !== account.sub);
   async function sendText(e){
       // console.log(conversation);
        const code=e.keyCode ||e.which;
        if(code===13){
            let message={
                senderId: account.sub,
                receiverId: receiverId,
                conversationId:conversation._id,//we are getting an error here cause the getconversation in api.js is returning a null object ddkkfk
                type: 'text',
                text: value
            };
            console.log(message);
            //now we send this message to our database
            await newMessage(message);
            socket.current.emit('sendMessage',message)
            

            setValue('');
            setNewMessageFlag(prev =>!prev); 
        }
    }
    return(<Container>
        <Component>
             {messages&&messages.map((message,index)=>(
                <Contai key={index} ref={scrollRef}>
                <SingleMessage message={message}/>
                </Contai>
                

             ))}
        </Component>
        <Footer 
            sendText={sendText}
            setValue={setValue}//we need to make it a controlled component so we need to update the value in input field according to the value in value usestate
            value={value}

        />
    </Container>
    )
}
export default Messages;