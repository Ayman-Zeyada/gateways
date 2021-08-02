import classes from './gateway-item.module.css';

const GatewayItem = props => {
  const { serialNumber, name, ipv4Address, devices } = props.gateway;
  return (
    <div className={classes.gateway}>
      <div className={classes.name}>{name}</div>
      <div className={classes.info}>
        <div>{serialNumber}</div>
        <div>{ipv4Address}</div>
        <div>{devices.length}</div>
      </div>
    </div>
  )
}

export default GatewayItem;