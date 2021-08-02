import classes from './add-gateway.module.css';
import Modal from "../UI/modal";
import { useState } from 'react';

const AddGateway = props => {
  const [serialNumber, setSerialNumber] = useState('');
  const [name, setName] = useState('');
  const [ipv4Address, setIpv4Address] = useState('');

  const onChangeHandler = (event, setter) => {
    setter(event.target.value);
  };

  const addNewGatewayHandler = () => {
    props.addGateway({
      serialNumber,
      name,
      ipv4Address
    });
  }

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.header}>
        <h2>Add New Gateway</h2>
      </div>
      <div className={classes.content}>
        <form>
          <div className={classes['form-group']}>
            <label htmlFor="serialNumber">Serial Number</label>
            <input id="serialNumber" type="text" onChange={(e) => onChangeHandler(e, setSerialNumber)} />
          </div>
          <div className={classes['form-group']}>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" autoComplete="off" onChange={(e) => onChangeHandler(e, setName)} />
          </div>
          <div className={classes['form-group']}>
            <label htmlFor="ipv4Address">IPv4 Address</label>
            <input id="ipv4Address" type="text" onChange={(e) => onChangeHandler(e, setIpv4Address)} />
          </div>
        </form>
      </div>
      <div className={classes.footer}>
        <button className="button button-default" onClick={props.onClose}>Close</button>
        <button className="button button-primary" onClick={addNewGatewayHandler}>Add</button>
      </div>
    </Modal>
  )
}

export default AddGateway;