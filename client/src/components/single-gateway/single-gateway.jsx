const SingleGateway = props => {
    const [devices, setDevices] = useState([]);
    const addDevice = () => {
        setDevices((prevState) => {
          return [...prevState, {
            uid: '',
            vendor: '',
            status: 0
          }];
        });
      };
    
      const onChangeDeviceHandler = (event, index) => {
        event.preventDefault();
        setDevices(prev => {
          return prev.map((device, i) => {
            if (i !== index) return device;
    
            return {
              ...device,
              [event.target.name]: event.target.value
            };
          });
        });
      };
    
      const deleteDevice = (event, index) => {
        event.preventDefault();
        setDevices(prevDevices => {
          return prevDevices.filter(device => device !== prevDevices[index]);
        });
      };


    return (
        <div className={classes.devices}>
          <div className={classes['devices__head']}>
            <label>Devices</label>
            <button className="button button-primary" onClick={addDevice}>+</button>
          </div>
          <div className={classes['devices__list']}>
            {devices.length > 0 && <div className={classes['devices__list__head']}>
              <div>UID</div>
              <div>Vendor</div>
              <div>Status</div>
            </div>}
            {devices.map((device, index) => {
              return (
                <div key={index} className={classes['device-item']}>
                  <div className={classes['form-group']}>
                    <input type="text" name="uid" value={device.uid} onChange={(e) => {onChangeDeviceHandler(e, index)}} />
                  </div>
                  <div className={classes['form-group']}>
                    <input type="text" name="vendor" value={device.vendor} onChange={(e) => {onChangeDeviceHandler(e, index)}} />
                  </div>
                  <div className={classes['form-group']}>
                    <select name="status" value={device.status} onChange={(e) => {onChangeDeviceHandler(e, index)}}>
                      <option value="0">Select a status</option>
                      <option value="1">Online</option>
                      <option value="2">Offline</option>
                    </select>
                  </div>
                  <div className={classes['delete-device']}>
                    <button className="button button-default" onClick={(e) => deleteDevice(e, index)}>x</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
    )
}