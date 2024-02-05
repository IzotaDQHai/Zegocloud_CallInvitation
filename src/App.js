import React, { useEffect } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZIM } from 'zego-zim-web';
import './index.css';
import axios from 'axios';

function App() {
  let zp;
  useEffect(() => {
    const init = async () => {
      const userID = "0368686868";
      const userName = 'Video Call - Agent (#1)';
     
      document.querySelector('.name').innerHTML = userName;
      // document.querySelector('.id').innerHTML = userID;
      const appID = parseFloat(process.env.REACT_APP_APP_ID);
      // const token = process.env.REACT_APP_APP_TOKEN;
      // const serverSecret = process.env.REACT_APP_SERVER_SECRET;
      // const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID ,serverSecret, null , userID, userName );
      // let token = "";
      // token = await getTokenFromAPI();
      // console.log("token=",token);
      // const token ="04AAAAAHiF7GwAEGM0NjFkYTE2MGMxMjkyY2IAgLwegFP+9wITBYUzUaUNmnhKPwEpQ4YLD/DZwts4CsXSY51HUVt4kam0IxU35gnaB6SrvDAWYJg2MFVNqOEb+exU6i3fm6mGoIErRnTlXHomEgB4xXBqB4P0w0tb5ZWJz1Ji70emXZvBwHKgcEmm3vRkXau1K8KmrVNFvavC8iUG";
      const token = await getTokenFromAPI();
        const KitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          appID,
          token,
          null,
          userID,
          userName
        );
        const zpInstance = ZegoUIKitPrebuilt.create(KitToken);
        // add plugin
        zpInstance.addPlugins({ ZIM });
          

        // zpInstance.setCallInvitationConfig({
        //   onIncomingCallReceived: (_callID, _caller, _callType, _callees) => {},
        // })
        
        // Log the zpInstance to the console to check if it's defined
        console.log('zpInstance:', zpInstance);
        // Attach the ZegoUIKitPrebuilt instance to the state or use it as needed 
        // eslint-disable-next-line react-hooks/exhaustive-deps
        zp = zpInstance;

        zp.setCallInvitationConfig({


          onCallInvitationEnded: async (reason, data) => {
            const timestamp = new Date().toString();
            const requestBody = {
              "reason": reason.toString(),
              "data": data,
              "timestamp": timestamp
            };

            try {
              const response = await axios.post('http://127.0.0.1:8000/ended_calls/', requestBody);
              console.log('POST ended call success', response.data);
            } catch (error) {
              console.error('Error ended call', error.message);
            }
          },

          // The callee will receive the notification through this callback when receiving a call invitation.
          onIncomingCallReceived: async (callID, caller, callType, callees) => {
            const parts = callID.split('_');
            const timestamp = new Date().toString();
            const requestBody = {
              "callID": callID,
              "caller": parts[1],
              "timestamp": timestamp
            };

            try {
              const response = await axios.post('http://127.0.0.1:8000/receivered_calls/', requestBody);
              console.log('POST request successful', response.data);
            } catch (error) {
              console.error('Error making POST request', error.message);
            }

            console.log("callback-onIncomingCallReceived-----",callID,"+", caller);
          },
    
          // The callee will receive the notification through this callback when the caller canceled the call invitation.  
          onIncomingCallCanceled: (callID, caller) => {
            console.log("callback-onIncomingCallCanceled-----",callID,"+", caller);
          },
    
          // The callee will receive the notification through this callback when the caller accepts the call invitation. 
          onOutgoingCallAccepted: (callID, callee) => {
            console.log("callback-onOutgoingCallAccepted-----",callID,"+", callee);

          },
    
          // The caller will receive the notification through this callback when the callee is on a call.
          onOutgoingCallRejected: (callID, callee) => {
            console.log("callback-onOutgoingCallRejected-----",callID,"+", callee);

          },
    
          // The caller will receive the notification through this callback when the callee declines the call invitation. 
          onOutgoingCallDeclined: (callID, callee) => {
            console.log("callback-onOutgoingCallDeclined-----",callID,"+", callee);
          },
    
          // The callee will receive the notification through this callback when he didn't respond to the call invitation. 
          onIncomingCallTimeout: (callID, caller) => {
            console.log("callback-onIncomingCallTimeout-----",callID,"+", caller);

          },
    
          // The caller will receive the notification through this callback when the call invitation timed out.
          onOutgoingCallTimeout: (callID, callees) => {
            console.log("callback-onOutgoingCallTimeout-----",callID,"+", callees);

          }
        })
      
          
  
    };

    init();
  }, []);

  const getTokenFromAPI = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/token/0368686868'
        );
  
      // Lấy token từ response
      let responsetoken = "";
      responsetoken = response.data.token;
      console.log("token=====",responsetoken);
      return responsetoken
  
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error fetching token:', error.message);
    }
  };

  const getSignature = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/accessing_server_api/'
        );
  
      let responseSignature = "";
      responseSignature = response.data.signature;
      console.log("signature ===== ",responseSignature);
      return responseSignature
  
    } catch (error) { 
      // Xử lý lỗi nếu có
      console.error('Error fetching signature:', error.message);
    }
  };




  const handleSend = (callType) => {
    const callee = document.querySelector('#userID').value;
    if (!callee) {
      alert('userID cannot be empty!!');
      return;
    }

    const users = callee.split(',').map((id) => ({
      userID: id.trim(),
      userName: 'user_' + id,
    }));

    // send call invitation
    // Use the ZegoUIKitPrebuilt instance you stored in the state or directly
    zp.sendCallInvitation({
      callees: users,
      callType: callType,
      timeout: 60,
    })
      .then((res) => {
        console.warn(res);
        if (res.errorInvitees.length) {
          alert('The user does not exist or is offline.');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="App">
      <div className='logo'>
        <div className='izota'></div>
        <div className='zego'></div>
      </div>
      <div className='component'>
       <div className='card'>
           <div className='avatar'></div>
          <div className='info'>
          <p>
          <span className="name"></span>
          </p>
          </div>
       </div>
       
      <input type="text" id="userID" placeholder="Nhập số để gọi ..." />
      <button className="videoCall" onClick={() => handleSend(ZegoUIKitPrebuilt.InvitationTypeVideoCall)}>
        Gọi video
      </button>
      <button className="voiceCall" onClick={() => handleSend(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}>
        Gọi âm thanh
      </button>
      </div>
    </div>
  );
}

export default App;
