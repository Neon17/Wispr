import React from 'react'

export default function MessageDesign (){
    const clickGroup = ()=>{
        console.log('Chat Group Clicked!');
    }
    const getInitials = (name) => {
        const nameArr = name.split(' ');
        return nameArr[0][0]
      };
    return (
        <>
        <div className='container-fluid' style={{backgroundColor: 'aliceblue', minHeight: '93vh'}}>
            <div className='container'>
                <div className='messageContainer p-2 d-flex' style={{minHeight: '80vh'}}>                
                    <div className='groupList border-end bg-white' style={{width:'30%'}}>
                    <div className="personContainer border-bottom p-3" onClick={clickGroup} role="button">
                        {/* Profile Name */}
                        <div className="d-flex align-items-center">
                            {/* Avatar with initials */}
                            <div
                            className="avatar rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                            style={{ width: '50px', height: '50px', fontSize: '18px' }}
                            >
                            {getInitials('Shyam Bahadur')}
                            </div>
                            
                            {/* Name and message */}
                            <div className="ms-3">
                            {/* Person Name */}
                            <div className="personName fw-bold" style={{ fontSize: '18px' }}>
                                Shyam Bahadur
                            </div>
                            {/* Last Message */}
                            <div className="personMessage text-muted" style={{ fontSize: '14px' }}>
                                Are you coming home?
                            </div>
                            </div>
                        </div>

                        {/* Time */}
                        <div className="personTime form-text text-muted text-end" style={{ fontSize: '12px' }}>
                            07:08 AM
                        </div>
                    </div>
                    <div className="personContainer border-bottom p-3" onClick={clickGroup} role="button">
                        {/* Profile Name */}
                        <div className="d-flex align-items-center">
                            {/* Avatar with initials */}
                            <div
                            className="avatar rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                            style={{ width: '50px', height: '50px', fontSize: '18px' }}
                            >
                            {getInitials('Neon Neupane')}
                            </div>
                            
                            {/* Name and message */}
                            <div className="ms-3">
                            {/* Person Name */}
                            <div className="personName fw-bold" style={{ fontSize: '18px' }}>
                                Neon Neupane
                            </div>
                            {/* Last Message */}
                            <div className="personMessage text-muted" style={{ fontSize: '14px' }}>
                                Are you coming home?
                            </div>
                            </div>
                        </div>

                        {/* Time */}
                        <div className="personTime form-text text-muted text-end" style={{ fontSize: '12px' }}>
                            07:08 AM
                        </div>
                    </div>
                    <div className="personContainer border-bottom p-3" onClick={clickGroup} role="button">
                        {/* Profile Name */}
                        <div className="d-flex align-items-center">
                            {/* Avatar with initials */}
                            <div
                            className="avatar rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                            style={{ width: '50px', height: '50px', fontSize: '18px' }}
                            >
                            {getInitials('Kushal1o1')}
                            </div>
                            
                            {/* Name and message */}
                            <div className="ms-3">
                            {/* Person Name */}
                            <div className="personName fw-bold" style={{ fontSize: '18px' }}>
                                Kushal1o1
                            </div>
                            {/* Last Message */}
                            <div className="personMessage text-muted" style={{ fontSize: '14px' }}>
                                Are you coming home?
                            </div>
                            </div>
                        </div>

                        {/* Time */}
                        <div className="personTime form-text text-muted text-end" style={{ fontSize: '12px' }}>
                            07:08 AM
                        </div>
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
