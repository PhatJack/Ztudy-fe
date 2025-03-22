import React from "react";

interface Props {
  roomCode: string;
}

const RoomDetail = ({ roomCode }: Props) => {
  return <div>{roomCode}</div>;
};

export default RoomDetail;
