import React , { useState , useEffect } from 'react';
import { Modal } from 'react-bootstrap';

import './App.scss';

import Topnavbar from './components/ui/Topnavbar';
import Main from './components/ui/Main';
import Footer from './components/ui/Footer';
import Login from './components/features/Login';




const App = React.memo(() => {
    const [credentials, setCredentials] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const modalClose = () => setShowModal(false);
    const modalShow = () => setShowModal(true);

    useEffect(() => {
        if ((credentials != null) && (showModal == true)) {
            setShowModal(false);
        }
    }, [ credentials ]);

    return (
        <>
            <div id="wrapper">
                <Topnavbar modalShow={ modalShow } credentials={ credentials } setCredentials={ setCredentials } />
                <Main credentials={ credentials } />
                <Footer />
            </div>

            <Modal show={ showModal } onHide={ modalClose }>
                <Login setCredentials={ setCredentials } modalClose={ modalClose } />
            </Modal>
        </>
    );
});

export default App;
