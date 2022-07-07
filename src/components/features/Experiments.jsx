import React , { useState , useEffect } from 'react';
import axios from 'axios';
import { Container , Row , Col , Button } from 'react-bootstrap';

import Notes from './../ui/Notes';
import Videoplayer from './../ui/Videoplayer';
import ColorDisplayer from './../ui/ColorDisplayer';
import FrameData from './../ui/FrameData';

import notesList from './notes.json';



const Experiments = React.memo((props) => {
    const [isLoadingDevices, setIsLoadingDevices] = useState(false);
    const [devices, setDevices] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [selectedDeviceData, setSelectedDeviceData] = useState(null);
    const [dataFrame, setDataFrame] = useState(null);
    const [notes, setNotes] = useState(notesList);
    const [selectedNote, setSelectedNote] = useState(null);

    const getDevices = () => {
        axios.get((process.env.NODE_ENV === "production" ? 'https://mockapi.lumi.systems/getdevices' : 'getdevices'), { params : { userId : '100' , orgId : 'Lumi' } })
        //axios.get('getdevices.json', { params : { userId : '100' , orgId : 'Lumi' } })
            .then(
                (response) => {
                    setDevices(response.data.output);
                    setIsLoadingDevices(false);
                }
            )
            .catch(
                (error) => {
                    setDevices(false);
                    setIsLoadingDevices(false);
                }
            );
    };

    const getDeviceData = (selectedDeviceId) => {
        axios.get((process.env.NODE_ENV === "production" ? 'https://mockapi.lumi.systems/getdevicedata' : 'getdevicedata'), { params : { deviceId : selectedDeviceId } })
        //axios.get('getdevicedata.json', { params : { deviceId : selectedDeviceId } })
            .then((response) => {
                fetch((process.env.NODE_ENV === "production" ? response.data.output.cvmdata : response.data.output.cvmdata.replace('https://frontend-test-2022-bucket.s3.eu-west-2.amazonaws.com/', '')))
                //fetch(response.data.output.cvmdata.replace('https://frontend-test-2022-bucket.s3.eu-west-2.amazonaws.com/', ''))
                   .then((response) => { return response.json() })
                   .then((responseJson) => {
                        setSelectedDeviceData(Object.assign({  }, response.data.output, { cvmdata : responseJson }));
                   })
                   .catch((error) => {
                        setSelectedDeviceData(false);
                   });
            })
            .catch((error) => {
                setSelectedDeviceData(false);
            });
    };

    useEffect(() => {
        if (isLoadingDevices == false) {
            setIsLoadingDevices(true);
        }
    }, [  ]);

    useEffect(() => {
        if (isLoadingDevices == true) {
            getDevices();
        }
    }, [ isLoadingDevices ]);

    useEffect(() => {
        if (selectedDevice != null) {
            setDataFrame(null);
            getDeviceData(selectedDevice);
        }
    }, [ selectedDevice ]);

    return (
        <Container fluid id="experiments-feature">
            <Row>
                <Col className="widget-container" xs md={ 3 }>
                    <div className="widget" id="widget-devices">
                        <div className="widget-header">
                            <h4>Devices</h4>
                        </div>
                        <div className="widget-body">
                            {
                                devices != false ?
                                    (devices != null ? devices : [  ]).map((item, index) => {
                                        return (
                                            <Button className="mx-3" variant={ item == selectedDevice ? 'primary' : 'secondary' } onClick={ (e) => { setSelectedDevice(item) } } key={ item }>{ item }</Button>
                                        );
                                    })
                                :
                                    <p className="text-placeholder">It was not possible to find any available device.</p>
                            }
                        </div>
                    </div>
                </Col>
                <Col className="widget-container" xs md={ 9 }>
                    <div className="widget" id="widget-experiment">
                        <div className="widget-header">
                            <h4>Experiment</h4>
                        </div>
                        <div className="widget-body">
                            {
                                selectedDeviceData == null ?
                                    <p className="text-placeholder">Select a device.</p>
                                :
                                    (
                                        selectedDeviceData == false ?
                                            <p className="text-placeholder">It was not possible to retreive data regarding the selected device.</p>
                                        :
                                            <Container fluid>
                                                <Row>
                                                    <Col className="flex-column" xs md={ 6 }>
                                                        <Videoplayer url={ selectedDeviceData.videofiles } data={ selectedDeviceData.cvmdata } setDataFrame={ setDataFrame } externalPlayed={ selectedNote } setSelectedNote={ setSelectedNote } />
                                                        <div className="selected-frame-container">
                                                            <h5>Selected Frame</h5>
                                                            {
                                                                dataFrame != null ?
                                                                    <div className="selected-frame-data">
                                                                        <div>
                                                                            <FrameData data={ dataFrame } histDiff={ dataFrame.histDiff } />
                                                                        </div>
                                                                        <ColorDisplayer rgb={ dataFrame } size="big" />
                                                                    </div>
                                                                :
                                                                    <p className="text-placeholder my-5">No frame has been selected from the Frame track bar<br/>or from the list of Observations.</p>
                                                            }
                                                        </div>
                                                    </Col>
                                                    <Col xs md={ 6 }>
                                                        <h5>Observations ({ notes.length })</h5>
                                                        <Notes notes={ notes } setSelectedNote={ setSelectedNote } selectedDeviceData={ selectedDeviceData } />
                                                    </Col>
                                                </Row>
                                            </Container>
                                    )
                            }
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
});

export default Experiments;
