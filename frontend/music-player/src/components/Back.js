import React from 'react';

const Back = ({onClick}) => {
    const downloadMidi = () => {
        let blob = new Blob([require('../generated.mid')], {type: 'application/midi'});

        // let filePath = '../generated.mid';
        let a = document.createElement('A');
        a.href = window.URL.createObjectURL(blob);
        a.download = 'generated.mid';
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)

    }
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} className='back'>
            <h3 onClick={onClick} className="back-img">back</h3>
            <h3 onClick={downloadMidi} className="save-btn">save</h3>
        </div>
    );
};

export default Back;
