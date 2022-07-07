

const ColorDisplayer = (props) => (
    <div className={ 'color-displayer ' + props.size } style={ { 'backgroundColor' : ('rgb(' + parseInt(props.rgb.avgR) + ',' + parseInt(props.rgb.avgG) + ',' + parseInt(props.rgb.avgB) + ')') } }></div>
);

ColorDisplayer.defaultProps = {
    size : 'big'
};

export default ColorDisplayer;


