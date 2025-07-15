"use client";

import { useState } from "react";
import { SearchBoxConfig } from "@/config/common";

import { useSpeechRecognition } from "react-speech-recognition";
import VoiceSearch from "./VoiceSearch";
import VoiceVisualizer from "./VoiceVisualizer";
import { InputAdornment, Input } from "@mui/material";

import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

type SearchBarProps = {
  className?: string;
  placeholder?: string;
  onSearch: (searchText: string) => void;
};

const SearchBar = ({
  className = "",
  placeholder = "검색어를 입력하세요",
  onSearch,
}: SearchBarProps) => {
  const { listening } = useSpeechRecognition();
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    onSearch(trimmed);
    setSearchText("");
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <div className="flex-1 py-2 px-3 border border-[var(--point)] rounded-3xl">
        <Input
          fullWidth
          placeholder={listening ? "" : placeholder}
          value={listening ? "" : searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(searchText);
            }
          }}
          endAdornment={
            !listening && (
              <InputAdornment position="end">
                <SendOutlinedIcon
                  sx={{ cursor: "pointer", color: "var(--point)" }}
                  onClick={() => handleSubmit(searchText)}
                />
              </InputAdornment>
            )
          }
          disableUnderline
        />
      </div>

      <div
        className={`absolute top-[8px] left-[16px] w-[calc(100%-60px)] ${
          listening ? "" : "hidden"
        }`}
      >
        <VoiceVisualizer />
      </div>

      {SearchBoxConfig.isVoiceSearch && (
        <VoiceSearch onSearch={setSearchText} />
      )}
    </div>
  );
};

export default SearchBar;
