import classes from './card.module.css';

const Card = (props) => {
  const className = props.className ? `${classes.card} ${props.className}` : classes.card;
  return (
    <div className={className}>
      {props.children}
    </div>
  )
}

export default Card;