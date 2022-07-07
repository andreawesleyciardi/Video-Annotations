import ColorDisplayer from './ColorDisplayer';
import FrameData from './FrameData';



const Notes = (props) => (
    <div className="container-notes">
        {
            (props.notes != null ? props.notes : [  ]).map((item, index) => {
                return (
                    <div className="container-note" key={ item.frameIndex }>
                        <button className="btn p-0" onClick={ (e) => { props.setSelectedNote(Object.assign({  }, item, props.selectedDeviceData.cvmdata.frame_data[item.frameIndex])); } }>
                            <ColorDisplayer rgb={ props.selectedDeviceData.cvmdata.frame_data[item.frameIndex] } size="small" />
                        </button>
                        <div className="container-note-data">
                            <FrameData data={ item } histDiff={ props.selectedDeviceData.cvmdata.frame_data[item.frameIndex].histDiff } />
                            <p className="mt-1">{ item.description }</p>
                        </div>
                    </div>
                );
            })
        }
    </div>
);

export default Notes;


