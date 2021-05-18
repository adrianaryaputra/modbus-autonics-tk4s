const {
    
    ModbusHandler,
    ModbusDevice,
    ModbusCommand,
    SerialPort,

} = require('com-modbus')


class ModbusDevice_T4RN extends ModbusDevice{

    constructor({
        modbusHandler,
        modbusId,
        modbusTimeout,
    }) { 
        super({
            modbusHandler,
            modbusId,
            modbusTimeout,
        });
        this.address = ModbusDevice_T4RN_address;
    }

    get({
        address = {},
        priority = 2,
        callback = () => {}
    }) {
        if( address.command !== undefined &&
            address.address !== undefined &&
            address.length !== undefined) 
        {
            this.handler.send({
                modbusSendCommand: address.command,
                modbusSendArgs: [
                    address.address, 
                    address.length
                ],
                modbusCallback: callback,
                modbusId: this.id,
                priority
            });
        }
    }

}


const ModbusDevice_T4RN_address = Object.freeze({
    productNumber: {
        command: ModbusCommand.readInputRegisters,
        address: 0x0064,
        length: 2,
        writable: false,
    }
})


module.exports = Object.freeze({
    ModbusHandler,
    ModbusDevice,
    ModbusDevice_T4RN,
    ModbusDevice_T4RN_address,
    ModbusCommand,
    SerialPort,
})