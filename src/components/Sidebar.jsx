import React, { useState, useMemo, useEffect, useRef } from 'react';
import nakujaLogo from '../assets/nakujaLogo.png';
import throttle from 'lodash.throttle';
import Button from './Button'

//left panel component
function Sidebar(props) {
  
  const THROTTLEDELAY = 100;
  let statusRef = useRef();
  let [state, setState] = useState(0); //[0,1,2,3,4,5,6]
  let [operationMode, setOperationMode] = useState(0); //[0,1]
  let [altitude, setAltitude] = useState(0); //[0-3000m]
  let [pressure, setPressure] = useState(0);
  let [temperature, setTemperature] = useState(0);
  let [pyroDrogue, setPyroDrougue] = useState(0);
  let [pyroMain, setPyroMain] = useState(0);
  let [isArmed, setIsArmed] = useState(0);
  let [rocketStatus, setRocketStatus] = useState("Pre-Flight");
  let [antenna, setAntenna] = useState("A-1");
  let [textColor, setTextColor] = useState("text-blue-500");
  const [host, setHost] = useState(""); 
  const [port, setPort] = useState("");

  const throttledSetState = useMemo(
    () =>
        throttle((val) => {
            setState(val);
        }, 100), // Throttle updates to every 100ms
    []
  );
  const throttledSetOM = useMemo(
    () =>
        throttle((val) => {
            setOperationMode(val);
        }, THROTTLEDELAY), // Throttle updates to every 100ms
    []
  );
  const throttledSetPressure = useMemo(
    () =>
        throttle((val) => {
          setPressure(val);
        }, THROTTLEDELAY), // Throttle updates to every 100ms
    []
  );
  const throttledSetTemperature = useMemo(
    () =>
        throttle((val) => {
            setTemperature(val);
        }, THROTTLEDELAY), // Throttle updates to every 100ms
    []
  );const throttledSetPD = useMemo(
    () =>
        throttle((val) => {
            setPyroDrougue(val);
        }, THROTTLEDELAY), // Throttle updates to every 100ms
    []
  );const throttledSetPM = useMemo(
    () =>
        throttle((val) => {
            setPyroMain(val);
        }, THROTTLEDELAY), // Throttle updates to every 100ms
    []
  );const throttledSetAltitude = useMemo(
    () =>
        throttle((val) => {
            setAltitude(val);
        }, THROTTLEDELAY), // Throttle updates to every 100ms
    []
  );

  useEffect(() => {

    throttledSetOM(props.operationMode);
    operationMode === 1 ? setIsArmed(true) : setIsArmed(false);

    return throttledSetOM.cancel();

   }, [props.operationMode, throttledSetOM]
  );
  useEffect(() => {

    throttledSetPressure(props.pressure);
    pressure = pressure + "mha";

    return throttledSetPressure.cancel();

   }, [props.pressure, throttledSetPressure]
  );
  useEffect(() => {

    throttledSetTemperature(props.temperature);

    return throttledSetTemperature.cancel();

   }, [props.temperature, throttledSetTemperature]
  );
  useEffect(() => {

    throttledSetPD(props.pyroDrogue);

    return throttledSetPD.cancel();

   }, [props.pyroDrogue, throttledSetPD]
  );
  useEffect(() => {

    throttledSetPM(props.pyroMain);
    operationMode === 1 ? setIsArmed(true) : setIsArmed(false);

    return throttledSetPM.cancel();

   }, [props.pyroMain, throttledSetPM]
  );



  useEffect(() => {

    throttledSetAltitude(props.altitude)

  
      if(altitude < 1000){
        setAntenna("A-1");
      }
      else if(altitude > 1000 && altitude < 2000){
        setAntenna("A-2");
      }
      else if(altitude > 2000){
        setAntenna("A-3");
      }
      


 
    return throttledSetAltitude.cancel();

   }, [props.altitude, throttledSetAltitude]
  );

  useEffect(() => {

    let color;

    throttledSetState(props.state)
    switch(state){
      case(state = 0):
        setRocketStatus("Pre Flight");
        color = 'text-gray-500';
      break;
      case(state = 1):
        setRocketStatus("Powered Flight");
        color = 'text-purple-500';

      break;
      case(state = 2):
        setRocketStatus("Apogee");
        color = 'text-red-500';

      break;
      case(state = 3):
        setRocketStatus("Drogue deployed");
        color = 'text-orange-500';

      break;
      case(state = 4):
        setRocketStatus("Main deployed");
        color = 'text-yellow-500';

      break;
      case(state = 5):
        setRocketStatus("Rocket Descent");
        color = 'text-blue-500';

      break;
      case(state = 6):
        setRocketStatus("Post Flight");
        color = 'text-green-500';

      break;
      default:
        setRocketStatus("Pre Flight");
        color = 'text-blue-500';
        break;
    }
    setTextColor(color)

    return () => throttledSetState.cancel();
  }, [props.state, throttledSetState]);
  


  const handleHostChange = (e) => {
    setHost(e.target.value);
  };
  const handlePortChange = (e) => {
    setPort(e.target.value);
  };

  const handleConnect = (e) => {
    e.preventDefault();

    if (!host || !port) {
      // alert("Please provide both host and port.");
      return;
    }

    // Pass host and port to the parent component
    props.onConnect(host, port);
  };



  return (

        <aside className="sm:flex md:fixed md:block hidden box-border h-screen  md:w-1/5 mt-10 md:m-0">
          <div className='flex items-center h-full w-full overflow-auto max-h-screen flex-col p-2 border-r border-gray-400 text-base'>
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                    <img
                            src={nakujaLogo}
                            alt="NAKUJA PROJECT Logo"
                            className="rounded-full w-10 h-10" 
                    />    
                    <h1 className="uppercase font-semibold px-2 text-base md:text-lg text-gray-700">Nakuja - N4</h1>
                </div>
              <div className='border-b-2 border-b-black '/>

              <h2 className="text-gray-700 text-md font-semibold text-center md:text-base">ROCKET CONFIGURATION</h2>
              <div className='border-b-2 border-b-black '/>

              <div className="min-h-14 w-full p-2 h-14 rounded-2xl flex flex-col items-center justify-center font-semibold transition duration-300 ease-in-out border-2 border-gray-700 relative">
                <div className="text-sm uppercase -mt-9 bg-white px-1 z-10 h-1/2">Ready State</div>
                <div className={`text-base h-1/2 pt-1 uppercase ${isArmed ? "text-emerald-500" : "text-blue-500"}`}>{ isArmed ? "Armed" : "SAFE"}</div>
              </div>
              <div className="min-h-14 h-14 w-full p-2 rounded-2xl flex flex-col items-center justify-center font-semibold transition duration-300 ease-in-out border-2 border-gray-700 relative">
                <div className="text-sm uppercase -mt-9 bg-white px-1 z-10 relative h-1/2">
                  Flight State
                </div>
                <div ref={statusRef} className={`text-base pt-1 h-1/2 uppercase ${textColor}`}>{rocketStatus}</div>
              </div>

              <div className="min-h-14 h-14 w-full p-2 rounded-2xl flex flex-col items-center justify-center font-semibold transition duration-300 ease-in-out border-2 border-gray-700 relative">
                <div className="text-sm uppercase -mt-9 bg-white px-1 z-10 relative h-1/2">Antenna</div>
                <div className="text-base pt-1 h-1/2 uppercase">{antenna}</div>
              </div>

              <div className="min-h-24 h-32 w-full p-2 rounded-2xl flex flex-col items-center justify-center font-semibold transition duration-300 ease-in-out border-2 border-gray-700 relative">
                <div className="text-base -mt-11 bg-white px-1 z-10 relative h-1/5">RSSI</div>
                  <div className="text-base grid grid-cols-2 items-center justify-center  gap-2 pt-2 h-4/5 w-full text-gray-700">
                    <div className='px-1 border-r-2 border-slate-400 grid grid-rows-3 items-center justify-center h-full w-full'>
                      <div className='pb-2 h-1/3 w-full text-center'>Rx</div> 
                      <div className='border-2 w-full border-gray-800'/>
                      <div className='pb-2 h-1/3'> 60 dBm</div>
                    </div>
                    <div className='px-1 grid grid-rows-3 w-full items-center justify-center h-full'>
                      <div className='pb-2 h-1/3 w-full text-center'>Tx</div>  
                      <div className='border-2 border-gray-800'/>
                      <div className='pb-2 h-1/3 '> 60 dBm</div>
                    </div>
                  </div>
                </div>
                <div className='border border-gray-800'/>
                <div  className="uppercase flex flex-col w-full space-y-2 font-semibold text-blue-900 text-base lg:text-sm">
                  {/* <div className="flex flex-row items-center justify-center min-h-14 shadow-md bg-blue-100  p-2 w-full ">
                    <div className='w-1/2 flex items-center justify-end p-2'>Drouge</div>
                    <div className='w-1/2 flex items-center justify-center p-2'> {pyroDrogue ? "Deployed": "Safe"} </div>
                  </div>
                  <div className="flex items-center justify-center min-h-14 shadow-md bg-blue-100  p-2 w-full ">
                    <div className='w-1/2 flex items-center justify-end p-2'>Main</div>
                    <div className='w-1/2 flex items-center justify-center p-2'> {pyroMain ? "Deployed": "Safe"} </div>
                  </div> */}
                  <div className="flex items-center justify-center min-h-14 shadow-md bg-blue-100  p-2  w-full">
                    <div className='w-1/2 flex items-center justify-end'>Pressure</div>
                    <div className='w-1/2 flex items-center justify-center  p-2'>{pressure}</div>
                  </div>
                  <div className="flex items-center justify-center min-h-14 shadow-md bg-blue-100  p-2 w-full">
                    <div className='w-1/2 flex items-center justify-end p-2'>Temperature</div>
                    <div className='w-1/2 flex items-center justify-center p-2'>{temperature}</div>                  
                  </div>
                </div>
          
              <div>
                <div className='border-b-2'></div>
                
                <div className='flex flex-row item-center justify-center py-2 border-b-2'>
                  <h1 className='font-semibold  text-center pr-1'>MQTT SETUP</h1>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 mt-1">
                      <path fillRule="evenodd" d="M13.78 10.47a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l.97.97V5.75a.75.75 0 0 1 1.5 0v5.69l.97-.97a.75.75 0 0 1 1.06 0ZM2.22 5.53a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v5.69a.75.75 0 0 1-1.5 0V4.56l-.97.97a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" />
                  </svg>
                </div>
                
              <form onSubmit={handleConnect} className='grid grid-cols-2 pt-1'>
                  <div className='mr-2'>
                    <label htmlFor="host" className='font-bold '>Host</label>
                    <input 
                      className="w-5/6 md:w-full bg-gray-300 block h-10 border-0  px-3 py-1  outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 dark:text-white "
                      type='text'
                      id="host"
                      value={host}
                      onChange={handleHostChange}
                      placeholder='192.168.x.x' 
                    />
                  </div>
                  <div >
                    <label htmlFor="port" className='font-bold'>Port</label>
                    <input 
                      className="w-5/6 md:w-full bg-gray-300 block h-10 border-0 px-3 py-1  outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 dark:text-white " 
                      type='text'
                      id='port'
                      value={port}
                      onChange={handlePortChange}
                      placeholder='xxxx' 
                    />
                  </div>
                 <Button  type='submit' className='flex flex-row h-10 items-center font-semibold  justify-center rounded-lg p-2 text-white hover:bg-blue-900 bg-blue-800 w-auto my-2 transition shadow-sm  shadow-gray-800 hover:shadow-gray-700 uppercase'>
                    Connect
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                      <path fillRule="evenodd" d="M8.914 6.025a.75.75 0 0 1 1.06 0 3.5 3.5 0 0 1 0 4.95l-2 2a3.5 3.5 0 0 1-5.396-4.402.75.75 0 0 1 1.251.827 2 2 0 0 0 3.085 2.514l2-2a2 2 0 0 0 0-2.828.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M7.086 9.975a.75.75 0 0 1-1.06 0 3.5 3.5 0 0 1 0-4.95l2-2a3.5 3.5 0 0 1 5.396 4.402.75.75 0 0 1-1.251-.827 2 2 0 0 0-3.085-2.514l-2 2a2 2 0 0 0 0 2.828.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
                    </svg>
                  </Button>

              </form>
            </div>

          </div>

        </div>
      </aside> 
    
  );
};

export default Sidebar;