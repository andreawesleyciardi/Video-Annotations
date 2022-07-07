import { Duration } from './../Utilities';



const FrameData = (props) => (
    <>
        <p><strong>Frame Number:</strong> { props.data.frameIndex + 1 }</p>
        <p><strong>Frame Time:</strong> <Duration seconds={ props.data.frameTime } /> mins</p>
        <p><strong>Difference:</strong> { props.histDiff }</p>
    </>
);

export default FrameData;


