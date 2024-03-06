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
      // const token = await getTokenFromAPI();
      const token =
        '04AAAAAHiz1w0AEDA4MTA3YTc2OGMwMzQ5ZjgAgKq3VXJOJWdPd3jvODPDh9t/Cl1jkGYa51d32ox7s3Pm3nDWegpcC0S1v7Nqtixol0ylpXz+vX81hz90tAfX8lA1EepuZaeLGIec2DepQETT5dZVwXAhz7PP928QPyXdk8Jvb5Cp4Jsr11PqPuQ20yBonldpgyJDSR2wBURWZ/iR';
        
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
          showRoomTimer : true,
          enableUserSearch : true,
          showScreenSharingButton: true,
          showPinButton : true,
          showLayoutButton : true,
          showNonVideoUser : true,
          // onCallInvitationEnded: async (reason, data) => {
          //   const timestamp = new Date().toString();
          //   const requestBody = {
          //     "reason": reason.toString(),
          //     "data": data,
          //     "timestamp": timestamp
          //   };

          //   // try {
          //   //   const response = await axios.post('http://127.0.0.1:8000/ended_calls/', requestBody);
          //   //   console.log('POST ended call success', response.data);
          //   // } catch (error) {
          //   //   console.error('Error ended call', error.message);
          //   // }
          // },

          // The callee will receive the notification through this callback when receiving a call invitation.
          // onIncomingCallReceived: async (callID, caller, callType, callees) => {
          //   // DescribeSimpleStreamList(callID);
          //   const parts = callID.split('_');
          //   const timestamp = new Date().toString();
          //   const requestBody = {
          //     "callID": callID,
          //     "caller": parts[1],
          //     "timestamp": timestamp
          //   };

          //   try {
          //     const response = await axios.post('http://127.0.0.1:8000/receivered_calls/', requestBody);
          //     console.log('POST request successful', response.data);
          //   } catch (error) {
          //     console.error('Error making POST request', error.message);
          //   }

          //   console.log("callback-onIncomingCallReceived-----",callID,"+", caller);
          // },
    
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

  // const DescribeSimpleStreamList = async (RoomId) => {
  //   try {
  //     const RTC = 'rtc-api.zego.im';
  //     const AppId = '1347806305';
  //     const Timestamp = Date.now();
  //     const Signature = await getSignature();
  //     console.log("Đã lấy chữ ký =======", Signature);
  //     const SignatureVersion = '2.0';
  //     var SignatureNonce = '';
  //     for (var i = 0; i < 16; i++) {
  //       SignatureNonce += Math.floor(Math.random() * 16).toString(16);
  //     }
  //     const IsTest = 'false';
  //     const Action = 'DescribeSimpleStreamList';
      
  //     // Tạo URL với HTTPS
  //     const url = `https://${RTC}/?Action=${Action}&AppId=${AppId}&Timestamp=${Timestamp}&Signature=${Signature}&SignatureVersion=${SignatureVersion}&SignatureNonce=${SignatureNonce}&IsTest=${IsTest}&${RoomId}`;
  
  //     // Thêm header Authorization
  //     const headers = {
  //       Authorization:
  //         'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkFCNEUzQ0JGMkFFRUE2Mzg3NDFFM0NDMUExQTFERUM0IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE3MDQ4NTQ0MjYsImV4cCI6MTcwNjE1MDQyNiwiaXNzIjoiaHR0cHM6Ly91YXQtYXV0aC5pem90YS52biIsImF1ZCI6ImRlZmF1bHQtYXBpIiwiY2xpZW50X2lkIjoiaVpPVEEiLCJzdWIiOiI2NjMyIiwiYXV0aF90aW1lIjoxNzA0ODU0NDI2LCJpZHAiOiJsb2NhbCIsInByZWZlcnJlZF91c2VybmFtZSI6IjA4MjMzMDY5OTIiLCJ1bmlxdWVfbmFtZSI6IjA4MjMzMDY5OTIiLCJyb2xlIjoiW1wiVXNlclwiLFwiRW5kVXNlclwiXSIsImlzX2FjdGl2ZSI6IlRydWUiLCJpc19vdXRfc2l0ZV9zeXN0ZW0iOiJGYWxzZSIsImlzX3ZlcmlmeV9hY2NvdW50IjoiVHJ1ZSIsInN1cl9uYW1lIjoiTMOqIELhuqNvIE5oxrAiLCJuYW1lIjoiTMOqIELhuqNvIE5oxrAiLCJ1c2VyX25hbWUiOiIwODIzMzA2OTkyIiwiYWNjb3VudF9jb2RlIjoiWlQwMDAwMDY2MzIiLCJlbWFpbF9hZGRyZXNzIjoiY2FhMDUyOGYtMTg0ZS00OWNhLWI4YTQtNDNiYTUwYzYyMzYxQGRlZmF1bHQuY29tIiwiYWNjb3VudF90eXBlIjoiRW5kVXNlciIsIm5ldHdvcmtfbGV2ZWwiOiIwIiwiY3JlYXRlZF9kYXRlIjoiMTY5MDMzNDE5MSIsImVtYWlsIjoiY2FhMDUyOGYtMTg0ZS00OWNhLWI4YTQtNDNiYTUwYzYyMzYxQGRlZmF1bHQuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX251bWJlcl92ZXJpZmllZCI6ZmFsc2UsImp0aSI6IkM0RUFERjQ2MTUzREUzNjk5QkVDMTBFMUVFMUE0NzMzIiwiaWF0IjoxNzA0ODU0NDI2LCJzY29wZSI6WyJkZWZhdWx0LWFwaSIsImVtYWlsIiwib3BlbmlkIiwicGhvbmUiLCJwcm9maWxlIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.eoMa9iZBtXACmU-FyEdoWKCGRqBwZ17Sam_XqWgeRJL_AgQv-PADJktB7ff7ISHZjNqnKmO7s37hnRSnXOu4KPOLPXVQDtg4ZjE8epbx2lBuQl41zwHWbujIPRwCdVC3QYD65ccZdHGUBpAKmp98IycOojDMFjRWLT13RCItJUjP-utHMmcyj8A4xnXRebwFJrLrxbfeuhunzl8dwkHsEg9jOSCTgohR2GmfYiwEX9ErMBNdBEKoWTi0rlQdOfBCUk9TVIIeRyvRcw4729OM5fIBIAoI_5PkCDQU_IG24n0VVdj7CU38TNrchO3iWv1LyZrxpnkidVd3WpGQczh6Sg' };
  
  //     // Gửi request
  //     const response = await axios.get(url, { headers });
  
  //     // In ra response
  //     console.log(response.data);
  
  //     // Trả về response
  //     return response.data;
  //   } catch (error) {
  //     // Xử lý lỗi
  //     console.error(error);
  //     throw error;
  //   }
  // };
  
  

  // const getTokenFromAPI = async () => {
  //   try {
  //     const response = await axios.get(
  //       'http://127.0.0.1:8000/token/0368686868'
  //       );
  
  //     // Lấy token từ response
  //     let responsetoken = "";
  //     responsetoken = response.data.token;
  //     console.log("token=====",responsetoken);
  //     return responsetoken
  
  //   } catch (error) {
  //     // Xử lý lỗi nếu có
  //     console.error('Error fetching token:', error.message);
  //   }
  // };

  // const getSignature = async () => {
  //   try {
  //     const response = await axios.get(
  //       'http://127.0.0.1:8000/accessing_server_api/'
  //       );
  
  //     let responseSignature = "";
  //     responseSignature = response.data.signature;
  //     console.log("signature ===== ",responseSignature);
  //     return responseSignature
  
  //   } catch (error) { 
  //     // Xử lý lỗi nếu có
  //     console.error('Error fetching signature:', error.message);
  //   }
  // };

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
