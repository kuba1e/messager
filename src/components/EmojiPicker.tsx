import React, { useEffect, useRef } from "react";
import Picker from "emoji-picker-react";
import styled from "styled-components";

const PickerStyle = styled.div`
  .emoji-scroll-wrapper {
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
  .emoji-search {
    background-color: #171823 !important;
    border: none !important;
    color: #fff;
    border-radius: 0.7em !important;
  }
  .emoji-group {
    &::before {
      display: none;
    }
  }
  .emoji-categories {
    button {
      filter: invert(1);
    }
  }
`;

interface IEmojiPicker {
  onEmojiClick: (event: any, emojiObject: any) => void;
}

export const EmojiPicker: React.FC<IEmojiPicker> = ({ onEmojiClick }) => {
  useEffect(() => {}, []);

  return (
    <PickerStyle>
      {/* <Picker
				pickerStyle={{
					width: '400px',
					height: '400px',
					backgroundColor: '#1C1D2C',
					boxShadow: 'none',
					border: 'none',
				}}
				preload
				onEmojiClick={onEmojiClick}
			/> */}
    </PickerStyle>
  );
};
