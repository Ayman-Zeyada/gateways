import { useEffect, useState } from 'react';
import axios from 'axios';

import classes from './gateways-list.module.css';
import GatewayItem from './gateway-item';
import AddGateway from './add-gateway';

const GatewaysList = (props) => {
  const [gateways, setGateways] = useState([]);
  const [modalIsShown, setIsModalIsShown] = useState(false);

  useEffect(() => {
    async function fetchGateways() {
      const res = await (await axios.get('api/gateways')).data;
      console.log(res)
      setGateways(res.data);
    }

    fetchGateways();
  }, []);

  const showModal = () => {
    setIsModalIsShown(true);
  }

  const hideModal = () => {
    setIsModalIsShown(false);
  }

  const onAddGatewayHandler = (gateway) => {
    axios.post('api/gateways', gateway, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      setGateways(prevGateways => {
        return [...prevGateways, res.data.data];
      });
      setIsModalIsShown(false);
    });
  }

  return (
    <div className={classes['gateways-list']}>
      <div className={classes['gateways-list__head']}>
        <h1>Gateways List</h1>
        <button className="button button-primary" onClick={showModal}>+ Add</button>
      </div>
      {gateways.map(gateway => <GatewayItem key={gateway._id} gateway={gateway} />)}
      {modalIsShown && <AddGateway onClose={hideModal} addGateway={onAddGatewayHandler} />}
    </div>
  );
}

export default GatewaysList;