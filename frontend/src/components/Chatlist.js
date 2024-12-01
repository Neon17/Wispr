import React from 'react';
const clickGroup = ()=>{
    console.log('Chat Group Clicked!');
}
const getInitials = (name) => {
    const nameArr = name.split(' ');
    return nameArr[0][0]
  };
const Chatlist = () => {
    return (
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
    );
};

export default Chatlist;