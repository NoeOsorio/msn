export enum Status {
    Online = 'Online',
    Offline = 'Offline',
    Busy = 'Busy',
    AppearOffline = 'Appear Offline',
    Away = 'Away'
  }
  export interface User {
    nick: string;
    uid: any;
    email: string;
  }
  