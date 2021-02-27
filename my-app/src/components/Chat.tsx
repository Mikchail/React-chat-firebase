import { Avatar, Button, Container, Grid, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../index';
import Loader from './Loader';
import { useCollectionData } from 'react-firebase-hooks/firestore'

export interface IMessage {
    uid: string;
    displayName: string;
    photoURL: string;
    text: string;
    createdAt: string;
}

const Chat = () => {
    const { auth, firestore, firebase } = useContext(Context);
    const [user] = useAuthState(auth);
    const [messages, loading] = useCollectionData<IMessage>(
        firestore.collection('messages').orderBy('createdAt')
    )
    const [value, setValue] = useState('');
    const divRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(divRef && divRef.current){
            scrollDown(divRef.current)
        }
    }, [messages])

    const scrollDown = (element: HTMLDivElement) => {
        const height = element.scrollHeight;
        element.scrollTo({top: height, behavior: "smooth"});
    }
    const sendMessage = async () => {
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setValue('')
    }


    if (loading) {
        return <Loader />
    }

    return (
        <Container>
            <Grid container
                justify={"center"}
                style={{ height: window.innerHeight - 50, marginTop: 20 }}>
                <div ref={divRef} style={{ width: '80%', height: '60vh', border: '1px solid gray', overflowY: 'auto' }}>
                    {messages && messages.map((message, index) =>
                        <div style={{
                            margin: 10,
                            border: user.uid === message.uid ? '2px solid green' : '2px dashed red',
                            marginLeft: user.uid === message.uid ? 'auto' : '10px',
                            width: 'fit-content',
                            padding: 5,
                        }}
                            key={user.uid + "chat" + index}
                        >
                            <Grid container>
                                <Avatar src={message.photoURL} />
                                <div>{message.displayName}</div>
                            </Grid>
                            <div>{message.text}</div>
                        </div>
                    )}
                </div>
                <Grid
                    container
                    direction={"column"}
                    alignItems={"flex-end"}
                    style={{ width: '80%' }}
                >
                    <TextField
                        fullWidth
                        rowsMax={2}
                        variant={"outlined"}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <Button onClick={sendMessage} variant={"outlined"}>Отправить</Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Chat;