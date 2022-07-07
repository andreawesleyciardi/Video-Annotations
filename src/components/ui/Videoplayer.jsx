import React , { useState , useEffect , useRef } from 'react';
import ReactPlayer from 'react-player';

import { Duration } from './../Utilities';



const Videoplayer = React.memo((props) => {
    const [seeking, setSeeking] = useState(null);
    const [seekBg, setSeekBg] = useState(null);
    const [playing, setPlaying] = useState(true);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(null);
    const [highlight, setHighlight] = useState(null);
    const player = useRef(null);

    let { data , setDataFrame , externalPlayed  } = props;
    
    const handleSeekMouseDown = (e) => {
        setSeeking(true);
        if (playing == true) {
            setPlaying(false);
        }
        if (props.selectedNote != null) {
            props.setSelectedNote(null);
        }
    };

    const handleSeekChange = (e) => {
        setPlayed(parseFloat(e.target.value));
    };

    const handleSeekMouseUp = (e) => {
        setSeeking(false);
        player.current.seekTo(parseFloat(e.target.value));
    };

    useEffect(() => {
        if ((seeking == false) && (played != null)) {
            let frameIndex = (Math.round(played * duration) * Object.keys(data.frame_data).length) / duration;
            setDataFrame(Object.assign({  }, data.frame_data[(isNaN(frameIndex) ? 0 : frameIndex)], { frameIndex : frameIndex , frameTime : (duration * played) }));
        }
    }, [ seeking ]);

    useEffect(() => {
        if (seekBg == null) {
            const framesLength = Object.keys(data.frame_data).length;
            if ((data != null) && (framesLength > 0)) {
                let percIncrement = 100 / framesLength;
                let percCounter = 0;
                let arrColors = [  ];
                for (let i = 0; i < framesLength; i++) {
                    const dataFrame = data.frame_data[i];
                    arrColors.push('rgb(' + parseInt(dataFrame.avgR) + ',' + parseInt(dataFrame.avgG) + ',' + parseInt(dataFrame.avgB) + ') ' + (percCounter + percIncrement) + '%');
                    percCounter = percCounter + percIncrement;
                }
                const colorStrip = arrColors.join(',');
                setSeekBg('linear-gradient(to right, ' + colorStrip + ')');
            }
        }
    }, [ data ]);

    useEffect(() => {
        if (externalPlayed != null) {
            player.current.seekTo(externalPlayed.frameTime / duration);
            setPlayed(externalPlayed.frameTime / duration);
            setDataFrame(externalPlayed);
        }
    }, [ externalPlayed ]);

    const handleReady = (reactPlayer) => {
        const videoPlayer = player.current.getInternalPlayer();
        const RoI = { left : data.RoI[0] , top : data.RoI[1] , width : data.RoI[2] , height : data.RoI[3] };
        let clientRoi = {  }
        const offset = 25;
        clientRoi.left = ((RoI.left * videoPlayer.clientWidth) / videoPlayer.videoWidth) - offset;
        clientRoi.top = ((RoI.top * videoPlayer.clientHeight) / videoPlayer.videoHeight) - offset;
        clientRoi.width = ((RoI.width * videoPlayer.clientWidth) / videoPlayer.videoWidth) + (offset * 2);
        clientRoi.height = ((RoI.height * videoPlayer.clientHeight) / videoPlayer.videoHeight) + (offset * 2);
        setHighlight(clientRoi);
    }

    return (
        <div className="container-videoplayer">
            {
                highlight != null
                &&
                    <div className="highlighted-area" style={ { ...highlight } }></div>
            }
            <ReactPlayer ref={ player } className="videoplayer" url={ props.url } controls={ true } playing={ playing } onDuration={ setDuration } onReady={ handleReady } width="100%" />
            <div className="container-seek mt-5">
                <input type="range" className="seek" min={ 0 } max={ 0.999999 } step="any" value={ played } onMouseDown={ handleSeekMouseDown } onChange={ handleSeekChange } onMouseUp={ handleSeekMouseUp } style={ { backgroundImage : seekBg } } />
                <label>[ { Object.keys(data.frame_data).length } frames - <Duration seconds={ duration } /> mins ]</label>
            </div>
        </div>
    );
});

export default Videoplayer;
