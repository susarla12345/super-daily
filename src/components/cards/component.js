import { ReactComponent as Remove } from '../../images/delete.svg';

const Card = (props) => {
  return (
    <div className="card-wrapper" draggable="true" onDragStart={(event) => props.drag(event, props)}>
      <Remove onClick={() => {props.removeCard(props.card, props.list)}}/>
      <div className="card-name">
        {props.name}
      </div>

      <div className="card-desc">
        {props.description}
      </div>
    </div>
  )
}

export default Card;