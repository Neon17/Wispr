import React from 'react'
import ChatInterface from './ChatInterface';
import Chatlist from './Chatlist';

export default function MessageDesign (){

    return (
        <>
        <div className='container-fluid' style={{backgroundColor: 'aliceblue', minHeight: '93vh'}}>
            <div className='container'>
                <div className='messageContainer p-2 d-flex' style={{minHeight: '80vh'}}>                
                <Chatlist/> 
                <ChatInterface/>

                </div>


            </div>
        </div>
        </>
    )
}
