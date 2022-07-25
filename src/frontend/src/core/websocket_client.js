import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default class ApiClient {
  constructor(action) {
    this.action = action;
    this.stompClient = null;
    this.socket = null;
    this.args = [];
    this.connect();
    this.handlerFunction = () => {};
    this.errorHandlerFunction = () => {};
  }

  addArgument(arg) {
    this.args.push(arg);
  }

  onMessage(handlerFunction) {
    this.handlerFunction = handlerFunction;
  }

  onError(errorHandlerFunction) {
    this.errorHandlerFunction = errorHandlerFunction;
  }

  connect() {
    this.stompClient = Stomp.over(function () {
      return new SockJS(process.env.REACT_APP_API_URL);
    });

    // automatic reconnect (delay in milli seconds)
    this.stompClient.reconnect_delay = process.env.REACT_APP_Reconnect_delay;
    this.stompClient.heartbeatIncoming =
      process.env.REACT_APP_Heartbeat_Incoming;
    this.stompClient.heartbeatOutgoing =
      process.env.REACT_APP_Heartbeat_Outgoing;

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe("/topic/graph_data", (message) => {
        try {
          message = JSON.parse(message.body);
          this.handlerFunction(message, this.args);
        } catch (e) {
          this.disconnect();
        }
      });
    });
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }
}
