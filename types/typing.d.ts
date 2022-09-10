export interface Channel {
  author: string;
  createdAt: string;
  desc: string;
  members: UserSmallInfos[];
  name: string;
  updatedAt: string;
  _id: string;
}

export interface UserSmallInfos {
  name: string;
  _id: string;
  image: string;
}

export interface Chat {
  _id?: string;
  text: string;
  images: string[];
  conversationID: string;
  author: UserSmallInfos;
  createdAt?: string;
  updatedAt?: string;
  userID?: string;
  isLoading?: boolean;
}

