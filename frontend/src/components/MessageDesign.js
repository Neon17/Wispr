import React from 'react'

export default function MessageDesign (){
    const clickGroup = ()=>{
        console.log('Chat Group Clicked!');
    }
    return (
        <>
        <div className='container-fluid' style={{backgroundColor: 'aliceblue', minHeight: '93vh'}}>
            <div className='container'>
                <div className='messageContainer p-2 d-flex' style={{minHeight: '80vh'}}>                
                    <div className='groupList border-end bg-white' style={{width:'30%'}}>
                        <div className='personContainer border-bottom p-2' onClick={clickGroup} style={{fontWeight: 'bold'}} role='button'>
                            <div className='personName' style={{fontSize: '18.6px'}}>Shyam Bahadur</div>
                            <div className='personMessage'>Are you coming home?</div>
                            <div className='personTime form-text text-muted text-end'>07:08 AM</div>
                        </div>
                        <div className='personContainer border-bottom p-2' onClick={clickGroup} role='button'>
                            <div className='personName' style={{fontSize: '18.6px'}}>Gautam Bahadur</div>
                            <div className='personMessage'>Are you fine?</div>
                            <div className='personTime form-text text-muted text-end'>07:08 AM</div>
                        </div>
                        <div className='personContainer border-bottom p-2' onClick={clickGroup} role='button'>
                            <div className='personName' style={{fontSize: '18.6px'}}>Aalu Bahadur</div>
                            <div className='personMessage'>Can we go shopping tonight?</div>
                            <div className='personTime form-text text-muted text-end'>07:08 AM</div>
                        </div>
                    </div>
                    <div className='messageList p-2 bg-white d-flex flex-column' style={{width: '70%'}}>
                        <div className='titleMessage border-bottom p-2 text-center' style={{fontSize: '18px '}}>
                            Shyam Bahadur
                        </div>
                        <div className='bodyMessage mt-1 d-flex flex-column'>
                            <div className='messageBoxContainer py-2'>
                                <span className='p-2 bg-dark text-white rounded'>
                                    I am here to help you
                                </span>
                            </div>
                            <div className='messageBoxContainer py-2'>
                                <span className='p-2 bg-primary float-end text-white rounded'>
                                    I think I am trapped
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='typeContainer p-2 w-100 d-flex'>
                    <div className="mb-3 flex-grow-1">
                        <input
                            type="text"
                            name=""
                            id=""
                            className="form-control rounded-0 rounded-start"
                            placeholder=""
                            aria-describedby="helpId"
                        />
                    </div>
                    <div className='buttonContainer'>
                        <button type="button" className="btn btn-primary rounded-0 rounded-end" data-bs-toggle="button" aria-pressed="false" autoComplete="off">
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    )
}
