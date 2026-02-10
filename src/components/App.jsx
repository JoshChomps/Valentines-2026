import React, { useState } from 'react';
import Overlay from './Overlay.jsx';
import Experience from './Experience.jsx';

const App = () => {
    const [accepted, setAccepted] = useState(false);

    return (
        <>
            <Overlay
                accepted={accepted}
                onYes={() => setAccepted(true)}
            />
            <Experience accepted={accepted} />
        </>
    );
};

export default App;
