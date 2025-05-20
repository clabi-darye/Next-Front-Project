import { SearchBoxConfig } from "@/config/common";
import { styled, TextField } from "@mui/material";

const SearchBar = ({
  className,
  placeholder,
}: {
  className?: string;
  placeholder?: string;
}) => {
  const SearchBox = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      borderRadius: 32,
      "& fieldset": {
        borderColor: "var(--point)",
      },
      "&:hover fieldset": {
        borderColor: "var(--point)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--point)",
      },
    },
  });

  return (
    <div className={`flex items-center w-full max-w-[744px] ${className}`}>
      <SearchBox fullWidth placeholder={placeholder} />
      {SearchBoxConfig.isVoiceSearch && (
        <div className="text-xl">{SearchBoxConfig.micIcon}</div>
      )}
    </div>
  );
};

export default SearchBar;
